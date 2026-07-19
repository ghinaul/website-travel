/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Quote, Image as ImageIcon, MapPin, Calendar, Camera, User, Heart, MessageSquare } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'umrah' | 'domestic' | 'bus';
  year: string;
  location: string;
  image: string;
  description: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  avatar: string;
  comment: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sosial Cultural Visit Pimpinan Pesantren ke Australia',
    category: 'domestic', // international but group tour
    year: '2018',
    location: 'Australia',
    image: '/assets/foto-scv-australia-2018.jpeg',
    description: 'Keberangkatan Sosial Cultural Visit Pimpinan Pesantren ke Australia.'
  },
  {
    id: 'gal-2',
    title: 'Sosial Cultural Visit Turkey ke-1',
    category: 'domestic', // international but group tour
    year: '2021',
    location: 'Turkey',
    image: '/assets/foto-scv-turki1-2021.png',
    description: 'Menapak tilas sejarah peradaban Islam di Hagia Sophia dan dokumentasi perjalanan studi banding dan rekreasi santri Darunnajah ke Turkey.'
  },
  {
    id: 'gal-3',
    title: 'Sosial Cultural Visit Turkey ke-2',
    category: 'domestic', // international but group tour
    year: '2021',
    location: 'Turkey',
    image: '/assets/foto-scv-turki2-2021.png',
    description: 'Menapak tilas sejarah peradaban Islam di Hagia Sophia dan dokumentasi perjalanan studi banding dan rekreasi santri Darunnajah ke Turkey.'
  },
  {
    id: 'gal-4',
    title: 'Sosial Cultural Visit Turkey ke-3',
    category: 'domestic', // international but group tour
    year: '2022',
    location: 'Turkey',
    image: '/assets/foto-scv-turki3-2022.png',
    description: 'Menapak tilas sejarah peradaban Islam di Hagia Sophia dan dokumentasi perjalanan studi banding dan rekreasi santri Darunnajah ke Turkey.'
  },
  {
    id: 'gal-5',
    title: 'Sosial Cultural Visit Turkey ke-4',
    category: 'domestic', // international but group tour
    year: '2022',
    location: 'Turkey',
    image: '/assets/foto-scv-turki4-2022.jpg',
    description: 'Menapak tilas sejarah peradaban Islam di Hagia Sophia dan dokumentasi perjalanan studi banding dan rekreasi santri Darunnajah ke Turkey.'
  },
  {
    id: 'gal-6',
    title: 'Edu Cultural Singapore - Malayasia',
    category: 'domestic', // international but group tour
    year: '2023',
    location: 'Singapore - Malayasia',
    image: '/assets/foto-sigmal-2023.jpeg',
    description: 'Menapak tilas sejarah peradaban Islam di Hagia Sophia dan dokumentasi perjalanan studi banding dan rekreasi santri Darunnajah ke Turkey.'
  },
  {
    id: 'gal-7',
    title: 'Dauroh Ummul Qura Santri ke-6',
    category: 'domestic', // international but group tour
    year: '2023',
    location: 'Meekkah - Madinah',
    image: '/assets/foto-duq6-2023.jpg',
    description: 'Belajar bahasa arab selama 1 bulan di Mekkah plus umroh.'
  },
  {
    id: 'gal-8',
    title: 'Sosial Cultural Visit ke Jepang',
    category: 'domestic', // international but group tour
    year: '2024',
    location: 'Osaka',
    image: '/assets/foto-scv-jepang-2024.jpeg',
    description: 'Meniikmati keseruan edukasi kepramukaan keliling 5 negara (Vietnam, Laoss, Thailand, Malaysia, Singapore, Indonesia).'
  },
  {
    id: 'gal-9',
    title: 'Asean Scetro ke 5',
    category: 'domestic', // international but group tour
    year: '2024',
    location: 'Singapore - Malayasia - Thailand - Laos - Vietnam',
    image: '/assets/foto-asean-scetro5-2024.jpg',
    description: 'Meniikmati keseruan edukasi kepramukaan keliling 5 negara (Vietnam, Laoss, Thailand, Malaysia, Singapore, Indonesia).'
  },
  {
    id: 'gal-10',
    title: 'Konvoi Armada Big Bus Luxury di Tol Cipali',
    category: 'bus',
    year: '2025',
    location: 'Tol Trans Jawa',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Iring-iringan 3 unit Mercedes-Benz Big Bus PO Darunnajah mengantarkan rombongan ziarah Wali Songo Jawa Tengah.'
  }
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Bp. Dr. H. Ahmad Fauzi, M.Ag',
    role: 'Ketua Yayasan Pendidikan Rosulullah',
    location: 'Jakarta Barat',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    comment: 'Penyewaan bus di Darunnajah adalah keputusan terbaik bagi sekolah kami. Kru bus sangat santun, bus dalam kondisi bersih wangi saat berangkat di subuh hari, dan sopir menyetir dengan sangat stabil serta amanah.',
    tag: 'Sewa Bus Pariwisata'
  },
  {
    id: 'test-2',
    name: 'Ibu Hj. Shofiah Mutmainnah',
    role: 'Jamaah Umroh Syawal',
    location: 'Jakarta Selatan',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    comment: 'Alhamdulillah, pelayanan Umroh dari PT Darunnajah Zahra Utama luar biasa khusyuk. Jarak hotel dekat, Muthawwif sangat mumpuni menerangkan manasik, dan makanan menu Indonesia selalu siap tepat waktu serta lezat.',
    tag: 'Paket Umroh'
  },
  {
    id: 'test-3',
    name: 'Bpk. Ridwan Hermawan',
    role: 'Staf HR & GA PT Sinergi Cipta Mandiri',
    location: 'Depok',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    comment: 'Sangat terbantu dengan tim legal Darunnajah saat pengurusan dokumen ITAS tenaga ahli asing kami. Dokumen rampung tepat waktu, asisten keimigrasian sangat responsif menerangkan regulasi terupdate. Rekomendasi bintang lima!',
    tag: 'Jasa ITAS WNA'
  },
  {
    id: 'test-4',
    name: 'Keluarga Bpk. Slamet Raharjo',
    role: 'Peserta Tour Dewata Bali',
    location: 'Tangerang',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    comment: 'Pertama kali mencoba paket liburan domestik bersama Darunnajah dan langsung merasa nyaman. Jadwal wisatanya sangat terarah, anak-anak senang karena bus tidurnya empuk dan tour leader-nya membawakan kuis yang komunikatif.',
    tag: 'Wisata Domestik'
  }
];

