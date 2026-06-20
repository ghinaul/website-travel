/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TravelPackage, BusFleet, DocumentService, FAQItem } from './types';

export const DOMESTIC_PACKAGES: TravelPackage[] = [
  {
    id: 'dom-1',
    title: 'Pulau Karimun Jawa dan City Tor Semarang "2-6 Juli 2026"',
    category: 'domestic',
    duration: '5 Hari 4 Malam',
    pricePerPax: 1999000,
    description: 'Menikmati Indahnya Pulau Karimun Jawa & City Tour Semarang',
    image: '/assets/foto-karimun.jpeg',
    highlights: ['Bukit Love', 'Pantai Boby', 'Pantai Tanjug Gepam', 'Snorkeling One Day Full', 'Tour Island Hopping (Pulau Menjangan, Cemara Dll)', 'Pulau Menjangan Kecil', 'Pulau Cemara Kecil', 'Nemo Sport'],
    includes: ['Transportasi Bus Pariwisata AC', 'Hotel Bintang 3', 'Makan sesuai program', 'Tiket masuk wisata', 'Tour Leader & Dokumentasi', 'Penyebrangan Kapal Jepara-Krimun Jawa']
  }
];

export const INTERNATIONAL_PACKAGES: TravelPackage[] = [
  {
    id: 'int-1',
    title: 'Umroh Plus Cairo Alexandria "12 November 2026"',
    category: 'international',
    duration: '13 Hari 10 Malam',
    pricePerPax: 39733136,
    description: 'Saatnya menyempurnakan ibadah umroh sekaligus menapaki jejak sejarah Islam di Mesir. Program ini membawa anda menuju Tanah Suci, Cairo, Alexandria, Old Coty Jeddah, hingga pengalaman istimewa Dinner Nile Cruise.',
    image: '/assets/foto-umroh.jpeg',
    highlights: ['Bimbingan Manasik Intensif', 'Ziarah Kota Makkah & Madinah', 'Air Zam-Zam', 'City Tour Cairo', 'City Tour Alexandria', 'Old City Jeddah', 'Dinner Nile Cruise', 'Museum Mummy', 'Kereta Cepat', 'Ayam Albaik', 'Perlengkapan Umroh Lengkap'],
    includes: ['Tiket Pesawat EgptAir', 'Visa Umroh Berizin Resmi', 'Hotel Cairo 3 Malam (Tiba Pyramid)', 'Hotel Madinah 3 Malam (Jaeharat Al Rasyid)', 'Hotel Makkah 4 Malam (Maysan Al Maqam)', 'Makan 3x menu Indonesia', 'Muthawwif Profesional']
  },
  {
    id: 'int-2',
    title: 'Asian Youth Model United Nations ke 22 "21-24 Agustus 2026"',
    category: 'international',
    duration: '4 Hari 3 Malam',
    pricePerPax: 22900000,
    description: 'Sebuah kesempatan emas untuk mengikuti simulasi sidang PBB tingkat Internasional dengan tema : Diplomasi dalam Kesulitan "Mengarahkan Dunia Melalui Krisis dan Perubahan".',
    image: '/assets/foto-aymun.jpeg',
    highlights: ['Dibuka untuk umum usia 11-25 th'],
    includes: ['Tiket Pesawat PP', 'Ground Hamdling di Bandara Soekarno Hatta PP', 'Hotel Bintang 5', 'City Tour', 'E-book MUN', 'Tools Kits (t-shirt, notepad, stiker', 'Secretary General dari Portugal', 'Penjeoutan Peserta dari bandara di Kuala lumpur ke hotel PP', '40 video MUN', '10X Offline Coaching', '2x Coffe Break & 1x Lumch', 'Board of Dais (Pimpinan Sidang) yang datang dari berbagai negara', 'Scoring Matrix', 'Dokumentasi on Event', 'International Sertifikat', 'Meals setiap hari selama mengikuti acara', 'Gala Dinner saat Opening & Closing Ceremony', 'Video General Speaker List saat anak Speach']
  },
  {
    id: 'int-3',
    title: 'ASEAN SCETRO KE 7 "Oktober 2026"',
    category: 'international',
    duration: '14 Hari 13 Malam',
    pricePerPax: 27750000,
    description: 'Nikmati keseruan edukasi kepramukaan keliling 5 negara (Vietnam, Laoss, Thailand, Malaysia, Singapore, Indonesia).',
    image: '/assets/foto-asean-scetro.jpeg',
    highlights: ['Kunjungan ke Perwakilan/Kedutaan/Konsulat Jendral Indonesia di Negara Tujuan', 'Kunjungan ke Biro-biro Keperamukaan (NSO) dibeberapa negara tujuan', 'Kunjungan ke Sekolah/Universitas unggulan dan pembesar negara setempat', 'Penampilan keterampilan kepramukaan dan seni nusantara', 'Kunjungan objek wisata dan berbelanja disetiap negara'],
    includes: ['Tiket Pesawat : Jakarta - Hanoi Vietnam & Batam - Jakarta', 'Tiket Penyebrangan Jet Foil Setulang Laut Johor Bahru -  Batam Center', 'Bus Pariwisata selama kegiatan', 'Hotel', 'Tiket Wisata', 'Tour Leader & Tips Supir', 'Makan 3x sehari']
  },
   {
    id: 'int-4',
    title: 'Umroh Plus Cairo Alexandria "24 Desember 2026"',
    category: 'international',
    duration: '13 Hari 10 Malam',
    pricePerPax: 39733136,
    description: 'Saatnya menyempurnakan ibadah umroh sekaligus menapaki jejak sejarah Islam di Mesir. Program ini membawa anda menuju Tanah Suci, Cairo, Alexandria, Old Coty Jeddah, hingga pengalaman istimewa Dinner Nile Cruise.',
    image: '/assets/foto-umroh.jpeg',
    highlights: ['Bimbingan Manasik Intensif', 'Ziarah Kota Makkah & Madinah', 'Air Zam-Zam', 'City Tour Cairo', 'City Tour Alexandria', 'Old City Jeddah', 'Dinner Nile Cruise', 'Museum Mummy', 'Kereta Cepat', 'Ayam Albaik', 'Perlengkapan Umroh Lengkap'],
    includes: ['Tiket Pesawat EgptAir', 'Visa Umroh Berizin Resmi', 'Hotel Cairo 3 Malam (Tiba Pyramid)', 'Hotel Madinah 3 Malam (Jaeharat Al Rasyid)', 'Hotel Makkah 4 Malam (Maysan Al Maqam)', 'Makan 3x menu Indonesia', 'Muthawwif Profesional']
  }
];

