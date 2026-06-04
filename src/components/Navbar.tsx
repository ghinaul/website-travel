/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bus, Menu, X, LayoutDashboard, UserCheck, Shield } from 'lucide-react';
import DarunnajahLogo from './DarunnajahLogo';

interface NavbarProps {
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
  onNavigateToBooking: () => void;
  onNavigateToCatalogTab?: (tabId: 'all' | 'packages' | 'rentcar' | 'docs') => void;
}

export default function Navbar({ isAdminView, setIsAdminView, onNavigateToBooking, onNavigateToCatalogTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string, tabId?: 'all' | 'packages' | 'rentcar' | 'docs') => {
    setIsAdminView(false);
    setIsOpen(false);
    
    if (tabId && onNavigateToCatalogTab) {
      onNavigateToCatalogTab(tabId);
    } else {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-950/90 backdrop-blur-xl border-b border-emerald-900 text-white shadow-[0_4px_30px_rgba(4,47,26,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <DarunnajahLogo variant="dark" size="sm" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection('hero')}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              id="nav-btn-home"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'packages')}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              id="nav-btn-packages"
            >
              Paket Wisata & Umroh
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'rentcar')}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              id="nav-btn-rentcar"
            >
              Sewa Bus
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'docs')}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              id="nav-btn-docs"
            >
              Layanan Visa & ITAS
            </button>
            <button
              onClick={() => scrollToSection('testimonials-gallery')}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              id="nav-btn-testimonials"
            >
              Testimoni & Galeri
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-2 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
              id="nav-btn-faq"
            >
              FAQ & Kontak
            </button>
            <button
              onClick={onNavigateToBooking}
              className="mx-1 px-3 py-1.5 bg-amber-500 text-emerald-950 font-bold rounded-lg text-[11px] hover:bg-amber-400 hover:scale-105 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
              id="nav-btn-pesan"
            >
              Sistem Pemesanan
            </button>
          </div>

          {/* Admin Switcher Desk */}
          <div className="hidden lg:flex items-center border-l border-emerald-800 pl-4">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                isAdminView
                  ? 'bg-emerald-600 border border-emerald-400 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-900/40 border border-emerald-800 text-emerald-300 hover:bg-emerald-900/80 hover:text-white'
              }`}
              id="nav-btn-admin-desktop"
            >
              <LayoutDashboard className="h-4 w-4" />
              {isAdminView ? 'Mode: Pegawai' : 'Portal Pegawai'}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`p-2 rounded-lg ${
                isAdminView ? 'bg-emerald-700 text-white' : 'bg-emerald-900/50 text-emerald-300'
              }`}
              title="Portal Pegawai"
              id="nav-btn-admin-mobile-icon"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50 focus:outline-none transition-colors"
              id="nav-btn-hamburger"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-emerald-950 border-b border-emerald-800 shadow-xl transition-all duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1.5 sm:px-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-emerald-900/50"
              id="mob-nav-btn-home"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'packages')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-300 hover:text-white hover:bg-emerald-900/50"
              id="mob-nav-btn-packages"
            >
              Paket Wisata & Umroh
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'rentcar')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-300 hover:text-white hover:bg-emerald-900/50"
              id="mob-nav-btn-rentcar"
            >
              Sewa Bus Pariwisata
            </button>
            <button
              onClick={() => scrollToSection('catalog', 'docs')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-300 hover:text-white hover:bg-emerald-900/50"
              id="mob-nav-btn-docs"
            >
              Layanan Visa & ITAS
            </button>
            <button
              onClick={() => scrollToSection('testimonials-gallery')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-300 hover:text-white hover:bg-emerald-900/50"
              id="mob-nav-btn-testimonials"
            >
              Testimoni & Galeri Dokumentasi
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-300 hover:text-white hover:bg-emerald-900/50"
              id="mob-nav-btn-faq"
            >
              FAQ & Kontak
            </button>
            <button
              onClick={() => {
                onNavigateToBooking();
                setIsOpen(false);
              }}
              className="block w-full text-center px-4 py-2.5 bg-amber-500 text-emerald-950 text-sm font-bold rounded-md hover:bg-amber-400 mt-2"
              id="mob-nav-btn-pesan"
            >
              Sistem Pemesanan
            </button>

            <div className="border-t border-emerald-800 pt-3 mt-3">
              <button
                onClick={() => {
                  setIsAdminView(!isAdminView);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors ${
                  isAdminView
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-900 text-emerald-300'
                }`}
                id="mob-nav-btn-admin-toggle"
              >
                <LayoutDashboard className="h-4 w-4" />
                {isAdminView ? 'Kembali Ke Landing Page' : 'Masuk Portal Pegawai'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
