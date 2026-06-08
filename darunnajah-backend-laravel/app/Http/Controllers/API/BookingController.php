<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi semua data dari form React agar sesuai dengan Model & Database
        $validated = $request->validate([
            'customer_name'   => 'required|string|max:255',
            'email'           => 'required|email',
            'whatsapp_number' => 'required|string',
            'booking_date'    => 'required|string', 
            'service'         => 'required|string',
            'participants'    => 'required|integer',
        ]);

        // 2. Simpan data ke dalam tabel bookings
        $booking = Booking::create($validated);

        // 3. Berikan respon sukses berbentuk JSON ke React
        return response()->json([
            'success' => true,
            'message' => 'Pemesanan Berhasil Disimpan! Tim Darunnajah akan segera menghubungi Anda.',
            'data'    => $booking
        ], 201);
    }
}