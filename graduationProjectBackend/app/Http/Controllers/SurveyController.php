<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function getUserSurveys()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'message' => 'Giriş yapılmamış.',
            ], 401);
        }

        $surveys = Survey::with(['complaint', 'complaint.service', 'complaint.status'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Kullanıcının oy kullandığı anketler getirildi.',
            'data' => $surveys,
        ], 200);
    }
}
