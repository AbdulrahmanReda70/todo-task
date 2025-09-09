<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SigninRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Services\Auth\AuthService;

class AuthController extends Controller
{
    public function signup(SignupRequest $request, AuthService $authService)
    {
        $validatedData = $request->validated();

        $result = $authService->signup($validatedData);
        return response()->json($result, 201);
    }

    public function signin(SigninRequest $request, AuthService $authService)
    {
        $validatedData = $request->validated();

        $result = $authService->signin($validatedData);

        if (!$result) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json($result, 200);
    }
}
