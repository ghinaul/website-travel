/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Bus, Calendar, FileText, Users, DollarSign, Send, CheckCircle, ArrowLeft, Landmark, MessageSquare } from 'lucide-react';
import { DOMESTIC_PACKAGES, INTERNATIONAL_PACKAGES, BUS_FLEET, DOCUMENT_SERVICES } from '../data';
import { Booking } from '../types';

interface BookingFormProps {
  preselectedService?: {
    type: 'package' | 'rentcar' | 'visa_itas';
    id: string;
    name: string;
  } | null;
  onClearPreselected: () => void;
  onBookingSuccess: () => void;
}

export default function BookingForm({ preselectedService, onClearPreselected, onBookingSuccess }: BookingFormProps) {
  // Main fields
  const [serviceType, setServiceType] = useState<'package' | 'rentcar' | 'visa_itas'>('package');
  const [selectedItemId, setSelectedItemId] = useState('');
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [multiplier, setMultiplier] = useState(1); // can be passengers count or rental duration in days
  const [specialNotes, setSpecialNotes] = useState('');

  // Form submission feedback
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<Booking | null>(null);
  const [validationError, setValidationError] = useState('');

  // Set default values or preselected parameters
  useEffect(() => {
    if (preselectedService) {
      setServiceType(preselectedService.type);
      setSelectedItemId(preselectedService.id);
      // reset defaults
      setMultiplier(1);
    } else {
      // Set first item as default for current category
      updateDefaultItem(serviceType);
    }
  }, [preselectedService, serviceType]);

  const updateDefaultItem = (type: 'package' | 'rentcar' | 'visa_itas') => {
    if (type === 'package') {
      setSelectedItemId(DOMESTIC_PACKAGES[0].id);
    } else if (type === 'rentcar') {
      setSelectedItemId(BUS_FLEET[0].id);
    } else {
      setSelectedItemId(DOCUMENT_SERVICES[0].id);
    }
  };

  // List of available sub-items depending on active service category
  const getSubItems = () => {
    if (serviceType === 'package') {
      return [...DOMESTIC_PACKAGES, ...INTERNATIONAL_PACKAGES].map(p => ({
        id: p.id,
        name: `${p.title} (${p.duration})`,
        price: p.pricePerPax,
        multiplierLabel: 'Jumlah Peserta / Pax'
      }));
    } else if (serviceType === 'rentcar') {
      return BUS_FLEET.map(b => ({
        id: b.id,
        name: `${b.name} (${b.capacity} Kursi)`,
        price: b.pricePerDay,
        multiplierLabel: 'Durasi Sewa (Hari)'
      }));
    } else {
      return DOCUMENT_SERVICES.map(d => ({
        id: d.id,
        name: d.name,
        price: d.priceEstimation,
        multiplierLabel: 'Jumlah Pemohon'
      }));
    }
  };

  const activeSubItems = getSubItems();
  const currentSubItem = activeSubItems.find(item => item.id === selectedItemId) || activeSubItems[0];
  
  // Calculate pricing quote live
  const calculateTotal = () => {
    if (!currentSubItem) return 0;
    return currentSubItem.price * multiplier;
  };

  const handleServiceTypeChange = (type: 'package' | 'rentcar' | 'visa_itas') => {
    onClearPreselected();
    setServiceType(type);
    updateDefaultItem(type);
    setMultiplier(1);
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Field Validations
    if (!customerName.trim()) return setValidationError('Mohon masukkan nama lengkap Anda.');
    if (!customerPhone.trim()) return setValidationError('Mohon masukkan nomor WhatsApp aktif Anda.');
    if (!customerEmail.trim()) return setValidationError('Mohon masukkan alamat email Anda.');
    if (!bookingDate) return setValidationError('Mohon pilih tanggal keberangkatan / sewa.');
    if (multiplier < 1) return setValidationError('Jumlah minimal harus bernilai 1.');
    if (!selectedItemId) return setValidationError('Pilih paket atau jenis layanan terlebih dahulu.');

    // Create unique booking identification code
    const datePrefix = new Date().getFullYear().toString();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `DNJ-${datePrefix}-${randomSuffix}`;
    const totalAmount = calculateTotal();

    const newBooking: Booking = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      bookingCode,
      customerName,
      customerPhone,
      customerEmail,
      serviceType,
      serviceId: selectedItemId,
      serviceName: currentSubItem ? currentSubItem.name : 'Layan Darunnajah',
      bookingDate,
      passengersOrDuration: multiplier,
      totalPrice: totalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      notes: specialNotes,
      identityNumber
    };

    try {
      // Fetch current bookings list from local storage
      const existingStr = localStorage.getItem('darunnajah_bookings') || '[]';
      const existingBookings: Booking[] = JSON.parse(existingStr);
      existingBookings.unshift(newBooking);
      localStorage.setItem('darunnajah_bookings', JSON.stringify(existingBookings));

      // Show success screen
      setGeneratedBooking(newBooking);
      setIsSubmitted(true);
      onBookingSuccess();
    } catch (err) {
      console.error(err);
      setValidationError('Terjadi kesalahan sistem saat menyimpan pemesanan.');
    }
  };

  // Compose dynamic WhatsApp message content
  const getWhatsAppLink = () => {
    if (!generatedBooking) return '';
    const textMessage = `Halo Admin Darunnajah Tours & Travel, saya ingin konfirmasi pemesanan layanan berikut:

*KODE PEMESANAN:* ${generatedBooking.bookingCode}
*Nama Lengkap:* ${generatedBooking.customerName}
*No. WhatsApp:* ${generatedBooking.customerPhone}
*Layanan:* ${generatedBooking.serviceName}
*Tanggal:* ${generatedBooking.bookingDate}
*Kapasitas/Durasi:* ${generatedBooking.passengersOrDuration} ${serviceType === 'rentcar' ? 'Hari' : 'Orang'}
*Total Estimasi:* Rp ${generatedBooking.totalPrice.toLocaleString('id-ID')}
*Catatan khusus:* ${generatedBooking.notes || '-'}

Mohon bantuan Anda untuk langkah pembayaran dan konfirmasi armada. Terima kasih!`;

    return `https://wa.me/6281222222222?text=${encodeURIComponent(textMessage)}`;
  };

  // Reset form to place new booking
  const handleReset = () => {
    setIsSubmitted(false);
    setGeneratedBooking(null);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setIdentityNumber('');
    setBookingDate('');
    setMultiplier(1);
    setSpecialNotes('');
    onClearPreselected();
    updateDefaultItem('package');
  };

  return (
    <div id="booking-section" className="py-20 bg-emerald-950 text-white relative">
      {/* Visual background accents */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15)_0,transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Step-by-Step Title header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-emerald-900 border border-emerald-800 px-3 py-1.5 rounded-full inline-block mb-3">
            Sistem Booking Terpadu
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Formulir Reservasi Digital
          </h2>
          <p className="mt-2 text-emerald-200 text-xs md:text-sm max-w-lg mx-auto">
            Isi formulir pendaftaran di bawah ini. Selesai memesan, sistem akan otomatis mencatat data Anda dan menghubungkan Anda dengan petugas administrasi travel kami di Ulujami.
          </p>
        </div>

        {/* Dynamic Inner views */}
        {!isSubmitted ? (
          <div className="bg-emerald-900/40 border border-emerald-850/80 rounded-[32px] p-6 sm:p-12 backdrop-blur-xl shadow-2xl">
            {/* Category tabs selection */}
            <div className="grid grid-cols-3 gap-2 mb-10 bg-[#031d10]/90 p-1.5 rounded-2xl border border-emerald-900/80 shadow-inner">
              <button
                type="button"
                onClick={() => handleServiceTypeChange('package')}
                className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all tracking-widest cursor-pointer ${
                  serviceType === 'package' ? 'bg-amber-500 text-emerald-950 shadow-md scale-[1.01]' : 'text-emerald-300/80 hover:text-white hover:bg-emerald-850/40'
                }`}
              >
                Paket Wisata
              </button>
              <button
                type="button"
                onClick={() => handleServiceTypeChange('rentcar')}
                className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all tracking-widest cursor-pointer ${
                  serviceType === 'rentcar' ? 'bg-amber-500 text-emerald-950 shadow-md scale-[1.01]' : 'text-emerald-300/80 hover:text-white hover:bg-emerald-850/40'
                }`}
              >
                Sewa Bus/Mobil
              </button>
              <button
                type="button"
                onClick={() => handleServiceTypeChange('visa_itas')}
                className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-black uppercase transition-all tracking-widest cursor-pointer ${
                  serviceType === 'visa_itas' ? 'bg-amber-500 text-emerald-950 shadow-md scale-[1.01]' : 'text-emerald-300/80 hover:text-white hover:bg-emerald-850/40'
                }`}
              >
                Visa & ITAS
              </button>
            </div>

            {/* Validation errors alert banner */}
            {validationError && (
              <div className="mb-6 p-4 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-xs font-medium flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400 block shrink-0 animate-ping" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Part 1: Service choices */}
              <div className="grid sm:grid-cols-2 gap-6 bg-emerald-950/40 p-5 rounded-2xl border border-emerald-800/60">
                <div>
                  <label className="block text-[11px] text-emerald-300 uppercase font-black tracking-wider mb-2">
                    Layanan Yang Dipilih
                  </label>
                  <select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className="w-full bg-emerald-950 text-white text-sm rounded-xl px-4 py-3 border border-emerald-800 focus:outline-none focus:border-amber-500"
                  >
                    {activeSubItems.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-emerald-300 uppercase font-black tracking-wider mb-2">
                    {currentSubItem ? currentSubItem.multiplierLabel : 'Jumlah / Durasi'}
                  </label>
                  <div className="flex items-center bg-emerald-950 rounded-xl overflow-hidden border border-emerald-800">
                    <button
                      type="button"
                      onClick={() => setMultiplier(prev => Math.max(1, prev - 1))}
                      className="px-4 py-3 text-emerald-300 hover:text-white hover:bg-emerald-900 border-r border-emerald-800 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={multiplier}
                      onChange={(e) => setMultiplier(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full text-center bg-transparent focus:outline-none text-white text-sm font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setMultiplier(prev => prev + 1)}
                      className="px-4 py-3 text-emerald-300 hover:text-white hover:bg-emerald-900 border-l border-emerald-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Part 2: Customer Bio Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 border-b border-emerald-800 pb-2">Informasi Pemesan / Kontak</h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] text-emerald-300 uppercase font-bold mb-1.5">Nama Lengkap Sesuai KTP</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Ahmad Fauzi"
                      className="w-full bg-emerald-950 text-white text-sm rounded-xl py-3 px-4 border border-emerald-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-emerald-300 uppercase font-bold mb-1.5">Nomor WhatsApp Aktif</label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full bg-emerald-950 text-white text-sm rounded-xl py-3 px-4 border border-emerald-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] text-emerald-300 uppercase font-bold mb-1.5">Alamat Email Aktif</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Contoh: fauzi@email.com"
                      className="w-full bg-emerald-950 text-white text-sm rounded-xl py-3 px-4 border border-emerald-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-emerald-300 uppercase font-bold mb-1.5">No. Kartu Identitas (Optional)</label>
                    <input
                      type="text"
                      value={identityNumber}
                      onChange={(e) => setIdentityNumber(e.target.value)}
                      placeholder="KTP / No. Paspor (Optional)"
                      className="w-full bg-emerald-950 text-white text-sm rounded-xl py-3 px-4 border border-emerald-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] text-emerald-300 uppercase font-bold mb-1.5">Rencana Tanggal Perjalanan / Mulai Sewa</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-emerald-950 text-white text-sm rounded-xl py-3 px-4 border border-emerald-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-emerald-300 uppercase font-bold mb-1.5">Catatan Tambahan untuk Kru</label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Contoh: Membawa perlengkapan kursi roda, dsb."
                      className="w-full bg-emerald-950 text-white text-sm rounded-xl py-3 px-4 border border-emerald-800 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Quote Summary Banner */}
              {currentSubItem && (
                <div className="bg-emerald-950/80 p-6 rounded-2xl border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider block">Kalkulasi Tarif Transparan</span>
                    <div className="text-xs text-emerald-200 mt-1">
                      {currentSubItem.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })} x {multiplier} {serviceType === 'rentcar' ? 'Hari' : 'Orang'}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider block">Total Estimasi Estimasi</span>
                    <div className="text-2xl font-black text-amber-400">
                      {calculateTotal().toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer text-sm"
                  id="submit-booking-form"
                >
                  <Send className="h-4 w-4" />
                  Kirim Pengajuan Booking Online
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Step 3: Success Screen (Invoice & WhatsApp confirmation) */
          <div className="bg-white text-emerald-950 rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-100 max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-700" />
            </div>

            <h3 className="text-2xl font-extrabold text-emerald-950 mb-2">Pengajuan Berhasil Dikirim!</h3>
            <p className="text-emerald-800 text-xs md:text-sm mb-6">
              Data Anda telah tercatat secara resmi di database travel PT Darunnajah Zahra Utama Ulujami. Berikut adalah ringkasan invoice digital Anda:
            </p>

            {/* Simulated Digital Invoice sheet */}
            <div className="bg-emerald-50 rounded-2xl p-6 text-left border border-emerald-100 font-mono text-xs text-emerald-900 mb-8 space-y-3">
              <div className="flex justify-between border-b border-emerald-200/60 pb-3 font-bold text-[13px]">
                <span>DARUNNAJAH TRAV OFFICE</span>
                <span className="text-emerald-700">INVOICE</span>
              </div>
              <div className="flex justify-between">
                <span>Kode Booking:</span>
                <span className="font-bold text-emerald-950">{generatedBooking?.bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span>Nama Pemesan:</span>
                <span className="font-bold text-emerald-950">{generatedBooking?.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Kontak:</span>
                <span className="font-bold">{generatedBooking?.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span>Layanan:</span>
                <span className="font-bold text-emerald-950 truncate max-w-[200px]">{generatedBooking?.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span>Rencana Tanggal:</span>
                <span className="font-bold">{generatedBooking?.bookingDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Kuantitas:</span>
                <span className="font-bold">{generatedBooking?.passengersOrDuration} {serviceType === 'rentcar' ? 'Hari' : 'Paket'}</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200/60 pt-3 text-sm font-black">
                <span>TOTAL TAGIHAN:</span>
                <span className="text-emerald-800">Rp {generatedBooking?.totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="text-[10px] text-center text-emerald-700 mt-4 italic font-sans block pt-2 border-t border-dashed border-emerald-200">
                Hubungi Admin kami via WA di bawah untuk verifikasi pembayaran dan detail armada.
              </div>
            </div>

            {/* Actions for client checkout */}
            <div className="space-y-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all text-xs cursor-pointer"
                id="invoice-wa-confirm"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Konfirmasi Pembayaran via WhatsApp
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Buat Pemesanan Baru
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
