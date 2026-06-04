/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Compass, History, Target, Bus } from 'lucide-react';
import { HISTORY_INFO, VISION_MISSION } from '../data';

export default function SejarahVisiMisi() {
  const [activeTab, setActiveTab] = useState<'sejarah' | 'visimisi'>('sejarah');

  return (
    <section id="sejarah" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Switcher on Top */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100/80 border border-slate-200/60 p-1.5 rounded-2xl inline-flex shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => setActiveTab('sejarah')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all uppercase cursor-pointer ${
                activeTab === 'sejarah'
                  ? 'bg-emerald-950 text-white shadow-lg shadow-emerald-950/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-white/70'
              }`}
              id="tab-sejarah-trigger"
            >
              <History className="h-4.5 w-4.5" />
              Sejarah Perusahaan
            </button>
            <button
              onClick={() => setActiveTab('visimisi')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs md:text-sm font-bold tracking-wide transition-all uppercase cursor-pointer ${
                activeTab === 'visimisi'
                  ? 'bg-emerald-950 text-white shadow-lg shadow-emerald-950/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-emerald-950 hover:bg-white/70'
              }`}
              id="tab-visimisi-trigger"
            >
              <Target className="h-4.5 w-4.5" />
              Visi & Misi Kami
            </button>
          </div>
        </div>

        {/* Content Render with beautiful layouts */}
        {activeTab === 'sejarah' ? (
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left side timeline graphic */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl -rotate-1 rounded-2xl" />
              <div className="relative p-8 bg-emerald-950 rounded-3xl text-white shadow-xl">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Award className="h-32 w-32" />
                </div>
                
                <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Sertifikat & Legalitas Resmi
                </h3>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-emerald-500 pl-4 py-1">
                    <div className="text-sm font-mono text-emerald-300">TAHUN 2000</div>
                    <div className="text-sm font-bold text-white mt-1">Pendirian Travel Haji & Umrah</div>
                    <p className="text-xs text-emerald-100/80 mt-1">Resmi mengantongi SK IZIN PPIU No. 02201051212440004 mandiri dari Kemenag RI.</p>
                  </div>
                  
                  <div className="border-l-2 border-amber-400 pl-4 py-1">
                    <div className="text-sm font-mono text-amber-300">TAHUN 2012</div>
                    <div className="text-sm font-bold text-white mt-1">Ekspansi PO Bus Pariwisata</div>
                    <p className="text-xs text-emerald-100/80 mt-1">Mendirikan PT DARUNNAJAH ZAHRA UTAMA divisi Oto Bus untuk memenuhi sarana angkutan darat yang modern.</p>
                  </div>

                  <div className="border-l-2 border-emerald-400 pl-4 py-1">
                    <div className="text-sm font-mono text-emerald-300">TAHUN 2026 - SEKARANG</div>
                    <div className="text-sm font-bold text-white mt-1">Layanan Terintegrasi & Digital</div>
                    <p className="text-xs text-emerald-100/80 mt-1">Sistem reservasi terpusat di Ulujami, Jakarta Selatan melayani paket wisata domestik, internasional, sewa bus, dan Visa/ITAS.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side narrative paragraph */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-full">Sejak Tahun 2000</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-4 mb-6 leading-tight">
                {HISTORY_INFO.title}
              </h2>
              
              <div className="space-y-4 text-emerald-900/90 text-sm md:text-base leading-relaxed">
                {HISTORY_INFO.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="indent-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left side - Big Vision representation */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <Compass className="h-64 w-64 text-white" />
              </div>

              <div>
                <div className="p-3 bg-emerald-800/80 rounded-2xl w-fit mb-8 border border-emerald-600/30">
                  <Compass className="h-6 w-6 text-amber-400" />
                </div>
                <span className="text-xs text-amber-300 uppercase font-mono tracking-widest font-bold">Visi Korporat</span>
                <h3 className="text-2xl lg:text-3xl font-bold mt-4 leading-tight">
                  "{VISION_MISSION.vision}"
                </h3>
              </div>

              <div className="mt-12 text-xs text-emerald-300 font-mono">
                PT DARUNNAJAH ZAHRA UTAMA • KONSISTEN & AMANAH
              </div>
            </div>

            {/* Right side - 5 Missions listed gracefully with checkpoints */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-full w-fit">Misi Kerja</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-4 mb-8">
                Langkah Strategis Pencapaian Kami
              </h2>

              <div className="space-y-5">
                {VISION_MISSION.missions.map((mission, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 p-4 rounded-2xl border border-emerald-50/50 hover:bg-emerald-50/40 hover:border-emerald-100 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-emerald-950 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-emerald-900/10">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-emerald-950">Misi 0{index + 1}</h4>
                      <p className="text-emerald-800 text-xs md:text-sm mt-1 leading-relaxed">{mission}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}
