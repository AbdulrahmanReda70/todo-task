<?php

namespace App\Services\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;

class AuthService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function signup(array $data)
    {
        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => new UserResource($user),
            'token_type' => 'Bearer',
            'token' => $token
        ];
    }

    public function signin(array $data)
    {
        $user = User::where('email', $data['email'])->first();

        if (!$user || !password_verify($data['password'], $user->password)) {
            return null;
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => new UserResource($user),
            'token_type' => 'Bearer',
            'token' => $token
        ];
    }
}
