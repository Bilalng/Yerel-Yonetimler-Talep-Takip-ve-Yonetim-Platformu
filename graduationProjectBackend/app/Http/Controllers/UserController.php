<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('id', Auth::id())
            ->get();
        return response()->json(['Kullanıcı Detaylar', $user], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
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
    public function destroy(string $id)
    {
        //
    }

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = auth()->user();

        if ($request->hasFile('profile_photo')) {

            if ($user->profile_photo_path && Storage::disk('public')->exists('profile_photos/' . $user->profile_photo_path)) {
                Storage::disk('public')->delete('profile_photos/' . $user->profile_photo_path);
            }


            $filename = time() . '_' . $request->file('profile_photo')->getClientOriginalName();
            $request->file('profile_photo')->storeAs('profile_photos', $filename, 'public');


            $user->profile_photo_path = $filename;
        }

        $user->save();

        return response()->json([
            'message' => 'Profil fotoğrafı başarıyla güncellendi.',
            'profile_photo_url' => asset('storage/profile_photos/' . $user->profile_photo_path)
        ]);
    }
    public function profile(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'profile_photo' => $user->profile_photo_path
                ? asset('storage/' . $user->profile_photo_path)
                : null
        ]);
    }
}
