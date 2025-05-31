<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComplaintRequest;
use App\Models\Complaint;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComplaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        if (Auth::user()->hasRole('admin')) {
            $complaints = Complaint::with(['user', 'service', 'status'])->get();
            return response()->json(['message' => 'Şikayetler Başarıyla getirildi', 'Şikayetler' => $complaints], 200);
        } elseif (Auth::user()->hasRole('Vatandaş')) {
            $complaints = Complaint::with(['user', 'service', 'status'])
                ->where('user_id', Auth::id())
                ->get();
            return response()->json(['message' => 'Şikayetler Başarıyla Getirildi.', 'Şikayetler' => $complaints], 200);
        } else {
            $user = Auth::user();
            $complaints = Complaint::query()
                ->whereHas('service', function ($query) use ($user) {
                    $query->whereIn('role_id', $user->roles->pluck('id')->toArray());
                })
                ->with(['service', 'user', 'status']) // ilişkili veriler burada da yüklendi
                ->get();

            return response()->json([
                'message' => 'Şikayetler Başarıyla Getirildi.',
                'Şikayetler' => $complaints
            ], 200);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|integer|exists:service,id',
            'status_id' => 'required|integer|exists:status,id',
            'title' => 'required|min:10|max:255',
            'description' => 'required|string|min:10',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:10000',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('complaint_photos', 'public');
            $validated['photo'] = $path;
        }

        $complaint = Complaint::create([
            'user_id' => auth()->id(),
            'service_id' => $validated['service_id'],
            'status_id' => $validated['status_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'photo' => $validated['photo'] ?? null,
        ]);

        return response([
            'Message' => 'Talep Başarıyla Oluşturuldu',
            'Talep' => $complaint
        ], 201);
    }


    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = auth()->user();
        $ids = $request->input('ids');

        if (!is_array($ids) || empty($ids)) {
            return response()->json([
                'message' => 'Geçerli bir şikayet ID listesi gönderilmedi.',
            ], 400);
        }

        $complaints = Complaint::whereIn('id', $ids);

        if ($user->hasRole('admin')) {
            $deletable = $complaints;
        } elseif ($user->hasRole('Vatandaş')) {
            $deletable = $complaints->where('user_id', $user->id);
        } else {
            $roleIds = $user->roles->pluck('id');
            $deletable = $complaints->whereHas('service', function ($query) use ($roleIds) {
                $query->whereIn('role_id', $roleIds);
            });
        }

        $idsToDelete = $deletable->pluck('id')->toArray();

        if (empty($idsToDelete)) {
            return response()->json([
                'message' => 'Silmeye yetkili olduğunuz herhangi bir şikayet bulunamadı.',
            ], 403);
        }

        Complaint::whereIn('id', $idsToDelete)->delete();

        return response()->json([
            'message' => 'Şikayet(ler) başarıyla silindi.',
            'deleted_ids' => $idsToDelete,
        ], 200);
    }


    public function approvedComplaint()
    {
        $id = auth()->id();


        $approvedComplaints = Complaint::with(['service', 'status', 'verify'])
            ->where('user_id', $id)
            ->where('status_id', 4)
            ->get();

        return response()->json([
            'Onaylanan Talepler' => $approvedComplaints,
        ], 200);

    }

    public function rejectedComplaint()
    {
        $id = auth()->id();

        $approvedComplaints = Complaint::with(['service', 'status', 'verify'])
            ->where('user_id', $id)
            ->where('status_id', 5)
            ->get();

        return response()->json([
            'Reddedilen Şikayetler' => $approvedComplaints,
        ], 200);


    }
}
