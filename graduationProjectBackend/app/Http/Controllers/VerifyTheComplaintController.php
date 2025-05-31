<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\VerifytheComplaint;
use Illuminate\Http\Request;

class VerifyTheComplaintController extends Controller
{
    public function submitFeedback(Request $request)
    {
        $request->validate([
            'complaint_id' => 'required|exists:verifythecomplaint,complaint_id',
            'answer' => 'required|boolean', // 1: memnun, 0: değil
        ]);

        $userId = auth()->id(); // Auth üzerinden kullanıcıyı alıyoruz

        // Kullanıcı daha önce oy kullanmış mı kontrolü
        $exists = Survey::where('user_id', $userId)
            ->where('complaint_id', $request->complaint_id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Bu şikayet için zaten oy kullandınız.',
                'status' => 'already_voted'
            ], 409);
        }

        // Yeni oyu kaydet
        Survey::create([
            'user_id' => $userId,
            'complaint_id' => $request->complaint_id,
            'answer' => $request->answer,
        ]);

        // Oy ortalamasını güncelle
        $average = Survey::where('complaint_id', $request->complaint_id)->avg('answer');

        VerifytheComplaint::where('complaint_id', $request->complaint_id)
            ->update([
                'satisfaction' => $average,
            ]);

        return response()->json([
            'message' => 'Oyunuz başarıyla kaydedildi.',
            'satisfaction' => $average,
            'status' => 'success'
        ], 200);
    }

    public function getVerifiedComplaints()
    {
        if (auth()->user()) {
            $verifiedComplaints = VerifytheComplaint::with([
                'complaint.status',      // <-- status dahil edildi
                'complaint.user',
                'complaint.service'
            ])
                ->latest()
                ->get();

            return response()->json([
                'message' => 'Veriler başarıyla getirildi.',
                'data' => $verifiedComplaints,
            ], 200);
        }

        return response()->json([
            'message' => 'Giriş yapılmamış.',
        ], 401);

    }
}
