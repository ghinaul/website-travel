<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Relasi: Setiap Booking memiliki/terhubung ke satu Layanan
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    // Ini adalah 'whitelist' izin mass assignment untuk Laravel
    protected $fillable = [
        'customer_name',
        'whatsapp_number',
        'email',
        'booking_date',
        'service_id',
        'participants',
        'user_id',
    ];

    // Relasi ke User/Staff
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}