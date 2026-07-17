<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\BookingController;
use App\Models\Service;

// Jalur pintu masuk untuk menyimpan data booking dari React (Sudah ada)
Route::post('/booking/store', [BookingController::class, 'store']);

// JALUR TAMBAHAN: Untuk mengambil data pendaftaran ke Dashboard React
Route::get('/bookings', [BookingController::class, 'index']);
Route::put('/bookings/{id}', [BookingController::class, 'update']);
Route::get('/services', function () {
    return response()->json(Service::all());
});