/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TravelPackage, BusFleet, DocumentService, FAQItem } from './types';

export const DOMESTIC_PACKAGES: TravelPackage[] = [
  {
    id: 'dom-1',
    title: 'Pesona Dewata Bali Classic',
    category: 'domestic',
    duration: '4 Hari 3 Malam',
    pricePerPax: 3250000,
    description: 'Rasakan keindahan pulau Bali secara eksklusif dengan kenyamanan armada bus pariwisata premium Darunnajah. Perjalanan meliputi Bedugul, Kuta, Ubud, hingga tebing Uluwatu.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    highlights: ['Pura Ulun Danu Bedugul', 'Sunset Dinner Pantai Jimbaran', 'Tari Kecak Uluwatu', 'Desa Panglipuran'],
    includes: ['Transportasi Bus Pariwisata AC', 'Hotel Bintang 3', 'Makan sesuai program', 'Tiket masuk wisata', 'Tour Leader & Dokumentasi']
  },
  {
    id: 'dom-2',
    title: 'Eksotisme Bromo & Malang Spektakuler',
    category: 'domestic',
    duration: '3 Hari 2 Malam',
    pricePerPax: 2150000,
    description: 'Petualangan berburu matahari terbit tercantik di Gunung Bromo dikombinasikan dengan wisata petik apel dan rekreasi keluarga di Kota Batu, Malang yang sejuk.',
    image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=800&q=80',
    highlights: ['Golden Sunrise Bromo', 'Kawah Bromo & Pasir Berbisik', 'Museum Angkut Batu', 'Wisata Petik Apel Selecta'],
    includes: ['Jeep 4x4 Bromo', 'Sewa Bus PO Darunnajah', 'Hotel Premium', 'Makan 3x Sehari', 'Guide Lokal Berpengalaman']
  },
  {
    id: 'dom-3',
    title: 'Heritage Yogyakarta & Borobudur Cultural',
    category: 'domestic',
    duration: '3 Hari 2 Malam',
    pricePerPax: 1850000,
    description: 'Menelusuri sejarah kebudayaan Jawa yang adiluhung mulai dari Candi Borobudur yang megah, Keraton Yogyakarta, pusat kerajinan perak Kotagede, hingga belanja di Malioboro.',
    image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80',
    highlights: ['Candi Borobudur & Prambanan', 'Keraton Yogyakarta', 'Lava Tour Merapi Jip', 'Belanja Malioboro'],
    includes: ['Bus Pariwisata Eksekutif', 'Akomodasi Hotel Nyaman', 'Tiket masuk Candi (Pelataran)', 'Snack & Air Mineral', 'Lokal Guide Keraton']
  },
  {
    id: 'dom-4',
    title: 'Surga Kepulauan Karimunjawa Marine',
    category: 'domestic',
    duration: '3 Hari 2 Malam',
    pricePerPax: 2450000,
    description: 'Jelajahi keindahan bawah laut pulau Karimunjawa dengan terumbu karang yang eksotik, pulau pasir putih yang sunyi, dan penangkaran hiu yang menegangkan.',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    highlights: ['Snorkeling Pulau Menjangan', 'Penangkaran Hiu', 'Sunset Tanjung Gelam', 'Bakar Ikan Segar di Pulau'],
    includes: ['Kapal Express Bahari AC JNE', 'Homestay / Resort AC', 'Makan prasmanan (Seafood)', 'Sewa alat snorkeling lengkap', 'Guide HPI Karimunjawa']
  }
];

