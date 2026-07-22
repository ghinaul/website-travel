<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    // 1. Fungsi INDEX untuk mengambil semua data dari database
    public function index()
    {
        $bookings = Booking::all();
        return response()->json($bookings);
    }

    // 2. Fungsi STORE bawaan kamu untuk menyimpan data pendaftaran
    public function store(Request $request)
{
    // 1. Validasi input
    $validated = $request->validate([
        'customer_name'   => 'required|string|max:255',
        'email'           => 'required|email',
        'whatsapp_number' => 'required|string',
        'booking_date'    => 'required|string',
        'service_id'      => 'required|exists:services,id',
        'participants'    => 'nullable|integer',
        'special_notes'   => 'nullable|string',
        'total_price'     => 'nullable|numeric',
    ]);

    // 2. Buat array data aman (hanya kolom yang pasti ada di database)
    $dataToInsert = [
        'customer_name'   => $validated['customer_name'],
        'email'           => $validated['email'],
        'whatsapp_number' => $validated['whatsapp_number'] ?? $request->whatsapp_number,
        'booking_date'    => $validated['booking_date'],
        'service_id'      => $validated['service_id'],
        'participants'    => 1,
        'notes'   => $validated['special_notes'] ?? null,
        //'total_price'     => $validated['total_price'] ?? 0,
        'status'          => 'Pending', // memberi nilai bawaan status
    ];

    // 3. Simpan ke database
    $booking = Booking::create($dataToInsert);

    // 4. Respon JSON sukses ke React
    return response()->json([
        'success' => true,
        'message' => 'Pemesanan Berhasil Disimpan!',
        'data'    => $booking
    ], 201);
}

    // 3. Fungsi UPDATE untuk mengubah status pemesanan dari dashboard pegawai
    public function update(Request $request, $id)
    {
        // Validasi melonggarkan string agar menerima format dari tombol React maupun teks Kapital
        $request->validate([
            'status' => 'required|string|in:Pending,Confirmed,Completed,Cancelled,PENDING,CONFIRMED,COMPLETED,CANCELLED,MENUNGGU,DISETUJUI,BATAL,SELESAI'
        ]);

        $booking = Booking::findOrFail($id);

        // Update status di database MySQL
        $booking->update([
            'status'  => $request->status,
            'user_id' => auth()->id() ?? 1 // Mencatat ID staff login, angka 1 sebagai backup demo
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status pemesanan berhasil diperbarui!',
            'data'    => $booking
        ], 200);
    }
    // 4. Fungsi DELETE untuk menghapus data booking dari dashboard
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data pemesanan berhasil dihapus!'
        ], 200);
    }
}