export default function TestimonialsGallery() {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'umrah' | 'domestic' | 'bus'>('all');

  const filteredGallery = activeSubTab === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeSubTab);

  return (
    <section id="testimonials-gallery" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black text-amber-500 bg-emerald-950 px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
            Kepuasan & Bukti Nyata
          </span>
          <h2 className="text-3xl font-extrabold text-emerald-950 sm:text-5xl tracking-tight mt-5 leading-tight">
            Testimoni & Dokumentasi Perjalanan
          </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Melihat lebih dekat senyuman ribuan jamaah, keseruan rekreasi para peserta, serta keandalan armada bus pariwisata PT Darunnajah Zahra Utama di berbagai destinasi.
          </p>
        </div>

        {/* Dynamic Metric Accents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {[
            { value: '15K+', label: 'Jamaah Terlayani', desc: 'Sejak Tahun 2000' },
            { value: '450+', label: 'Pemesanan Sewa Bus', desc: 'Armada PO Sendiri' },
            { value: '98.7%', label: 'Indeks Kepuasan', desc: 'Ulasan Sangat Baik' },
            { value: '100%', label: 'Legalitas Keamanan', desc: 'Izin Resmi Kemenag RI' }
          ].map((metric, idx) => (
            <div key={idx} className="p-5 text-center bg-slate-50/70 border border-slate-200/50 rounded-2xl shadow-sm">
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-950">{metric.value}</div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mt-1">{metric.label}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{metric.desc}</div>
            </div>
          ))}
        </div>

        {/* 1. SECTION TESTIMONIALS */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-150 pb-4">
            <div className="p-2.5 bg-emerald-955 bg-[#052e16] text-amber-400 rounded-xl">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-emerald-950">Apa Kata Pelanggan Kami?</h3>
              <p className="text-xs text-slate-500">Ulasan tulus dari perorangan, pimpinan instansi, hingga jamaah umroh.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="relative bg-slate-50/50 border border-slate-200/40 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:border-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
                id={`testimonial-card-${test.id}`}
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-8 text-emerald-950/5 pointer-events-none">
                  <Quote className="h-16 w-16 transform rotate-180" />
                </div>

                <div>
                  {/* Service Badge & Star ratings */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                      {test.tag}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm italic leading-relaxed mb-6 font-sans">
                    "{test.comment}"
                  </p>
                </div>

                {/* Profile layout */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-250 border-dashed">
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white ring-2 ring-emerald-950/15"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{test.name}</h5>
                    <p className="text-xs text-slate-500">{test.role} • <span className="text-emerald-700 font-semibold">{test.location}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. SECTION ARCHIVE GALLERY DOKUMENTASI */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-150 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-955 bg-[#052e16] text-amber-400 rounded-xl">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-950">Dokumentasi Program Sebelumnya</h3>
                <p className="text-xs text-slate-500">Momen-momen indah peninggalan rekam jejak wisata kami.</p>
              </div>
            </div>
            
          </div>

          {/* Grid layout for images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-emerald-500/10 transition-all duration-300 flex flex-col h-full"
                id={`gallery-card-${item.id}`}
              >
                {/* Photo space */}
                <div className="relative h-60 overflow-hidden bg-emerald-950">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Top tags */}
                  <div className="absolute top-4 left-4 bg-emerald-950/95 text-amber-400 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider border border-emerald-800">
                    {item.year}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-emerald-950/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl backdrop-blur-md border border-emerald-850 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-amber-400" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-base font-extrabold text-emerald-950 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative bar */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-[10px] font-bold text-emerald-700 font-mono tracking-wider uppercase">
                    <Heart className="h-3 w-3 text-red-500 fill-red-500 shrink-0" />
                    <span>Darunnajah Family verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