export const INTERNATIONAL_PACKAGES: TravelPackage[] = [
  {
    id: 'int-1',
    title: 'Umroh Syawal Barokah Exclusive',
    category: 'international',
    duration: '9 Hari',
    pricePerPax: 29500000,
    description: 'Ibadah Umroh khusyuk bersama Darunnajah Travel yang telah berizin resmi PPIU dari Kemenag RI. Dilayani pembimbing ibadah (Muthawwif) berkompeten serta hotel dekat Masjidil Haram.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    highlights: ['Bimbingan Manasik Intensif', 'Ziarah Kota Makkah & Madinah', 'Kajian Rohani Rutin', 'Air Zam-Zam (Jika Diizinkan)'],
    includes: ['Tiket Pesawat Saudia Airlines PP', 'Visa Umroh Berizin Resmi', 'Hotel Bintang 5 / 4', 'Makan 3x menu Indonesia', 'Muthawwif Profesional']
  },
  {
    id: 'int-2',
    title: 'Duo Negara ASEAN: Malaysia & Singapura',
    category: 'international',
    duration: '4 Hari 3 Malam',
    pricePerPax: 5900000,
    description: 'Nikmati perpaduan modernitas Singapura dan nuansa budaya Malaysia. Sangat cocok untuk liburan keluarga atau grup instansi pendidikan.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    highlights: ['Merlion Park & Marina Bay Sands', 'Universal Studios (Photo)', 'Petronas Twin Towers KL', 'Batu Caves & Genting Highlands'],
    includes: ['Tiket Pesawat PP Jakarta', 'Sewa Bus Pariwisata AC Malaysia-SG', 'Hotel Bintang 3 Eksklusif', 'Tiket Wisata & Retribusi', 'Tour Leader dari Indonesia']
  },
  {
    id: 'int-3',
    title: 'Pesona Klasik Turki & Cappadocia',
    category: 'international',
    duration: '10 Hari 8 Malam',
    pricePerPax: 14900000,
    description: 'Jelajahi saksi bisu kejayaan Islam di Istanbul dan nikmati pemandangan ikonik balon udara di lembah bebatuan Cappadocia yang legendaris.',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hagia Sophia & Blue Mosque', 'Hot Air Balloon Cappadocia', 'Pamukkale Cotton Castle', 'Bosphorus Cruise'],
    includes: ['Tiket Pesawat Full Service PP', 'Hotel Gua Unik / Bintang 4', 'Sewa Luxury Coach Turkiye', 'Visa Masuk Turki', 'Tour Guide Lokal Berbahasa Indonesia']
  }
];

export const BUS_FLEET: BusFleet[] = [
  {
    id: 'fleet-1',
    name: 'PO Darunnajah Luxury Big Bus',
    type: 'bigbus',
    capacity: 59,
    pricePerDay: 3500000,
    features: ['Full AC Dual Blower', 'Premium Audio, Karaoke & TV LCD', 'Reclining Seat 2-3 Configuration', 'USB Charger Port di Setiap Kursi', 'Ruang Bagasi Super Luas', 'Sopir & Kru Ramah Berpengalaman'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Armada premium Mercedes-Benz / Hino dengan suspensi udara yang empuk, menjamin kenyamanan maksimal untuk rombongan instansi, sekolah, pesantren, maupun keluarga besar.'
  },
  {
    id: 'fleet-2',
    name: 'PO Darunnajah Executive Medium Bus',
    type: 'mediumbus',
    capacity: 31,
    pricePerDay: 2200000,
    features: ['Cooling AC Dingin Merata', 'Karaoke System & LCD Screen', 'Reclining Seat 2-2 Configuration', 'Port Pengisi Daya USB', 'P3K & Palu Pemecah Kaca darurat', 'Kabin bersih wangi bebas asap rokok'],
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    description: 'Sangat ideal untuk rombongan kelas menengah yang membutuhkan fleksibilitas rute dalam kota Jakarta yang dinamis maupun luar kota dengan kenyamanan kabin berkelas.'
  },
  {
    id: 'fleet-3',
    name: 'Toyota HiAce Premio Luxury',
    type: 'minivan',
    capacity: 14,
    pricePerDay: 1400000,
    features: ['Executive Captain Seats', 'Double Blower AC Dan Dingin', 'Full Sound System & Bluetooth Audio', 'Pintu Geser Ergonomis', 'Sopir Santun & Profesional'],
    image: 'https://images.unsplash.com/photo-1621007947382-cc34aa864ee3?auto=format&fit=crop&w=800&q=80',
    description: 'Kendaraan microbus premium dengan performa tangguh khas Toyota. Memberikan kestabilan dan kemewahan sekelas sedan untuk keluarga kecil atau tim bisnis.'
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
