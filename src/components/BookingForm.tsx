/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface ServiceItem {
  id: number;
  service_name: string;
  category: 'package' | 'rentcar';
  price: number;
  description: string;
}

interface BookingFormProps {
  preselectedService?: {
    type: 'package' | 'rentcar';
    id: number;
    name: string;
  } | null;
  onClearPreselected: () => void;
  onBookingSuccess: () => void;
}

export default function BookingForm({ 
  preselectedService, 
  onClearPreselected, 
  onBookingSuccess 
}: BookingFormProps) {
  // --- State ---
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceType, setServiceType] = useState<'package' | 'rentcar'>('package');
  const [selectedItemId, setSelectedItemId] = useState<number | ''>('');
  
  // Data Diri
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

// --- 1. Fetch Data dari Backend Laravel ---
useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/services');
        if (response.ok) {
          const data: ServiceItem[] = await response.json();
          setServices(data);

          if (preselectedService) {
            setServiceType(preselectedService.type);
            setSelectedItemId(preselectedService.id);
          } else {
            const filtered = data.filter(item => item.category === serviceType);
            if (filtered.length > 0) {
              setSelectedItemId(filtered[0].id);
            } else if (data.length > 0) {
              setSelectedItemId(data[0].id);
            }
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data layanan:", error);
        setValidationError("Gagal memuat data layanan dari server. Pastikan Backend menyala.");
      }
    };

    fetchServices();
  }, []);

  const handleServiceTypeChange = (type: 'package' | 'rentcar') => {
    onClearPreselected();
    setServiceType(type);
    setMultiplier(1);
    setValidationError('');
  };

  // Filter layanan yang tampil di dropdown sesuai Tab kategori aktif
  const activeSubItems = services.filter(item => item.category === serviceType);
  const currentSubItem = services.find(item => item.id === Number(selectedItemId));
  
  const calculateTotal = () => {
    return currentSubItem ? currentSubItem.price * multiplier : 0;
  };

  // --- 3. Submit Handler: KIRIM KE LARAVEL API ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setIsSubmitting(true);

    // Validasi Dasar
    if (!customerName.trim()) {
      setValidationError('Mohon masukkan nama lengkap Anda.');
      setIsSubmitting(false);
      return;
    }
    if (!whatsappNumber.trim()) {
      setValidationError('Mohon masukkan nomor WhatsApp aktif Anda.');
      setIsSubmitting(false);
      return;
    }
    if (!email.trim()) {
      setValidationError('Mohon masukkan alamat email Anda.');
      setIsSubmitting(false);
      return;
    }
    if (!bookingDate) {
      setValidationError('Mohon pilih tanggal keberangkatan.');
      setIsSubmitting(false);
      return;
    }
    if (!selectedItemId) {
      setValidationError('Mohon pilih layanan terlebih dahulu.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/booking/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          customer_name: customerName,
          email: email,
          whatsapp_number: whatsappNumber,
          booking_date: bookingDate,
          service_id: Number(selectedItemId), // Dikirim sebagai service_id
          participants: multiplier,
          notes: specialNotes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        if (onBookingSuccess) onBookingSuccess();
      } else {
        setValidationError(data.message || 'Gagal menyimpan pesanan.');
      }
    } catch (error) {
      console.error("Error:", error);
      setValidationError('Gagal terhubung ke server. Pastikan backend Laravel aktif.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const nomorAdmin = "6281285567034"; 

    const textMessage = `Halo Admin Darunnajah Tours & Travel, saya ingin mengonfirmasi pemesanan yang baru saja saya buat di website:

*Nama Pemesan:* ${customerName}
*Email:* ${email}
*No. WhatsApp:* ${whatsappNumber}
*Layanan:* ${currentSubItem?.service_name || '-'}
*Tanggal Booking:* ${bookingDate}
*Jumlah Peserta/Durasi:* ${multiplier}

Mohon untuk diproses lebih lanjut. Terima kasih!`;

    return `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(textMessage)}`;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCustomerName('');
    setWhatsappNumber('');
    setEmail('');
    setBookingDate('');
    setMultiplier(1);
    setSpecialNotes('');
    onClearPreselected();
    setServiceType('package');
  };

  return (
    <div id="booking-section" className="py-20 bg-emerald-950 text-white relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15)_0,transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-emerald-900 border border-emerald-800 px-3 py-1.5 rounded-full inline-block mb-3">
            Sistem Booking Terpadu
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Formulir Reservasi Digital
          </h2>
        </div>

        {!isSubmitted ? (
          <div className="bg-emerald-900/40 border border-emerald-850/80 rounded-[32px] p-6 sm:p-12 backdrop-blur-xl shadow-2xl">
            {/* Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-10 bg-[#031d10]/90 p-1.5 rounded-2xl border border-emerald-900/80">
              <button type="button" onClick={() => handleServiceTypeChange('package')} className={`py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest ${serviceType === 'package' ? 'bg-amber-500 text-emerald-950' : 'text-emerald-300/80'}`}>
                Paket Wisata (Umroh)
              </button>
              <button type="button" onClick={() => handleServiceTypeChange('rentcar')} className={`py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest ${serviceType === 'rentcar' ? 'bg-amber-500 text-emerald-950' : 'text-emerald-300/80'}`}>
                Sewa Bus
              </button>
            </div>

            {validationError && (
              <div className="mb-6 p-4 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-sm">
                {validationError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pilih Layanan */}
              <div className="grid sm:grid-cols-2 gap-6 bg-emerald-950/40 p-5 rounded-2xl border border-emerald-800/60">
                <div>
                  <label className="block text-xs text-emerald-300 uppercase font-bold mb-2">Pilih Layanan</label>
                  <select 
                    value={selectedItemId} 
                    onChange={(e) => setSelectedItemId(Number(e.target.value))} 
                    className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800"
                  >
                    {activeSubItems.length === 0 ? (
                      <option value="">Memuat layanan...</option>
                    ) : (
                      activeSubItems.map(item => (
                        <option key={item.id} value={item.id}>{item.service_name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-emerald-300 uppercase font-bold mb-2">
                    {serviceType === 'package' ? 'Jumlah Peserta' : 'Durasi Sewa (Hari)'}
                  </label>
                  <div className="flex">
                    <button type="button" onClick={() => setMultiplier(m => Math.max(1, m - 1))} className="px-4 py-3 border border-emerald-800 font-bold bg-emerald-950">-</button>
                    <input type="number" min={1} value={multiplier} onChange={(e) => setMultiplier(Math.max(1, parseInt(e.target.value) || 1))} className="w-full text-center bg-emerald-950 border-y border-emerald-800" />
                    <button type="button" onClick={() => setMultiplier(m => m + 1)} className="px-4 py-3 border border-emerald-800 font-bold bg-emerald-950">+</button>
                  </div>
                </div>
              </div>

              {/* Data Diri */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase text-amber-400 border-b border-emerald-800 pb-2">Informasi Pemesan</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-emerald-300 mb-1">Nama Lengkap</label>
                    <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full bg-emerald-950 rounded-xl py-3 px-4 border border-emerald-800" />
                  </div>
                  <div>
                    <label className="block text-xs text-emerald-300 mb-1">No. WhatsApp</label>
                    <input type="tel" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="w-full bg-emerald-950 rounded-xl py-3 px-4 border border-emerald-800" />
                  </div>
                  <div>
                    <label className="block text-xs text-emerald-300 mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-emerald-950 rounded-xl py-3 px-4 border border-emerald-800" />
                  </div>
                  <div>
                    <label className="block text-xs text-emerald-300 mb-1">Tanggal Rencana Keberangkatan</label>
                    <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full bg-emerald-950 rounded-xl py-3 px-4 border border-emerald-800" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-emerald-300 mb-1">Catatan Tambahan</label>
                  <input type="text" value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} className="w-full bg-emerald-950 rounded-xl py-3 px-4 border border-emerald-800" />
                </div>
              </div>

              {/* Kalkulasi Harga */}
              {currentSubItem && (
                <div className="bg-emerald-950/80 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-xs text-emerald-400">Estimasi Total</span>
                  </div>
                  <div className="text-xl font-bold text-amber-400">
                    Rp {calculateTotal().toLocaleString('id-ID')}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pemesanan'}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="bg-white text-emerald-950 rounded-3xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Pemesanan Berhasil!</h3>
            <p className="text-emerald-800 mb-6">Tim Darunnajah akan menghubungi Anda segera.</p>
            
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="block w-full py-3 bg-[#25D366] text-white font-bold rounded-xl mb-3">
              Konfirmasi via WhatsApp
            </a>
            <button onClick={handleReset} className="text-emerald-600 text-sm underline">
              Buat Pemesanan Baru
            </button>
          </div>
        )}
      </div>
    </div>
  );
}