<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Todo\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/test', fn() => 'API is working');

// Authentication routes (public)
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tasks/search', [TodoController::class, 'search']);
    Route::get('/tasks/pending', [TodoController::class, 'pending']);
    Route::get('/tasks/in-progress', [TodoController::class, 'inProgress']);
    Route::get('/tasks/completed', [TodoController::class, 'completed']);
    Route::apiResource('tasks', TodoController::class);
});
