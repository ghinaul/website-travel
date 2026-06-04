/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import SejarahVisiMisi from './components/SejarahVisiMisi';
import Catalog from './components/Catalog';
import TestimonialsGallery from './components/TestimonialsGallery';
import BookingForm from './components/BookingForm';
import StaffDashboard from './components/StaffDashboard';
import FaqContact from './components/FaqContact';
import DarunnajahLogo from './components/DarunnajahLogo';
import { Bus, ArrowUp, Milestone, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function App() {
  // Navigation & admin view states
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'packages' | 'rentcar' | 'docs'>('all');
  const [preselectedService, setPreselectedService] = useState<{
    type: 'package' | 'rentcar' | 'visa_itas';
    id: string;
    name: string;
  } | null>(null);

  // Auto-fill form and scroll down smoothly on catalog selection
  const handleSelectItem = (type: 'package' | 'rentcar' | 'visa_itas', serviceId: string, serviceName: string) => {
    setIsAdminView(false);
    setPreselectedService({
      type,
      id: serviceId,
      name: serviceName
    });
    
    setTimeout(() => {
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Back to home and scroll to top
  const handleBackToHome = () => {
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll specifically to booking form from Hero
  const handleNavigateToBooking = () => {
    setIsAdminView(false);
    setTimeout(() => {
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Scroll to catalog from Hero with optional tab setting
  const handleExploreCatalog = (tabId?: 'all' | 'packages' | 'rentcar' | 'docs') => {
    setIsAdminView(false);
    if (tabId) {
      setActiveCatalogTab(tabId);
    }
    setTimeout(() => {
      const element = document.getElementById('catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-900 selection:text-white">
      
      {/* Sticky beautiful header Navbar */}
      <Navbar 
        isAdminView={isAdminView} 
        setIsAdminView={setIsAdminView} 
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToCatalogTab={handleExploreCatalog}
      />

      {/* Primary view content render */}
      {isAdminView ? (
        /* portal view for darunnajah office clerks */
        <div>
          <StaffDashboard />
        </div>
      ) : (
        /* premium customer facing presentation views */
        <div>
          {/* Main Hero view with Ulujami contextual information */}
          <Hero 
            onNavigateToBooking={handleNavigateToBooking} 
            onExploreCatalog={handleExploreCatalog} 
          />

          {/* Elegant company history and vision/missions */}
          <SejarahVisiMisi />

          {/* Why choose us trust factors */}
          <WhyUs />

          {/* Core catalog with filterable listings (Tourism packages / Bus charters / Docs assistant) */}
          <Catalog 
            onSelectItem={handleSelectItem} 
            activeTab={activeCatalogTab}
            setActiveTab={setActiveCatalogTab}
          />

          {/* Testimonial and previous trip gallery documentation */}
          <TestimonialsGallery />

          {/* Live system booking step-form */}
          <BookingForm 
            preselectedService={preselectedService} 
            onClearPreselected={() => setPreselectedService(null)}
            onBookingSuccess={() => {}}
          />

          {/* Collapsible FAQs and embedded Map */}
          <FaqContact />
        </div>
      )}

      {/* Professional Footer */}
      <footer className="bg-emerald-955 bg-[#052e16] text-[#ecfdf5] border-t border-emerald-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand & legal description */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <div className="flex items-center">
              <DarunnajahLogo variant="dark" />
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Penyedia jasa pariwisata profesional, oto bus pariwisata eksekutif, dan pengurusan administrasi dokumen Visa & ITAS terintegrasi di Ulujami, Jakarta Selatan. Melayani dengan integritas, konsistensi, dan amanah sejak tahun 2000.
            </p>
            <div className="text-[11px] font-mono text-amber-400 bg-emerald-950/80 border border-emerald-800 p-2.5 rounded-lg w-fit">
              SK IZIN PPIU No. 02201051212440004
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider font-mono">Tautan Pintas</h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li>
                <button onClick={handleBackToHome} className="hover:text-white hover:underline transition-colors block text-left">
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => { setIsAdminView(false); setTimeout(() => document.getElementById('sejarah')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white hover:underline transition-colors block text-left">
                  Sejarah PT Darunnajah
                </button>
              </li>
              <li>
                <button onClick={() => { setIsAdminView(false); setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white hover:underline transition-colors block text-left">
                  Katalog Unit & Paket
                </button>
              </li>
              <li>
                <button onClick={() => { setIsAdminView(false); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white hover:underline transition-colors block text-left">
                  FAQ & Syarat Order
                </button>
              </li>
            </ul>
          </div>

          {/* Legal references / licenses column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider font-mono">Kantor Pelayanan Ulujami</h4>
            
            <div className="space-y-2.5 text-xs text-emerald-200">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Jl. Ulujami Raya No. 86 RT.01 / RW.01, Kel. Ulujami, Kec. Pesanggrahan, Jakarta Selatan, DKI Jakarta 12250
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+62 812-2222-2222</span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>info@darunnajah-travel.co.id</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Legal copyright footer base */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[10px] text-emerald-300 font-mono">
            &copy; 2000 - 2026 PT Darunnajah Zahra Utama. All Rights Reserved. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-amber-400 font-bold uppercase tracking-wider bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Kemenag RI PPIU Verified</span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
