<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    // Menentukan kolom mana saja yang boleh diisi
    protected $fillable = [
        'service_name',
        'category',
        'price',
        'description',
    ];

    // Relasi: Satu Layanan bisa dipesan oleh banyak Booking
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}