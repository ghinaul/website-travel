/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bus, Landmark, Compass, ShieldCheck, ArrowRight, Camera, MessageSquare } from 'lucide-react';

interface HeroProps {
  onNavigateToBooking: () => void;
  onExploreCatalog: (tabId?: 'all' | 'packages' | 'rentcar' | 'docs') => void;
}

export default function Hero({ onNavigateToBooking, onExploreCatalog }: HeroProps) {
  return (
    <div id="hero" className="relative bg-emerald-950 min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background patterns and gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.15)_0,transparent_60%)]" />
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
          alt="Premium travel bus exterior"
          className="w-full h-full object-cover opacity-25 mix-blend-overlay scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-900/50 border border-emerald-800/80 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-8 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
          <span>Kantor Utama Ulujami, Jakarta Selatan</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
          Destinasi Impian & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400">
            Bus Pariwisata Terbaik
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-emerald-100/90 font-sans leading-relaxed mb-12">
          PT Darunnajah Zahra Utama menghadirkan armada Bus Pariwisata Eksekutif terbaik, paket tour mancanegara, serta bimbingan administrasi Visa & ITAS reguler. Layanan penuh komitmen di bawah naungan izin PPIU Kemenag RI resmi.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onNavigateToBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 text-emerald-950 font-black rounded-xl shadow-lg shadow-amber-500/25 hover:bg-amber-400 hover:scale-[1.02] transition-all cursor-pointer text-xs uppercase tracking-wider"
            id="hero-btn-booking"
          >
            Pesan Cepat (Booking Form)
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onExploreCatalog('all')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-900/60 text-white font-bold rounded-xl border border-emerald-500/30 hover:bg-emerald-900 hover:border-emerald-500/50 hover:scale-[1.02] transition-all cursor-pointer text-xs uppercase tracking-wider"
            id="hero-btn-catalog"
          >
            Katalog Unit & Layanan
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('testimonials-gallery');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl border border-white/20 hover:border-white/35 hover:scale-[1.02] transition-all cursor-pointer text-xs uppercase tracking-wider"
            id="hero-btn-testimonials"
          >
            <Camera className="h-4 w-4 text-amber-400" />
            Testimoni & Dokumentasi
          </button>
        </div>

        {/* Quick Launch Services Grid - Package, Rentcar, and Visa & ITAS Buttons */}
        <div className="mb-16">
          <p className="text-xs font-bold text-amber-400/80 tracking-[0.25em] uppercase mb-6 font-mono">PILIH LAYANAN UTAMA KAMI</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <button
              onClick={() => onExploreCatalog('packages')}
              className="group text-left p-5 rounded-2xl bg-emerald-900/25 hover:bg-emerald-900/50 border border-emerald-800/60 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 flex items-center gap-4 cursor-pointer"
              id="hero-service-btn-packages"
            >
              <div className="p-3 bg-gradient-to-tr from-amber-500 to-amber-400 text-emerald-950 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Compass className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Paket Wisata & Umroh</h4>
                <p className="text-[11px] text-emerald-100/70 leading-normal mt-0.5">Tour religi & wisata halal mancanegara.</p>
              </div>
            </button>

            <button
              onClick={() => onExploreCatalog('rentcar')}
              className="group text-left p-5 rounded-2xl bg-emerald-900/25 hover:bg-emerald-900/50 border border-emerald-800/60 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 flex items-center gap-4 cursor-pointer"
              id="hero-service-btn-rentcar"
            >
              <div className="p-3 bg-gradient-to-tr from-amber-500 to-amber-400 text-emerald-950 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                <Bus className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Sewa Bus Pariwisata</h4>
                <p className="text-[11px] text-emerald-100/70 leading-normal mt-0.5">Armada PO Bus Eksekutif modern & nyaman.</p>
              </div>
            </button>

            <button
              onClick={() => onExploreCatalog('docs')}
              className="group text-left p-5 rounded-2xl bg-emerald-900/25 hover:bg-emerald-900/50 border border-emerald-800/60 hover:border-amber-400/40 hover:shadow-2xl hover:shadow-emerald-950/40 transition-all duration-300 flex items-center gap-4 cursor-pointer"
              id="hero-service-btn-docs"
            >
              <div className="p-3 bg-gradient-to-tr from-amber-500 to-amber-400 text-emerald-950 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Layanan Visa & ITAS</h4>
                <p className="text-[11px] text-emerald-100/70 leading-normal mt-0.5">Legalisasi keimigrasian & perizinan resmi.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Floating Quick Trust Factors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-emerald-905 border-opacity-30">
          <div className="flex flex-col items-center p-4 rounded-xl bg-emerald-900/35 border border-emerald-800/50 backdrop-blur-sm">
            <span className="text-2xl lg:text-3xl font-extrabold text-amber-400 mb-1">24+</span>
            <span className="text-xs text-emerald-300 font-medium tracking-wide uppercase">Tahun Dedikasi</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-emerald-900/35 border border-emerald-800/50 backdrop-blur-sm">
            <span className="text-2xl lg:text-3xl font-extrabold text-amber-400 mb-1">Official</span>
            <span className="text-xs text-emerald-300 font-medium tracking-wide uppercase font-mono">Izin PPIU Kemenag</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-emerald-900/35 border border-emerald-800/50 backdrop-blur-sm">
            <span className="text-2xl lg:text-3xl font-extrabold text-amber-400 mb-1">PO Bus</span>
            <span className="text-xs text-emerald-300 font-medium tracking-wide uppercase">Milik Sendiri</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-emerald-900/35 border border-emerald-800/50 backdrop-blur-sm">
            <span className="text-2xl lg:text-3xl font-extrabold text-amber-400 mb-1">100%</span>
            <span className="text-xs text-emerald-300 font-medium tracking-wide uppercase">Amanah & Legal</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Wave bottom cut */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
    </div>
  );
}
