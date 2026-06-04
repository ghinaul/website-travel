/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQS } from '../data';
import { 
  Instagram, Youtube, Phone, Mail, MapPin, Compass, 
  HelpCircle, ChevronDown, ChevronUp, Share2, Award, Clock
} from 'lucide-react';

export default function FaqContact() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid: FAQs */}
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left panel FAQ overview */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100 px-3 py-1 rounded-full w-fit">Informasi Pelanggan</span>
            <h2 className="text-3xl font-extrabold text-emerald-950 sm:text-4xl mt-4 leading-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-4 text-emerald-800 text-sm md:text-base leading-relaxed">
              Kami merangkum pertanyaan umum mengenai syarat pendaftaran umroh, penyewaan bus PO Darunnajah Zahra Utama, legalitas kementerian, serta tata cara pembayaran transparan untuk mempermudah transaksi Anda.
            </p>

            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
              <div className="p-3 bg-emerald-950 text-amber-400 rounded-xl">
                <Award className="h-5 w-5" />
              </div>
              <div className="text-xs text-emerald-900 leading-normal">
                <strong>Legalitas Terjamin:</strong> SK IZIN PPIU No. 02201051212440004 Kementerian Agama Republik Indonesia (telah terdaftar aktif sejak tahun 2000).
              </div>
            </div>
          </div>

          {/* Right panel Collapsible Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-emerald-600 bg-emerald-50/20 shadow-sm' 
                      : 'border-emerald-100 hover:border-emerald-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-emerald-950 text-sm md:text-base focus:outline-none cursor-pointer"
                    id={`faq-trigger-${faq.id}`}
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-4.5 w-4.5 text-emerald-700 shrink-0" />
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-emerald-700" /> : <ChevronDown className="h-4 w-4 text-emerald-600" />}
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out px-5 pb-5 pt-0 text-emerald-900 text-xs md:text-sm leading-relaxed border-t border-emerald-50 ${
                      isOpen ? 'block opacity-100 mt-2' : 'hidden opacity-0'
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Lower Grid: Contact Details & Connected Media & Google Maps iframe */}
        <div className="grid lg:grid-cols-12 gap-12 bg-emerald-950 rounded-3xl overflow-hidden shadow-xl text-white">
          
          {/* Contacts Information column */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-emerald-955 pointer-events-none opacity-40" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  KANTOR PUSAT UTAMA
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-4">Hubungi Darunnajah</h3>
                <p className="text-emerald-200 text-xs md:text-sm mt-2 font-light">
                  Silahkan hubungi kontak person atau kunjungi kantor fisik kami di pesona Pesantren Darunnajah Ulujami, Jakarta Selatan.
                </p>
              </div>

              {/* Direct points */}
              <div className="space-y-4 text-xs md:text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-900 rounded-xl">
                    <MapPin className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white">Alamat Kantor</h4>
                    <p className="text-emerald-100 mt-1 leading-normal text-xs">
                      Jl. Ulujami Raya No. 86 RT. 01 / RW. 01, Ulujami, Pesanggrahan, Jakarta Selatan, DKI Jakarta 12250
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-900 rounded-xl">
                    <Phone className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white">Kontak Person / WA</h4>
                    <p className="text-emerald-100 mt-1 font-mono text-xs">
                      +62 812-2222-2222 (Sewa Bus & Pendaftaran)<br />
                      +62 812-3456-7890 (Haji, Umroh & Visa)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-900 rounded-xl">
                    <Mail className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white">Email Bisnis</h4>
                    <p className="text-emerald-100 mt-1 font-mono text-xs">
                      info@darunnajah-travel.co.id
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels buttons */}
              <div className="pt-4 border-t border-emerald-800">
                <span className="text-[10px] text-emerald-300 font-mono block uppercase mb-3 tracking-widest">Ikuti Media Sosial Resmi</span>
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/darunnajah_travel" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-emerald-900 hover:bg-amber-400 hover:text-emerald-950 rounded-xl transition-all inline-flex items-center gap-2 text-xs font-bold shrink-0"
                  >
                    <Instagram className="h-4.5 w-4.5" />
                    Instagram
                  </a>
                  <a 
                    href="https://www.youtube.com/@darunnajah" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-emerald-900 hover:bg-amber-400 hover:text-emerald-950 rounded-xl transition-all inline-flex items-center gap-2 text-xs font-bold shrink-0"
                  >
                    <Youtube className="h-4.5 w-4.5" />
                    YouTube Channel
                  </a>
                </div>
              </div>
            </div>

            {/* Time operations */}
            <div className="relative z-10 text-[11px] text-emerald-300/80 mt-12 flex items-center gap-1.5 border-t border-emerald-800/80 pt-4">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Senin - Sabtu: 08:00 s/d 17:00 WIB</span>
            </div>
          </div>

          {/* Interactive Live Map coordinates column */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[400px] relative bg-emerald-900/40">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.196901848529!2d106.772551574512!3d-6.23775196108151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f10f44485555%3A0xe54e1957256561cf!2sPondok%20Pesantren%20Darunnajah!5e0!3m2!1sid!2sid!4v1717234567890!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[10%] brightness-[95%] hover:grayscale-0 transition-all duration-500"
              title="Komplek Darunnajah Ulujami, Jakarta Selatan"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