export const BUS_FLEET: BusFleet[] = [
  {
    id: 'fleet-1',
    name: 'PO Darunnajah Hiace',
    type: 'minivan',
    capacity: 13/14,
    pricePerDay: 3500000,
    features: ['Full AC Dual Blower', 'Premium Audio, Karaoke & TV LCD', 'Reclining Seat 2-3 Configuration', 'USB Charger Port di Setiap Kursi', 'Ruang Bagasi Super Luas', 'Sopir & Kru Ramah Berpengalaman'],
    image: '/assets/foto-hiace.jpeg',
    description: 'Armada premium Mercedes-Benz / Hino dengan suspensi udara yang empuk, menjamin kenyamanan maksimal untuk rombongan instansi, sekolah, pesantren, maupun keluarga besar.'
  },
  {
    id: 'fleet-2',
    name: 'PO Darunnajah Executive Medium Bus',
    type: 'mediumbus',
    capacity: 33/35,
    pricePerDay: 1700000,
    features: ['Cooling AC Dingin Merata', 'Karaoke System & LCD Screen', 'Reclining Seat 2-2 Configuration', 'Port Pengisi Daya USB', 'P3K & Palu Pemecah Kaca darurat', 'Kabin bersih wangi bebas asap rokok'],
    image: '/assets/foto-bus-medium.jpeg',
    description: 'Sangat ideal untuk rombongan kelas menengah yang membutuhkan fleksibilitas rute dalam kota Jakarta yang dinamis maupun luar kota dengan kenyamanan kabin berkelas.'
  },
  {
    id: 'fleet-3',
    name: 'BYD M6',
    type: 'minivan',
    capacity: 5,
    pricePerDay: 750000,
    features: ['Executive Captain Seats', 'Double Blower AC Dan Dingin', 'Full Sound System & Bluetooth Audio', 'Sopir Santun & Profesional'],
    image: '/assets/foto-byd-m6.jpg',
    description: 'Kendaraan premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
  },
  {
    id: 'fleet-4',
    name: 'Toyota Vellfire',
    type: 'minivan',
    capacity: 6,
    pricePerDay: 3000000,
    features: ['Executive Captain Seats', 'Double Blower AC Dan Dingin', 'Full Sound System & Bluetooth Audio', 'Pintu Geser Ergonomis', 'Sopir Santun & Profesional'],
    image: '/assets/foto-vellfire.jpg',
    description: 'Kendaraan premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
  },
  {
    id: 'fleet-5',
    name: 'Inova Reborn',
    type: 'minivan',
    capacity: 5,
    pricePerDay: 750000,
    features: ['Executive Captain Seats', 'Double Blower AC Dan Dingin', 'Full Sound System & Bluetooth Audio', 'Sopir Santun & Profesional'],
    image: '/assets/foto-inova-reborn.jpg',
    description: 'Kendaraan  premium dengan performa tangguh. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
  },
  {
    id: 'fleet-6',
    name: 'Denza D9',
    type: 'minivan',
    capacity: 6,
    pricePerDay: 2500000,
    features: ['Executive Captain Seats', 'Double Blower AC Dan Dingin', 'Full Sound System & Bluetooth Audio', 'Pintu Geser Ergonomis', 'Sopir Santun & Profesional'],
    image: '/assets/foto-denza-d9.jpg',
    description: 'Kendaraan premium dengan performa tangguh. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
  }
];

