<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Tambahkan baris ini biar semua kolom diizinkan masuk ke database:
    protected $guarded = [];

    protected $fillable = [
    'user_id',
    'customer_name',
    'email',
    'whatsapp_number',
    'booking_date',
    'service_id',
    'participants',
    'special_notes',
    'total_price',
    'status'
];

    // Relasi: Setiap Booking memiliki/terhubung ke satu Layanan
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
