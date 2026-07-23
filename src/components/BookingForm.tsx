import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

interface ServiceItem {
  id: number;
  service_name: string;
  category: string;
  price: number;
  departure_date?: string;
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

// KODE BARU:
const API_BASE_URL = 'http://127.0.0.1:8000';

export default function BookingForm({ preselectedService, onClearPreselected, onBookingSuccess }: BookingFormProps) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [activeTab, setActiveTab] = useState<'package' | 'rentcar' | 'visa_itas'>('package');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [multiplier, setMultiplier] = useState<number>(1);
  const [bookingDate, setBookingDate] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch data dari API Laravel
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/services`);
        if (!response.ok) throw new Error('Gagal mengambil data layanan dari server.');
        const data = await response.json();
        setServices(data);
      } catch (error: any) {
        console.error('Error fetching services:', error);
        setErrorMessage('Gagal terhubung ke server. Pastikan koneksi atau backend aktif.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Sinkronisasi ketika user memilih dari luar
  useEffect(() => {
    if (preselectedService) {
      if (preselectedService.type === 'visa_itas') {
        setActiveTab('visa_itas');
      } else if (preselectedService.type === 'rentcar') {
        setActiveTab('rentcar');
      } else {
        setActiveTab('package');
      }
      setSelectedItemId(preselectedService.id);
    }
  }, [preselectedService]);

  const currentSubItem = services.find(item => item.id === Number(selectedItemId));

  // Tentukan apakah item berjenis fixed-date
  const itemType = currentSubItem?.category === 'fixed-date' || 
                   currentSubItem?.service_name.toLowerCase().includes('umroh') || 
                   currentSubItem?.service_name.toLowerCase().includes('barokah') ||
                   (activeTab === 'package' && !!selectedItemId) 
                   ? 'fixed-date' 
                   : 'reguler';

  // Handler saat memilih item di dropdown
  const handleItemSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedItemId(id);

    const selectedPkg = services.find(item => item.id === Number(id));

    if (selectedPkg && selectedPkg.departure_date) {
      setBookingDate(selectedPkg.departure_date);
    } else {
      setBookingDate('');
    }
  };

  // Switch Tab Handler
  const handleTabChange = (tab: 'package' | 'rentcar' | 'visa_itas') => {
    setActiveTab(tab);
    setSelectedItemId('');
    setBookingDate('');
    setMultiplier(1);
  };

  // Filter items berdasarkan tab aktif
  const activeSubItems = services.filter(item => {
    const nameLower = item.service_name.toLowerCase();
    const isVisaItas = item.category === 'visa_itas' || nameLower.includes('visa') || nameLower.includes('itas');
    const isRentCar = item.category === 'rentcar' || 
                      nameLower.includes('bus') || 
                      nameLower.includes('hiace') || 
                      nameLower.includes('sewa');

    if (activeTab === 'visa_itas') return isVisaItas;
    if (activeTab === 'rentcar') return isRentCar && !isVisaItas;
    return !isRentCar && !isVisaItas;
  });

  const calculateTotal = () => {
    if (!currentSubItem) return 0;
    return currentSubItem.price * multiplier;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemId) {
      alert('Silakan pilih layanan terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    
    const payload = {
      service_id: Number(selectedItemId),
      customer_name: customerName,
      whatsapp_number: whatsappNumber,
      email: email,
      booking_date: bookingDate || (currentSubItem?.departure_date ?? new Date().toISOString().split('T')[0]),
      multiplier: multiplier,
      special_notes: specialNotes,
      total_price: calculateTotal(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/booking/store`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        if (onBookingSuccess) onBookingSuccess();
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Gagal menyimpan pemesanan.');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorMessage(error.message || 'Terjadi kesalahan saat mengunduh data.');
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
*Tanggal Booking:* ${bookingDate || 'Sesuai Jadwal Paket'}
*Jumlah / Durasi:* ${multiplier}

Mohon untuk diproses lebih lanjut. Terima kasih!`;

    return `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(textMessage)}`;
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
    setErrorMessage(null);
    if (onClearPreselected) onClearPreselected();
  };

  return (
    <div id="booking-section" className="w-full max-w-4xl mx-auto my-12 bg-emerald-900/10 border border-emerald-800/50 rounded-3xl p-1 shadow-2xl backdrop-blur-sm block clear-both">
      <div className="bg-emerald-900/20 rounded-[22px] p-6 md:p-8">
        <h3 className="text-xl font-bold text-center text-black mb-6 font-mono uppercase tracking-wider">
          Formulir Sistem Pemesanan Online
        </h3>

        {/* NOTIFIKASI ERROR */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200 text-sm">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* LOADING INDICATOR */}
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-emerald-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-sm font-medium">Memuat data layanan...</p>
          </div>
        ) : !isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* TABS LAYANAN */}
            <div className="grid grid-cols-3 bg-emerald-950/60 p-1.5 rounded-2xl border border-emerald-900">
              <button
                type="button"
                onClick={() => handleTabChange('package')}
                className={`py-3.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  activeTab === 'package' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-emerald-400 hover:text-emerald-200'
                }`}
              >
                Paket Tour & Travel
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('rentcar')}
                className={`py-3.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  activeTab === 'rentcar' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-emerald-400 hover:text-emerald-200'
                }`}
              >
                Sewa Bus & Armada
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('visa_itas')}
                className={`py-3.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                  activeTab === 'visa_itas' ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-emerald-400 hover:text-emerald-200'
                }`}
              >
                Visa & ITAS
              </button>
            </div>

            {/* SELECTION DROPDOWN */}
            <div>
              <label className="block text-xs text-black-300 font-bold mb-1">
                {activeTab === 'package' && 'Pilih Paket Destinasi / Umroh / Wisata'}
                {activeTab === 'rentcar' && 'Pilih Unit Bus / Mobil / Armada'}
                {activeTab === 'visa_itas' && 'Pilih Jenis Layanan Dokumen / Visa'}
              </label>
              <select
                value={selectedItemId}
                onChange={handleItemSelect}
                required
                className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3.5 border border-emerald-800 focus:outline-none text-sm text-left block"
              >
                <option value="">-- Silakan Pilih --</option>
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
              <label className="block text-xs text-black font-bold mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  // Menghapus angka dan karakter khusus
                  const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setCustomerName(onlyLetters);
                }}
                required
                className="w-full bg-[#062c1e] text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm focus:outline-none focus:border-amber-500"
                placeholder="Masukkan nama Anda"
              />
            </div>

              <div>
                <label className="block text-xs text-black-300 font-bold mb-1">No. WhatsApp (Aktif)</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={whatsappNumber}
                  onChange={(e) => {
                  // Menghapus semua karakter selain angka (0-9)
                  const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                  setWhatsappNumber(onlyNumbers);
                }}
                  required
                  className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm focus:outline-none focus:border-amber-500"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              <div>
                <label className="block text-xs text-balck-300 font-bold mb-1">Alamat Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm focus:outline-none focus:border-amber-500"
                  placeholder="nama@email.com"
                />
              </div>

              {/* TANGGAL KEBERANGKATAN */}
              <div>
                <label className="block text-xs text-black-300 font-bold mb-1">Tanggal Keberangkatan</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required={itemType !== 'fixed-date'}
                  disabled={itemType === 'fixed-date'}
                  className={`w-full text-white rounded-xl px-4 py-3 border text-sm ${
                    itemType === 'fixed-date'
                      ? 'bg-emerald-900/30 border-emerald-950 text-emerald-400/60 cursor-not-allowed'
                      : 'bg-emerald-950 border-emerald-800 focus:outline-none focus:border-amber-500'
                  }`}
                />
                {itemType === 'fixed-date' && (
                  <p className="text-[10px] text-amber-400 mt-1">
                    * Tanggal otomatis mengikuti jadwal resmi paket ini.
                  </p>
                )}
              </div>
            </div>

            {/* MULTIPLIER / JUMLAH UNIT / PESERTA */}
            <div>
              <label className="block text-xs text-balck-300 font-bold mb-1">
                {activeTab === 'rentcar' ? 'Jumlah Hari / Unit' : 'Jumlah Peserta / Paspor'}
              </label>
              <input
                type="number"
                min="1"
                value={multiplier}
                onChange={(e) => setMultiplier(Math.max(1, parseInt(e.target.value) || 1))}
                required
                className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* CATATAN TAMBAHAN */}
            <div>
              <label className="block text-xs text-black-300 font-bold mb-1">Catatan Tambahan</label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-emerald-950 text-white rounded-xl px-4 py-3 border border-emerald-800 text-sm focus:outline-none focus:border-amber-500"
                placeholder="Contoh: Request bangku depan, penjemputan bandara, dll."
              />
            </div>

            {/* ESTIMASI HARGA */}
            {currentSubItem && (
              <div className="bg-emerald-950/80 p-4 rounded-xl flex justify-between items-center border border-emerald-800">
                <div>
                  <span className="text-xs text-emerald-400 block font-medium">
                    Estimasi Total Harga ({multiplier} {activeTab === 'rentcar' ? 'Unit/Hari' : 'Orang'})
                  </span>
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
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pemesanan</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* SUCCESS SCREEN */
          <div className="bg-emerald-950/90 border border-emerald-800 text-white rounded-2xl p-8 text-center flex flex-col items-center justify-center shadow-xl">
            <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-emerald-50">Pemesanan Berhasil!</h3>
            <p className="text-emerald-300 mb-6">Tim Darunnajah akan menghubungi Anda segera.</p>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl mb-3 text-center transition-colors"
            >
              Konfirmasi via WhatsApp
            </a>
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