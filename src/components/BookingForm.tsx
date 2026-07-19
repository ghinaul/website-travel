import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface ServiceItem {
  id: number;
  service_name: string;
  category: string;
  price: number;
}

interface BookingFormProps {
  preselectedService?: {
    type: 'package' | 'rentcar' | 'visa_itas';
    id: string;
    name: string;
  } | null;
  onClearPreselected?: () => void;
  onBookingSuccess?: () => void;
}

export default function BookingForm({ preselectedService, onClearPreselected, onBookingSuccess }: BookingFormProps) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceType, setServiceType] = useState<'package' | 'rentcar'>('package');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [multiplier, setMultiplier] = useState<number>(1);
  const [bookingDate, setBookingDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sinkronisasi ketika user klik tombol "Sewa Unit Ini" atau "Booking Sekarang" di luar
  useEffect(() => {
    if (preselectedService) {
      // Jika tipenya visa_itas atau package, masukkan ke tab 'package'
      const type = preselectedService.type === 'rentcar' ? 'rentcar' : 'package';
      setServiceType(type);
      setSelectedItemId(preselectedService.id);
    }
  }, [preselectedService]);

  // Ambil data layanan dari API Laravel backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const currentSubItem = services.find(item => item.id === Number(selectedItemId));

  const itemType = currentSubItem?.category === 'fixed-date' || 
                   currentSubItem?.service_name.toLowerCase().includes('umroh') || 
                   currentSubItem?.service_name.toLowerCase().includes('barokah') ? 'fixed-date' : 'reguler';

 // Memastikan Sewa Bus/Armada dan Paket Tour terpisah secara akurat
  const activeSubItems = services.filter(item => {
    const nameLower = item.service_name.toLowerCase();
    
    // 1. Cek apakah item mengandung kata visa atau itas
    const isVisaItas = nameLower.includes('visa') || nameLower.includes('itas');
    
    // 2. Cek apakah item ini termasuk kendaraan/sewa mobil
    const isRentCar = item.category === 'rentcar' || 
                      nameLower.includes('bus') || 
                      nameLower.includes('hiace') || 
                      nameLower.includes('sewa');

    // Jika user sedang aktif mengklik tab Visa & ITAS
    if (selectedItemId === 'visa_itas') {
      return isVisaItas;
    }
    
    // Jika user berada di tab Sewa Kendaraan
    if (serviceType === 'rentcar') {
      return isRentCar && !isVisaItas;
    }
    
    // Jika user berada di tab Paket Tour biasa (Umroh & Wisata Halal)
    return !isRentCar && !isVisaItas;
  });

  const calculateTotal = () => {
    if (!currentSubItem) return 0;
    return serviceType === 'rentcar' ? currentSubItem.price * multiplier : currentSubItem.price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      service_id: Number(selectedItemId),
      customer_name: customerName,
      whatsapp_number: whatsappNumber,
      email: email,
      booking_date: itemType === 'fixed-date' ? null : bookingDate,
      multiplier: serviceType === 'rentcar' ? multiplier : 1,
      special_notes: specialNotes,
      total_price: calculateTotal()
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        if (onBookingSuccess) onBookingSuccess();
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCustomerName('');
    setWhatsappNumber('');
    setEmail('');
    setBookingDate('');
    setSpecialNotes('');
    setMultiplier(1);
    setSelectedItemId('');
    if (onClearPreselected) onClearPreselected();
  };

  return (
    <div id="booking-section" className="w-full max-w-4xl mx-auto my-12 bg-emerald-900/10 border border-emerald-800/50 rounded-3xl p-1 shadow-2xl backdrop-blur-sm block clear-both">
      <div className="bg-emerald-900/20 rounded-[22px] p-6 md:p-8">
        <h3 className="text-xl font-bold text-center text-white mb-6 font-mono uppercase tracking-wider">Formulir Sistem Pemesanan Online</h3>
        
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* TABS LAYANAN */}
            {/* TABS LAYANAN */}
            <div className="grid grid-cols-3 bg-emerald-950/60 p-1.5 rounded-2xl border border-emerald-900">
              <button
                type="button"
                onClick={() => { setServiceType('package'); setSelectedItemId(''); }}
                className={`py-3.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  serviceType === 'package' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-emerald-400 hover:text-emerald-200'
                }`}
              >
                Paket Tour & Travel
              </button>

              <button
                type="button"
                onClick={() => { setServiceType('rentcar'); setSelectedItemId(''); }}
                className={`py-3.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  serviceType === 'rentcar' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-emerald-400 hover:text-emerald-200'
                }`}
              >
                Sewa Bus & Armada
              </button>

            <button
                type="button"
                onClick={() => { setServiceType('package'); setSelectedItemId('visa_itas'); }}
                className={`py-3.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  selectedItemId === 'visa_itas' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-emerald-400 hover:text-emerald-200'
                }`}
              >
                Visa & ITAS
              </button>
            </div>

            {/* SELECTION DROPDOWN */}
            <div>
              <label className="block text-xs text-emerald-300 font-bold mb-1">
                {serviceType === 'package' && selectedItemId !== 'visa_itas' && 'Pilih Paket Destinasi / Umroh / Wisata'}
                {serviceType === 'rentcar' && 'Pilih Unit Bus / Mobil / Armada'}
                {selectedItemId === 'visa_itas' && 'Pilih Jenis Layanan Dokumen'}
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                required
                className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3.5 border border-emerald-800 focus:outline-none text-sm text-left block"
              >
                <option value="">-- Silahkan Pilih --</option>
                {activeSubItems.map((item) => (
                  <option key={item.id} value={item.id} className="bg-emerald-950 text-white">
                    {item.service_name} - Rp {item.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
            </div>

            {/* GRID DATA DIRI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-emerald-300 font-bold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-xs text-emerald-300 font-bold mb-1">No. WhatsApp (Aktif)</label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  required
                  className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              <div>
                <label className="block text-xs text-emerald-300 font-bold mb-1">Alamat Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm"
                  placeholder="nama@email.com"
                />
              </div>

              {/* TIMING & DURATION CONDITIONS */}
                <div>
                  <label className="block text-xs text-emerald-300 font-bold mb-1">Tanggal Keberangkatan</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required={itemType !== 'fixed-date'}
                    disabled={itemType === 'fixed-date'}
                    className={`w-full text-white rounded-xl px-4 py-3 border text-sm ${
                      itemType === 'fixed-date'
                        ? 'bg-emerald-900/30 border-emerald-950 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-950 border-emerald-800'
                    }`}
                  />
                  {itemType === 'fixed-date' && (
                    <p className="text-[10px] text-amber-400 mt-1">
                      * Tanggal otomatis mengikuti jadwal resmi paket tour/umroh ini.
                    </p>
                  )}
                </div>
            </div>

            {/* CATATAN TAMBAHAN */}
            <div>
              <label className="block text-xs text-emerald-300 font-bold mb-1">Catatan Tambahan</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm"
                placeholder="Contoh: Request bangku depan, dll."
              />
            </div>

            {/* ESTIMASI HARGA */}
            {currentSubItem && (
              <div className="bg-emerald-950/80 p-4 rounded-xl flex justify-between items-center border border-emerald-800">
                <div>
                  <span className="text-xs text-emerald-400 block font-medium">Estimasi Total Harga</span>
                  <span className="text-xl font-bold text-amber-400">
                    Rp {calculateTotal().toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            )}

            {/* BUTTON SUBMIT */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pemesanan'}
              </button>
            </div>

          </form>
) : (
          /* SUCCESS SCREEN */
          <div className="bg-emerald-950/90 border border-emerald-800 text-white rounded-2xl p-8 text-center flex flex-col items-center justify-center shadow-xl">
            <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-emerald-50">Pemesanan Berhasil!</h3>
            <p className="text-emerald-300 mb-6">Tim Darunnajah akan menghubungi Anda segera.</p>
            <button
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl px-6 py-2.5 text-sm transition-colors shadow-md"
            >
              Buat Pemesanan Baru
            </button>
          </div>
        )}

      </div>
    </div>
  );
}