<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Ini adalah 'whitelist' izin mass assignment untuk Laravel
    protected $fillable = [
        'customer_name',  // Menghilangkan error customer_name kemarin
        'whatsapp_number',// Mengizinkan kolom No. WhatsApp
        'email',          // Mengizinkan kolom Email
        'booking_date',   // Mengizinkan kolom Tanggal Pemesanan
        'service',        // Mengizinkan jenis layanan (Paket Wisata/Sewa Bus)
        'participants',   // Mengizinkan Jumlah Peserta
    ];
}
