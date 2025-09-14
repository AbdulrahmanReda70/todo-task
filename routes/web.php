<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

// Catch-all route for Vue.js SPA (optional)
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
