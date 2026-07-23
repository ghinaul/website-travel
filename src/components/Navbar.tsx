import React from 'react';
import { LayoutDashboard, Menu, X } from 'lucide-react';

interface NavbarProps {
  isAdminView: boolean;
  setIsAdminView: (value: boolean) => void;
  onNavigateToBooking: () => void;
  onNavigateToCatalogTab: (tab: any) => void;
}

export default function Navbar({
  isAdminView,
  setIsAdminView,
  onNavigateToBooking,
  onNavigateToCatalogTab,
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-emerald-950 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsAdminView(true)}>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-wider text-emerald-50">Darunnajah</span>
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">Tours & Travel</span>
            </div>
          </div>

          {/* Desktop Menu */}
        <span onClick={() => { setIsAdminView(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer text-sm font-medium text-emerald-100 hover:text-white transition-colors">Beranda</span>
        <span onClick={() => { setIsAdminView(false); onNavigateToCatalogTab('paket'); }} className="cursor-pointer text-sm font-medium text-emerald-100 hover:text-white transition">Paket Wisata & Umroh</span>
        <span onClick={() => { setIsAdminView(false); onNavigateToCatalogTab('bus'); }} className="cursor-pointer text-sm font-medium text-emerald-100 hover:text-white transition">Sewa Bus</span>
        <span onClick={() => { setIsAdminView(false); onNavigateToCatalogTab('visa'); }} className="cursor-pointer text-sm font-medium text-emerald-100 hover:text-white transition">Layanan Visa & ITAS</span>
        <span onClick={() => { setIsAdminView(false); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer text-sm font-medium text-emerald-100 hover:text-white transition-colors">Testimoni & Galeri</span>
        <span onClick={() => { setIsAdminView(false); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); }} className="cursor-pointer text-sm font-medium text-emerald-100 hover:text-white transition">FAQ & Kontak</span>

        <button 
          onClick={onNavigateToBooking} 
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded-lg transition shadow-md"
        >
          Sistem Pemesanan
        </button>

            {/* Admin Switcher Desk */}
            <div className={`items-center border-l border-emerald-800 pl-4 ${!isAdminView ? 'hidden' : 'flex'}`}>
              <button
                onClick={() => setIsAdminView(!isAdminView)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 bg-emerald-600 border border-emerald-400 text-white shadow-md shadow-emerald-500/20"
                id="nav-btn-admin-desktop"
              >
                <LayoutDashboard className="h-4 w-4" />
                Kembali Ke Landing Page
              </button>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`p-2 rounded-lg transition-all duration-200 ${!isAdminView ? 'hidden' : 'bg-emerald-700 text-white'}`}
              title="Kembali Ke Landing Page"
              id="nav-btn-admin-mobile-icon"
            >
              <LayoutDashboard className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 focus:outline-none transition-colors"
              id="nav-btn-hamburger"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
          </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-emerald-900 border-t border-emerald-800 shadow-inner">
          <span onClick={() => { setIsAdminView(false); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block px-4 py-3 rounded-lg text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer">Beranda</span>
          <span onClick={() => { setIsAdminView(false); onNavigateToCatalogTab('wisata'); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer">Paket Wisata & Umroh</span>
          <span onClick={() => { setIsAdminView(false); onNavigateToCatalogTab('armada'); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer">Sewa Bus</span>
          <span onClick={() => { setIsAdminView(false); onNavigateToCatalogTab('dokumen'); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer">Layanan Visa & ITAS</span>
         <span onClick={() => { setIsAdminView(false); setIsOpen(false); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} className="block px-4 py-3 rounded-lg text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer">Testimoni & Galeri</span>
          <span onClick={() => { setIsAdminView(false); setIsOpen(false); }} className="block px-4 py-3 rounded-lg text-base font-medium text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer">FAQ & Kontak</span>

          <div className="pt-4 px-4 border-t border-emerald-800 space-y-3">
            <button onClick={() => { onNavigateToBooking(); setIsOpen(false); }} className="w-full bg-amber-500 hover:bg-amber-600 text-emerald-950 px-4 py-3 rounded-lg text-base font-bold shadow-md transition-colors">
              Sistem Pemesanan
            </button>

            <button
              onClick={() => { setIsAdminView(!isAdminView); setIsOpen(false); }}
              className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-base font-semibold border transition-all ${!isAdminView ? 'hidden' : 'bg-emerald-600 border-emerald-400 text-white'}`}
              id="mob-nav-btn-admin-toggle"
            >
              <LayoutDashboard className="h-4 w-4" />
              Kembali Ke Landing Page
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}