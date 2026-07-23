/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Bus, HeartHandshake, FolderHeart } from 'lucide-react';
import { REASONS_WHY } from '../data';

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-7 w-7 text-amber-400" />,
  Bus: <Bus className="h-7 w-7 text-amber-400" />,
  CalendarHeart: <HeartHandshake className="h-7 w-7 text-amber-400" />,
  FolderKanban: <FolderHeart className="h-7 w-7 text-amber-400" />
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-emerald-950 sm:text-5xl tracking-tight leading-tight">
          Mengapa Memilih <br />
          Darunnajah Tours & Travel?
        </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Menyatukan pengalaman puluhan tahun di bidang Haji, Umrah, dan transportasi bus pariwisata profesional guna menyuguhkan perjalanan berkualitas prima untuk kenyamanan Anda.
          </p>
        </div>

        {/* Bento Grid layout / custom styled cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REASONS_WHY.map((reason, idx) => (
            <div 
              key={idx}
              className="p-8 bg-white rounded-3xl border border-slate-100/80 shadow-[0_4px_30px_rgba(4,47,26,0.03)] hover:shadow-[0_10px_50px_rgba(4,47,26,0.08)] hover:border-emerald-500/10 transition-all duration-300 group flex flex-col justify-between"
              id={`why-card-${idx}`}
            >
              <div>
                {/* Icon Container */}
                <div className="p-4 bg-emerald-950 rounded-2xl inline-flex items-center justify-center mb-6 shadow-lg shadow-emerald-950/10 group-hover:scale-105 transition-transform duration-300">
                  {iconMap[reason.icon] || <ShieldCheck className="h-7 w-7 text-amber-400" />}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-emerald-950 mb-3 group-hover:text-emerald-700 transition-colors">
                  {reason.title}
                </h3>
                
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
              
              {/* Bottom decorative accent line */}
              <div className="w-8 h-1.5 bg-amber-400 rounded-full mt-6 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Live counter statistics banner */}
        <div className="mt-16 bg-emerald-950 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-xl shadow-emerald-950/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12)_0,transparent_55%)] pointer-events-none" />
          
          <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center items-center divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/60">
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-400">10,000+</div>
              <div className="text-xs text-emerald-300 mt-2 font-mono uppercase tracking-wider">Jamaah & Siswa Wisata</div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-400">20+ Unit</div>
              <div className="text-xs text-emerald-300 mt-2 font-mono uppercase tracking-wider">Armada Bus & Mobil Sendiri</div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs text-emerald-300 mt-2 font-mono uppercase tracking-wider">Tingkat Izin Terverifikasi</div>
            </div>
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-400">24/7</div>
              <div className="text-xs text-emerald-300 mt-2 font-mono uppercase tracking-wider">Layanan Bantuan Reservasi</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
