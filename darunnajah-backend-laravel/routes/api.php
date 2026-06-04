<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BookingController;

// Jalur pintu masuk untuk menyimpan data booking dari React
Route::post('/booking', [BookingController::class, 'store']);