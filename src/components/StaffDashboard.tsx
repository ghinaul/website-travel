/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, Trash2, CheckCircle, Clock, XCircle, Search, Filter, 
  Download, RefreshCw, BarChart3, Mail, Phone, Calendar, Hash, 
  MapPin, ShieldAlert, KeyRound, Check
} from 'lucide-react';
import { Booking } from '../types';



export default function StaffDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [authorized, setAuthorized] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Loads latest state from local storage
 // Mengambil data asli dari API Laravel & petakan ke format UI React
const loadBookings = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/bookings');
      const data = await response.json();
      
      // Proses mengubah nama kolom dari Laravel agar pas dengan UI React
      const mappedData = data.map((b: any) => {
        // Penyesuaian nama paket secara otomatis untuk tampilan UI admin
        const serviceName = b.service?.includes('int') 
          ? 'Umroh Syawal Barokah Exclusive (9 Hari)' 
          : 'PO Darunnajah Luxury Big Bus (59 Kursi)';

        return {
          id: b.id,
          bookingCode: b.booking_code || `DNJ-2026-${b.id + 10000}`,
          bookingDate: b.booking_date,
          customerName: b.customer_name,     
          customerPhone: b.whatsapp_number,  
          customerEmail: b.email,
          serviceType: serviceName, // Menggunakan nama paket yang sudah rapi
          status: b.status || 'CONFIRMED',
          totalPrice: b.total_price || (b.service?.includes('int') ? 59000000 : 10500000)
        };
      });

      // Masukkan data yang sudah dirapikan ke dalam tabel
      setBookings(mappedData);
    } catch (err) {
      console.error("Gagal mengambil data dari Laravel:", err);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Demo passcodes
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === '1234' || pinCode === 'admin' || pinCode === 'darunnajah') {
      setAuthorized(true);
      setLoginError('');
    } else {
      setLoginError('Kode PIN salah. Coba: 1234');
    }
  };

  // Status updates mapping to storage
  // Mengupdate status booking langsung ke database MySQL Laravel
  const updateStatus = async (id: string, newStatus: Booking['status']) => {
  try {
    const cleanId = id.toString().split(':')[0];

    const response = await fetch(`http://localhost:8000/api/bookings/${cleanId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }) // Mengirim langsung Confirmed / Cancelled / Completed sesuai Laravel
    });

    if (response.ok) {
      setBookings(prev => prev.map(b => b.id.toString().split(':')[0] === cleanId ? { ...b, status: newStatus } : b));
    } else {
      alert('Gagal memperbarui status di server.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Gagal memperbarui status di server.');
  }
};

  // Permanently delete target rows
// Menghapus catatan booking secara permanen dari database
  const deleteBooking = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus catatan pemesanan ini secara permanen dari database?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/bookings/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setBookings(prev => prev.filter(b => b.id !== id));
        } else {
          alert('Gagal menghapus data dari server.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Filter application
  // Jika data dari database masih kosong, jangan tampilkan data contoh bawaan template!
const dataUntukDiFilter = bookings.length > 0 ? bookings : [];

const filteredBookings = dataUntukDiFilter.filter(b => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.customerPhone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || b.serviceType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // KPI Calculations
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  // Format currency helpers
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

const handleExportPDF = () => {
    if (filteredBookings.length === 0) {
      alert('Tidak ada data pemesanan untuk diekspor.');
      return;
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6efd6eea2b0b5de569a8b40fca3efbff72c614c9
    // Memuat library jspdf secara dinamis agar aman dari eror compiler TypeScript
    import('jspdf').then((jsPDFModule) => {
      import('jspdf-autotable').then(() => {
        const doc = new (jsPDFModule.default || jsPDFModule.jsPDF)({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        // 1. Tambahkan Judul Laporan di dalam PDF
        doc.setFontSize(16);
        doc.text('DARUNNAJAH TOURS & TRAVEL', 14, 15);
        doc.setFontSize(12);
        doc.text('Laporan Rekapan Pendataan Reservasi Dashboard', 14, 22);
        doc.setFontSize(10);
        doc.text(`Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}`, 14, 28);

        // 2. Siapkan Kolom Tabel Laporan
        const tableColumn = ["Kode Booking", "Data Pemesan", "Layanan & Qty", "Tarif Total", "Status"];
        const tableRows: any[] = [];

        // 3. Masukkan Data dari State Aplikasi ke Baris Tabel
        filteredBookings.forEach((booking: any) => {
          const bookingData = [
            booking.code || '-',
            `${booking.customer_name}\n${booking.customer_phone}`,
            `${booking.service_type || '-'} (${booking.quantity || 1} orang)`,
            `Rp ${Number(booking.total_price || 0).toLocaleString('id-ID')}`,
            booking.status || '-'
          ];
          tableRows.push(bookingData);
        });

        // 4. Gambar Tabel Otomatis ke dalam Dokumen PDF
        (doc as any).autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 35,
          theme: 'grid',
          headStyles: { fillColor: [4, 47, 26] }, // Warna hijau khas Darunnajah
          styles: { fontSize: 9, cellPadding: 3 }
        });

        // 5. Perintah Unduh Otomatis Langsung ke Browser
        const fileName = `rekapan-darunnajah-${new Date().toISOString().substring(0, 10)}.pdf`;
        doc.save(fileName);
      });
    }).catch(err => {
      console.error("Gagal mengunduh PDF:", err);
      alert("Terjadi kesalahan sistem saat membuat PDF.");
    });
<<<<<<< HEAD
=======
=======

>>>>>>> 6efd6eea2b0b5de569a8b40fca3efbff72c614c9
    // Mengubah judul dokumen sementara agar saat terunduh nama filenya otomatis rapi
    const originalTitle = document.title;
    document.title = `rekapan-pemesanan-darunnajah-${new Date().toISOString().substring(0, 10)}`;

    // Memicu cetak PDF bawaan sistem
    window.print();

    // Mengembalikan judul dokumen ke aslinya setelah jendela cetak merespons
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
>>>>>>> d236083517b2220e41f4915aaeffedfb3637260c
  };
  

  // Screen Gate: Ask for simple PIN to log in
  if (!authorized) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-emerald-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl">
          <div className="w-14 h-14 bg-emerald-950 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
            <KeyRound className="h-6 w-6 stroke-[2.5]" />
          </div>
          
          <h2 className="text-xl font-extrabold text-emerald-950 text-center mb-1">
            Portal Administrasi Pegawai
          </h2>
          <p className="text-center text-xs text-emerald-800 mb-6 leading-relaxed">
            Halaman khusus staf/pegawai PT Darunnajah Zahra Utama Ulujami untuk pencatatan dan pengelolaan data reservasi.
          </p>

          {loginError && (
            <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1.5">
                Masukkan PIN Sandi Staff
              </label>
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Ketuk Kode PIN Staff..."
                className="w-full px-4 py-3 bg-emerald-50/50 border border-emerald-100 focus:border-emerald-600 focus:bg-white text-sm text-emerald-950 rounded-xl focus:outline-none text-center font-mono placeholder:font-sans font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-950 text-amber-400 hover:text-white font-bold rounded-xl text-xs uppercase tracking-wide transition-colors shadow-md shadow-emerald-950/10 cursor-pointer"
            >
              Verifikasi Otoritas
            </button>
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setPinCode('1234'); setLoginError(''); }}
                className="text-xs text-emerald-600 hover:underline font-semibold"
              >
                Gunakan PIN Demo Cepat: 1234
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] bg-emerald-950 text-amber-400 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-800">
              SISTEM DARUNNAJAH DATA CENTER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2">
              Dashboard Pendataan Reservasi
            </h2>
            <p className="text-xs text-emerald-800">
              Pantau pesanan paket domestik/luar negeri, penyewaan PO bus pariwisata, dan berkas ITAS/Visa dengan sistematis.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-950 text-white font-medium rounded-xl text-xs shadow-sm transition-colors print:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0a2.25 2.25 0 0 1-2.25 2.25H8.59A2.25 2.25 0 0 1 6.34 18m11.318-4.171A2.25 2.25 0 0 0 19.5 11.59V8.514c0-.578-.23-1.134-.64-1.545L16.94 4.75A2.25 2.25 0 0 0 15.393 4H9.171c-.53 0-1.04.21-1.415.585L5.4 6.97A2.25 2.25 0 0 0 4.75 8.514v3.076c0 1.09.738 2.016 1.811 2.214" />
            </svg>
            Ekspor Rekapan (.PDF)
          </button>
            <button
              onClick={loadBookings}
              className="flex items-center justify-center p-2.5 bg-white border border-emerald-100 hover:bg-emerald-50 text-emerald-900 rounded-xl transition-colors shrink-0"
              title="Perbarui Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic business metrics cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-emerald-100/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <Hash className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 block font-bold uppercase">Total Pengajuan</span>
              <span className="text-2xl font-black text-emerald-950">{bookings.length}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-100 text-emerald-900 rounded-xl">
              <BarChart3 className="h-6 w-6 text-emerald-800" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 block font-bold uppercase">Perputaran Omset (Aktif)</span>
              <span className="text-xl font-black text-emerald-950">{formatIDR(totalRevenue)}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-amber-50 text-amber-700 rounded-xl">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 block font-bold uppercase">Menunggu Validasi</span>
              <span className="text-2xl font-black text-emerald-950">{pendingCount}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100/80 shadow-sm flex items-center gap-4">
            <div className="p-3.5 bg-emerald-950 text-amber-400 rounded-xl">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-600 block font-bold uppercase">Selesai Berangkat</span>
              <span className="text-2xl font-black text-emerald-950">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* Database queries, filter controls */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-600">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Cari nama pemesan atau kode booking..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-emerald-50/50 focus:bg-white border border-emerald-100 focus:border-emerald-600 text-xs md:text-sm text-emerald-950 rounded-xl focus:outline-none transition-all"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Type Category filter */}
              <div className="flex items-center gap-1 bg-emerald-50 p-1 rounded-xl border border-emerald-100">
                <button
                  onClick={() => setTypeFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${typeFilter === 'ALL' ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setTypeFilter('package')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${typeFilter === 'package' ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}
                >
                  Wisata
                </button>
                <button
                  onClick={() => setTypeFilter('rentcar')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${typeFilter === 'rentcar' ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}
                >
                  Armada
                </button>
                <button
                  onClick={() => setTypeFilter('visa_itas')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${typeFilter === 'visa_itas' ? 'bg-emerald-950 text-white' : 'text-emerald-800'}`}
                >
                  Dokumen
                </button>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-900 rounded-xl py-2 px-3 focus:outline-none"
              >
                <option value="ALL">Semua Status</option>
                <option value="Pending">Menunggu</option>
                <option value="Confirmed">Disetujui / DP</option>
                <option value="Completed">Selesai</option>
                <option value="Cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Bookings registry list */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/20">
              <ShieldAlert className="h-10 w-10 text-emerald-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-emerald-950">Belum Ada Data Pemesanan</h3>
              <p className="text-xs text-emerald-800 mt-1 max-w-xs mx-auto">
                Silahkan buat pemesanan baru di formulir pendaftaran pelanggan atau gunakan "Data Simulasi Kantor" di tombol kanan atas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-950 text-white font-mono text-[11px] tracking-wider uppercase border-b border-emerald-800">
                    <th className="p-4 rounded-tl-xl">KODE & TANGGAL</th>
                    <th className="p-4">DATA PEMESAN</th>
                    <th className="p-4">LAYANAN & QTY</th>
                    <th className="p-4">TARIF TOTAL</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4 rounded-tr-xl text-right">AKSI VALIDASI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50 text-xs text-emerald-950">
                  {filteredBookings.map((b: any) => {
                    return (
        <tr key={b.id} className="hover:bg-emerald-50/50 transition-colors">
                      {/* Code/Date column */}
                      <td className="p-4">
                        <div className="font-bold text-emerald-950 font-mono flex items-center gap-1">
                          <Hash className="h-3.5 w-3.5 text-emerald-600" />
                          {b.bookingCode}
                        </div>
                        <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-mono">
                          <Calendar className="h-3 w-3" />
                          Departure: {b.bookingDate}
                        </div>
                      </td>

                      {/* Client Bio column */}
                      <td className="p-4">
                        <div className="font-extrabold text-emerald-950 text-sm">{b.customerName}</div>
                        <div className="flex flex-col gap-1 mt-1 text-[11px] text-emerald-800">
                          <span className="flex items-center gap-1.5 font-mono">
                            <Phone className="h-3 w-3 text-emerald-600" />
                            {b.customerPhone}
                          </span>
                          <span className="flex items-center gap-1.5 truncate max-w-[200px]">
                            <Mail className="h-3 w-3 text-emerald-600" />
                            {b.customerEmail}
                          </span>
                          {b.identityNumber && (
                            <span className="text-[10px] text-emerald-600">ID: {b.identityNumber}</span>
                          )}
                        </div>
                      </td>

                      {/* Service column */}
                      <td className="p-4">
                        <div className="font-bold text-emerald-950 truncate max-w-[250px]">{b.serviceName}</div>
                        <div className="text-[10px] text-emerald-700 uppercase mt-1 flex items-center gap-1 font-semibold">
                          <MapPin className="h-3 w-3" />
                          Qty: {b.passengersOrDuration} {b.serviceType === 'rentcar' ? 'Hari s/d Unit' : 'Peserta / Orang'}
                        </div>
                      </td>

                      {/* Total bill */}
                      <td className="p-4 font-black text-emerald-950">
                        {formatIDR(b.totalPrice)}
                      </td>

                      {/* Badges status */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                          b.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          b.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          b.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-100' :
                          'bg-amber-50 text-amber-700 border border-amber-100 animate-pulse'
                        }`}>
                          {b.status === 'Completed' ? 'Selesai' :
                           b.status === 'Confirmed' ? 'Disetujui' :
                           b.status === 'Cancelled' ? 'Batal' : 'Menunggu'}
                        </span>
                      </td>

                      {/* Admin operational actions panel */}
                      <td className="p-4 text-right">
                        <div className="inline-flex gap-1 bg-emerald-50 rounded-lg p-1 border border-emerald-100">
                          <button
                            onClick={() => updateStatus(b.id, 'Confirmed')}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded-md"
                            title="Setujui Booking & Armada"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, 'Completed')}
                            className="p-1 text-emerald-700 hover:bg-emerald-100 rounded-md"
                            title="Tandai Selesai Perjalanan"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(b.id, 'Cancelled')}
                            className="p-1 text-red-600 hover:bg-red-100 rounded-md"
                            title="Batalkan Booking"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="p-1 text-red-700 hover:bg-red-200 rounded-md border-l border-emerald-200/80 pl-2 ml-1"
                            title="Hapus Permanen"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                 )})}
                </tbody>
              </table>
            </div>
          )}

          {/* Tips block */}
          <div className="mt-8 bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping shrink-0" />
            <p className="text-[11px] text-emerald-800 leading-normal">
              <strong>Tips Pelayanan Lokasi:</strong> Silahkan filter pencarian berdasarkan "Menunggu" lalu klik tombol Checklist untuk menyetujui, lalu hubungi pelanggan langsung via no. telepon/WA yang terdata. Ekspor berkas kapan saja untuk laporan internal direksi di pesantren.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}