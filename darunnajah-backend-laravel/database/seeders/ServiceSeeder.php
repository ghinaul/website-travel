<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data contoh untuk Paket Umroh (Category: package)
        Service::create([
            'service_name' => 'Umroh Syawal Barokah Exclusive (9 Hari)',
            'category' => 'package',
            'price' => 32500000,
            'description' => 'Paket Umroh reguler eksekutif bintang 5 termasuk tiket pesawat PP, hotel, dan makan 3x sehari.',
        ]);

        Service::create([
            'service_name' => 'Umroh Akbar Akhir Tahun (12 Hari)',
            'category' => 'package',
            'price' => 38000000,
            'description' => 'Paket perjalanan umroh akhir tahun dengan rute plus City Tour Thaif.',
        ]);

        // Data contoh untuk Sewa Bus (Category: rentcar)
        Service::create([
            'service_name' => 'PO Darunnajah Luxury Big Bus (45 Seats)',
            'category' => 'rentcar',
            'price' => 3500000,
            'description' => 'Sewa armada Big Bus eksekutif per hari termasuk supir dan BBM (luar kota).',
        ]);

        Service::create([
            'service_name' => 'PO Darunnajah Medium Bus (30 Seats)',
            'category' => 'rentcar',
            'price' => 2500000,
            'description' => 'Sewa armada Medium Bus nyaman untuk rombongan keluarga/kantor.',
        ]);
    }
}