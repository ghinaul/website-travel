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
        // ==========================================
        // 1. DATA PAKET UMROH & WISATA (category: package)
        // ==========================================
        Service::create([
            'service_name' => 'Umroh Plus Cairo Alexandria "12 November 2026"',
            'category' => 'package',
            'price' => 39733136,
            'description' => 'Saatnya menyempurnakan ibadah umroh sekaligus menapaki jejak sejarah Islam di Mesir. Program ini membawa anda menuju Tanah Suci, Cairo, Alexandria, Old Coty Jeddah, hingga pengalaman istimewa Dinner Nile Cruise.',
        ]);

         Service::create([
            'service_name' => 'Umroh Plus Cairo Alexandria "24 Desember 2026"',
            'category' => 'package',
            'price' => 39733136,
            'description' => 'Saatnya menyempurnakan ibadah umroh sekaligus menapaki jejak sejarah Islam di Mesir. Program ini membawa anda menuju Tanah Suci, Cairo, Alexandria, Old Coty Jeddah, hingga pengalaman istimewa Dinner Nile Cruise.',
        ]);

        Service::create([ 
            'service_name' => 'Pulau Karimun Jawa dan City Tor Semarang "2-6 Juli 2026"',
            'category' => 'package',
            'price' => 1999000,
            'description' => 'Menikmati Indahnya Pulau Karimun Jawa & City Tour Semarang',
        ]);

         Service::create([ 
            'service_name' => 'Asian Youth Model United Nations ke 22 "21-24 Agustus 2026"',
            'category' => 'package',
            'price' => 22900000,
            'description' => 'Sebuah kesempatan emas untuk mengikuti simulasi sidang PBB tingkat Internasional dengan tema : Diplomasi dalam Kesulitan "Mengarahkan Dunia Melalui Krisis dan Perubahan".',
        ]);

          Service::create([ 
            'service_name' => 'Dauroh Ummul Quro Tokoh ke-18  "2-21 Juli 2026"',
            'category' => 'package',
            'price' => 31380000,
            'description' => 'Belajar bahasa arab selama 1 bulan di Mekkah plus umroh.',
        ]);

         Service::create([ 
            'service_name' => 'ASEAN SCETRO KE 7 "Oktober 2026"',
            'category' => 'package',
            'price' => 27750000,
            'description' => 'Nikmati keseruan edukasi kepramukaan keliling 5 negara (Vietnam, Laoss, Thailand, Malaysia, Singapore, Indonesia).',
        ]);


        // ==========================================
        // 2. DATA LAYANAN VISA & ITAS (category: package - agar masuk tab non-kendaraan)
        // ==========================================
        Service::create([
            'service_name' => 'Pengurusan Visa Turis / Bisnis',
            'category' => 'package',
            'price' => 1850000,
            'description' =>'Layanan asistensi pembuatan visa berbagai negara tujuan (Schengen Eropa, Jepang, Korea, Amerika, Australia) secara aman dan profesional dengan tingkat persetujuan tinggi.'
        ]);

        Service::create([
            'service_name' => 'Pengurusan ITAS (Izin Tinggal Terbatas)',
            'category' => 'package',
            'price' => 8500000,
            'description' => 'Pengurusan dokumen izin tinggal terbatas (ITAS) bagi warga negara asing (WNA) yang bekerja, studi, atau penyatuan keluarga di wilayah Indonesia sesuai aturan keimigrasian RI.'
        ]);

        // ==========================================
        // 3. DATA SEWA BUS & ARMADA KENDARAAN (category: rentcar)
        // ==========================================
        Service::create([
            'service_name' => 'PO Darunnajah Hiace',
            'category' => 'rentcar',
            'price' => 3500000,
            'description' => 'Armada premium Mercedes-Benz / Hino dengan suspensi udara yang empuk, menjamin kenyamanan maksimal untuk rombongan instansi, sekolah, pesantren, maupun keluarga besar.'
        ]);

        Service::create([
            'service_name' => 'PO Darunnajah Executive Medium Bus',
            'category' => 'rentcar',
            'price' => 1700000,
            'description' => 'Sangat ideal untuk rombongan kelas menengah yang membutuhkan fleksibilitas rute dalam kota Jakarta yang dinamis maupun luar kota dengan kenyamanan kabin berkelas.'
        ]);

        Service::create([
            'service_name' => 'BYD M6',
            'category' => 'rentcar',
            'price' => 750000,
            'description' => 'Kendaraan premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
        ]);

        Service::create([
            'service_name' => 'Toyota Vellfire',
            'category' => 'rentcar',
            'price' => 3000000,
            'description' =>  'Kendaraan premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
        ]);

         Service::create([
            'service_name' => 'Inova Reborn',
            'category' => 'rentcar',
            'price' => 750000,
            'description' =>  'Kendaraan premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
        ]);

         Service::create([
            'service_name' => 'Denza D9',
            'category' => 'rentcar',
            'price' => 2500000,
            'description' =>  'Kendaraan premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
        ]);
    }
}