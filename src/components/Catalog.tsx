/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bus, Calendar, Landmark, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { DOMESTIC_PACKAGES, INTERNATIONAL_PACKAGES, BUS_FLEET, DOCUMENT_SERVICES } from '../data';
import { TravelPackage, BusFleet, DocumentService } from '../types';

interface CatalogProps {
  onSelectItem: (type: 'package' | 'rentcar' | 'visa_itas', serviceId: string, serviceName: string) => void;
  activeTab?: 'all' | 'packages' | 'rentcar' | 'docs';
  setActiveTab?: (tab: 'all' | 'packages' | 'rentcar' | 'docs') => void;
}

export default function Catalog({ onSelectItem, activeTab: propActiveTab, setActiveTab: propSetActiveTab }: CatalogProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<'all' | 'packages' | 'rentcar' | 'docs'>('all');

  const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setInternalActiveTab;

  // Format currency helpers
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="catalog" className="py-24 bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black text-emerald-700 tracking-wider uppercase bg-emerald-100/75 px-3.5 py-1.5 rounded-full">Katalog Layanan Resmi</span>
          <h2 className="text-3xl font-extrabold text-emerald-950 sm:text-5xl tracking-tight mt-4 leading-tight">
            Program Wisata & Armada
          </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Pilih paket ibadah/wisata impian, sewa armada bus pariwisata modern PO Darunnajah, atau lakukan kepengurusan Visa & ITAS Anda dengan bantuan tim legal profesional kami.
          </p>
        </div>

        {/* Filter Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-16">
          {[
            { id: 'all', label: 'Semua Layanan' },
            { id: 'packages', label: 'Paket Domestik & LN' },
            { id: 'rentcar', label: 'Sewa Bus & HiAce' },
            { id: 'docs', label: 'Visa & Jasa ITAS' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-950 text-white shadow-lg'
                  : 'bg-white text-slate-700 border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Display Grid */}
        <div className="space-y-16">
          
          {/* Section: Packages (Domestic & International) */}
          {(activeTab === 'all' || activeTab === 'packages') && (
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-emerald-200/60 pb-3">
                <div className="p-2 bg-emerald-950 rounded-xl text-amber-400">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950">Paket Wisata & Umroh</h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...DOMESTIC_PACKAGES, ...INTERNATIONAL_PACKAGES].map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100/90 shadow-[0_4px_30px_rgba(4,47,26,0.02)] hover:shadow-[0_12px_40px_rgba(4,47,26,0.08)] hover:border-emerald-500/10 transition-all duration-300 flex flex-col h-full group" id={`pkg-card-${pkg.id}`}>
                    {/* Cover image with category badge */}
                    <div className="relative h-56 overflow-hidden bg-emerald-950">
                    <a href={pkg.image} target="_blank" rel="noopener noreferrer" className="block cursor-pointer overflow-hidden">  
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      </a>
                      <div className="absolute top-4 left-4 bg-emerald-950/90 text-amber-400 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider border border-emerald-800 backdrop-blur-sm">
                        {pkg.category === 'domestic' ? 'Domestik' : 'Luar Negeri / Internasional'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-emerald-950/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md border border-emerald-800">
                        {pkg.duration}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-lg font-bold text-emerald-950 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                          {pkg.title}
                        </h4>
                        <p className="text-emerald-800/80 text-xs leading-relaxed mb-4 line-clamp-2">
                          {pkg.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-4">
                          <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-widest block mb-2">Destinasi Utama:</span>
                          <ul className="space-y-1.5">
                            {pkg.highlights.map((hlt, i) => (
                              <li key={i} className="text-xs text-emerald-800 flex items-center gap-2">
                                <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                                <span className="truncate">{hlt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Includes / Fasilitas */}
                      <div className="mb-4 pt-2 border-t border-dashed border-gray-100">
                        <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-widest block mb-2">Fasilitas Termasuk:</span>
                         <ul className="space-y-1.5">
                           {pkg.includes && pkg.includes.map((inc, i) => (
                            <li key={i} className="text-xs text-emerald-800 flex items-center gap-2">
                              <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                             <span className="truncate">{inc}</span>
                           </li>
                         ))}
                       </ul>
                      </div>
                      </div>

                      {/* Pricing & Booking Trigger */}
                      <div className="border-t border-emerald-50 pt-4 mt-6">
                        <div className="flex items-baseline justify-between mb-4">
                          <span className="text-xs text-emerald-700 font-semibold uppercase">Mulai Dari</span>
                          <span className="text-lg font-extrabold text-emerald-950">
                            {formatIDR(pkg.pricePerPax)}<span className="text-xs text-emerald-800/80 font-normal">/Pax</span>
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectItem('package', pkg.id, pkg.title)}
                          className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/10"
                        >
                          Booking Sekarang
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Rentcar & Bus Fleet */}
          {(activeTab === 'all' || activeTab === 'rentcar') && (
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-emerald-200/60 pb-3 mt-4">
                <div className="p-2 bg-emerald-950 rounded-xl text-amber-400">
                  <Bus className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950">Sewa Bus Pariwisata & Kendaraan Luxury</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BUS_FLEET.map((fleet) => (
                  <div key={fleet.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100/90 shadow-[0_4px_30px_rgba(4,47,26,0.02)] hover:shadow-[0_12px_40px_rgba(4,47,26,0.08)] hover:border-emerald-500/10 transition-all duration-300 flex flex-col h-full group" id={`fleet-card-${fleet.id}`}>
                    <div className="relative h-56 overflow-hidden bg-emerald-950">
                      <img
                        src={fleet.image}
                        alt={fleet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-emerald-950/90 text-amber-400 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider border border-emerald-800 backdrop-blur-sm">
                        {fleet.capacity} Kursi / Seats
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="text-lg font-bold text-emerald-950 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                          {fleet.name}
                        </h4>
                        <p className="text-emerald-800/80 text-xs leading-relaxed mb-4">
                          {fleet.description}
                        </p>

                        {/* Features checklist */}
                        <div className="mb-4">
                          <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-widest block mb-2">Fasilitas Cabin:</span>
                          <ul className="grid grid-cols-1 gap-1.5">
                            {fleet.features.slice(0, 4).map((feat, i) => (
                              <li key={i} className="text-xs text-emerald-800 flex items-center gap-1.5">
                                <Check className="h-3 w-3 text-amber-500 shrink-0" />
                                <span className="truncate">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pricing & Booking */}
                      <div className="border-t border-emerald-50 pt-4 mt-6">
                        <div className="flex items-baseline justify-between mb-4">
                          <span className="text-xs text-emerald-700 font-semibold uppercase">Mulai Dari</span>
                          <span className="text-lg font-extrabold text-emerald-950">
                            {formatIDR(fleet.pricePerDay)}<span className="text-xs text-emerald-800/80 font-normal">/Hari</span>
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectItem('rentcar', fleet.id, fleet.name)}
                          className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/10"
                        >
                          Sewa Unit Ini
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Document Services (Visa & ITAS) */}
          {(activeTab === 'all' || activeTab === 'docs') && (
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-emerald-200/60 pb-3 mt-4">
                <div className="p-2 bg-emerald-950 rounded-xl text-amber-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950">Layanan Dokumen Visa & ITAS</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {DOCUMENT_SERVICES.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-3xl p-8 border border-slate-100/90 shadow-[0_4px_30px_rgba(4,47,26,0.02)] hover:shadow-[0_12px_40px_rgba(4,47,26,0.08)] hover:border-emerald-500/10 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 group" id={`doc-card-${doc.id}`}>
                    <div className="flex-1">
                      <div className="inline-block bg-emerald-50 text-emerald-700 text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider mb-3 border border-emerald-100">
                        {doc.type === 'visa' ? 'Visa Internasional' : 'Izin Keimigrasian RI'}
                      </div>
                      
                      <h4 className="text-lg font-bold text-emerald-950 mb-2 group-hover:text-emerald-700 transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-emerald-800/80 text-xs leading-relaxed mb-4">
                        {doc.description}
                      </p>

                      <div className="text-xs text-emerald-900 font-semibold mb-2 font-mono">Estimasi Durasi: {doc.duration}</div>

                      <div>
                        <span className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-widest block mb-1.5">Syarat Utama:</span>
                        <ul className="space-y-1">
                          {doc.requirements.slice(0, 3).map((req, i) => (
                            <li key={i} className="text-xs text-emerald-800 flex items-center gap-1.5">
                              <Check className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="md:w-56 flex flex-col justify-between shrink-0 md:border-l border-emerald-50 md:pl-6 pt-4 md:pt-0">
                      <div>
                        <span className="text-[10px] text-emerald-700 uppercase block font-semibold mb-1">Estimasi Biaya Mulai</span>
                        <div className="text-xl font-black text-emerald-950 mb-1">
                          {formatIDR(doc.priceEstimation)}
                        </div>
                        <span className="text-[10px] text-emerald-600 font-serif block italic">Biaya final sesuai verifikasi berkas</span>
                      </div>

                      <button
                        onClick={() => onSelectItem('visa_itas', doc.id, doc.name)}
                        className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all mt-6 cursor-pointer"
                      >
                        Pesan Jasa
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