export const DOCUMENT_SERVICES: DocumentService[] = [
  {
    id: 'doc-1',
    name: 'Pengurusan Visa Turis / Bisnis',
    type: 'visa',
    priceEstimation: 1850000,
    duration: '7 - 14 Hari Kerja',
    requirements: ['Paspor asli masa berlaku min. 6 bulan', 'Pas Foto terbaru latar belakang putih', 'Surat rekomendasi kerja / Sponsor', 'Rekening koran 3 bulan terakhir', 'Kartu Keluarga & KTP'],
    description: 'Layanan asistensi pembuatan visa berbagai negara tujuan (Schengen Eropa, Jepang, Korea, Amerika, Australia) secara aman dan profesional dengan tingkat persetujuan tinggi.'
  },
  {
    id: 'doc-2',
    name: 'Pengurusan ITAS (Izin Tinggal Terbatas)',
    type: 'itas',
    priceEstimation: 8500000,
    duration: '15 - 20 Hari Kerja',
    requirements: ['Paspor asli WNA masih aktif', 'Surat permohonan sponsor/perusahaan', 'RPTKA & IMTA dari Depnaker', 'KTP & KK Pengurus/Penjamin', 'Domisili tempat tinggal di Indonesia'],
    description: 'Pengurusan dokumen izin tinggal terbatas (ITAS) bagi warga negara asing (WNA) yang bekerja, studi, atau penyatuan keluarga di wilayah Indonesia sesuai aturan keimigrasian RI.'
  }
];

export const HISTORY_INFO = {
  title: 'Sejarah PT DARUNNAJAH ZAHRA UTAMA',
  content: `PT DARUNNAJAH ZAHRA UTAMA berawal dari Travel Haji & Umrah yang berdiri sejak tahun 2000. Sejak permulaannya, kami telah memiliki legalitas dan izin resmi secara mandiri dari Kementerian Agama Republik Indonesia dengan SK IZIN PPIU 02201051212440004. Kepercayaan para jamaah yang tinggi menjadi batu pijakan utama bagi perkembangan kami.

Seiring berjalannya waktu dan meningkatnya kebutuhan masyarakat akan angkutan pariwisata yang aman, terpercaya, dan profesional, maka didirikanlah PO (Perusahaan Oto Bus) PT DARUNNAJAH ZAHRA UTAMA pada tahun 2012. Langkah strategis ini diambil sebagai bentuk komitmen pengembangan lini usaha khusus khususnya di bidang transportasi angkutan pariwisata. 

Dengan prinsip konsisten dan amanah, kami senantiasa melayani kebutuhan transportasi pariwisata dengan rute domestik maupun internasional, mempertahankan reputasi sebagai armada terpercaya hingga saat ini.`
};

