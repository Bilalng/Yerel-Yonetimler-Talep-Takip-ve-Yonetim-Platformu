<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {

        $validator = $request->validate([
            'tc' => 'required|string|max:11|unique:users',
            'name' => 'required|string|max:30',
            'surname' => 'required|string|max:30',
            'email' => 'required|string|email|unique:users',
            'phone' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
        ]);
        $user = User::create([
            'tc' => $validator['tc'],
            'name' => $validator['name'],
            'surname' => $validator['surname'],
            'email' => $validator['email'],
            'phone' => $validator['phone'],
            'password' => Hash::make($validator['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
           'Message' => 'Başarılı Bir şekilde Kullanıcı Oluşturuldu', 'Token' => $token,
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['error' => 'Not Found'], 404);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);

        }
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json(['message' => 'Succes', 'token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Başarıyla çıkış yapıldı']);
    }
}