export const VISION_MISSION = {
  vision: 'Menjadi penyedia layanan travel bus pariwisata terkemuka yang memberikan pengalaman perjalanan yang berkualitas, aman, dan tidak terlupakan bagi setiap pelanggan.',
  missions: [
    'Menyediakan armada bus pariwisata yang nyaman, modern, dan selalu dalam kondisi prima.',
    'Memberikan layanan yang personal dan profesional kepada setiap pelanggan untuk memastikan kepuasan mereka.',
    'Menjaga standar keamanan tertinggi selama perjalanan.',
    'Mendorong pariwisata lokal dengan menghadirkan paket perjalanan yang mendukung destinasi wisata di berbagai daerah.',
    'Terus mengembangkan inovasi dalam layanan travel bus pariwisata untuk memenuhi kebutuhan dan harapan pelanggan.'
  ]
};

export const REASONS_WHY = [
  {
    title: 'Izin Resmi PPIU Kemenag RI',
    description: 'Telah terdaftar resmi dengan SK IZIN PPIU No. 02201051212440004 sejak tahun 2000, menjamin keamanan legalitas penuh dalam setiap layanan perjalanan ibadah dan wisata.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Armada Bus PO Sendiri',
    description: 'Memiliki PO Bus Pariwisata PT DARUNNAJAH ZAHRA UTAMA (sejak 2012). Armada terawat berkala dengan standar kenyamanan, AC dingin, suspensi prima, dan fasilitas multimedia lengkap.',
    icon: 'Bus'
  },
  {
    title: 'Konsisten & Amanah',
    description: 'Didukung oleh kru bersertifikat, sopir handal yang mengutamakan keselamatan (safety first), serta sistem reservasi terpercaya yang selalu siap melayani kebutuhan Anda.',
    icon: 'CalendarHeart'
  },
  {
    title: 'Layanan Terpadu & Fleksibel',
    description: 'Kami melayani hulu ke hilir: dari paket pariwisata, ziarah/umroh, sewa unit bus premium hiace, hingga pengurusan dokumen keimigrasian internasional (Visa & ITAS).',
    icon: 'FolderKanban'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara melakukan pemesanan paket wisata atau sewa bus?',
    answer: 'Anda dapat menggunakan Sistem Pemesanan interaktif di website kami, mengisi formulir dengan detail layanan yang diinginkan, lalu mengirimkan formulir tersebut. Sistem kami akan mendata pesanan dan tim admin kami di Ulujami akan langsung menghubungi Anda melalui WhatsApp atau telepon untuk detail pembayaran.',
    category: 'booking'
  },
  {
    id: 'faq-2',
    question: 'Berapa izin legalitas dari Darunnajah Tours & Travel?',
    answer: 'Kami beroperasi di bawah PT DARUNNAJAH ZAHRA UTAMA dengan izin resmi PPIU (Penyelenggara Perjalanan Ibadah Umrah) Kementerian Agama RI dengan Nomor Surat Keputusan SK IZIN PPIU 02201051212440004.',
    category: 'legal'
  },
  {
    id: 'faq-3',
    question: 'Apa saja fasilitas yang tersedia di dalam Bus Pariwisata Darunnajah?',
    answer: 'Armada PO Bus kami dilengkapi dengan pendingin kabin (AC) modern, TV LCD, soundsystem karaoke, reclining seats, colokan USB charger di tiap kursi, serta area bagasi yang luas dan suspensi udara (air-suspension) untuk kenyamanan rute jarak jauh.',
    category: 'fleet'
  },
  {
    id: 'faq-4',
    question: 'Apakah biaya sewa bus sudah termasuk bahan bakar dan sopir?',
    answer: 'Ya, harga sewa bus pariwisata dan armada HiAce yang tertera sudah termasuk jasa Pemudi/Sopir profesional dan bahan bakar (BBM). Harga umumnya belum termasuk biaya tol, parkir, konsumsi kru, serta penginapan kru jika menginap ke luar kota.',
    category: 'pricing'
  },
  {
    id: 'faq-5',
    question: 'Berapa lama proses pengerjaan Visa dan ITAS?',
    answer: 'Untuk visa pariwisata berkisar antara 7-14 hari kerja tergantung kebijakan kedutaan negara tujuan. Sedangkan untuk ITAS (Izin Tinggal Terbatas WNA) membutuhkan waktu 15-20 hari kerja karena melibatkan pelaporan ke kementerian tenaga kerja keimigrasian.',
    category: 'document'
  }
];
