'use client';

import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  Cpu
} from 'lucide-react';

interface HeroSectionProps {
  onStartLearning: () => void;
  onTakeExam: () => void;
}

export function HeroSection({ onStartLearning, onTakeExam }: HeroSectionProps) {
  const { language, t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50/50 pt-12 pb-16 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top quiet kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-800 mb-4 tracking-wide uppercase">
          <span>{t('brandBadge')}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>14 Haftalık Tam Müfredat</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>OOXML Belge Analizi</span>
        </div>

        {/* Main Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {language === 'tr' ? (
                <>
                  Microsoft Word&apos;ü <span className="text-blue-700">Keşfet</span>, <span className="text-blue-700">Uygula</span> ve <span className="text-blue-700">Öğren</span>.
                </>
              ) : (
                <>
                  <span className="text-blue-700">Discover</span>, <span className="text-blue-700">Practice</span>, and <span className="text-blue-700">Master</span> Microsoft Word.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              {t('heroDescription')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onStartLearning}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <span>{t('btnStartLearning')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onTakeExam}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-lg border border-slate-300 shadow-2xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span>{t('btnTakeExam')}</span>
              </button>
            </div>

            {/* Unboxed Metadata Metrics (NO PILLS as per design constitution) */}
            <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">14 Hafta</span>
                <span>Tüm Modüller Açık</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">56+ Uygulama</span>
                <span>Gerçek DOCX Dosyaları</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">50 Soru</span>
                <span>Kapsamlı Deneme Sınavı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">OOXML Motoru</span>
                <span>Kural Tabanlı Analiz</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card: Word-inspired preview pane */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-md p-5 relative overflow-hidden">
              
              {/* Word Ribbon Header Simulation */}
              <div className="border-b border-slate-200 pb-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>Tez_Formati_Hafta14.docx</span>
                  </div>
                  <span className="text-2xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Kural Tabanlı Denetlendi
                  </span>
                </div>
                <div className="flex items-center gap-3 text-2xs text-slate-500 font-medium overflow-x-auto">
                  <span className="text-blue-700 font-bold border-b border-blue-700 pb-0.5">Giriş</span>
                  <span>Ekle</span>
                  <span>Düzen</span>
                  <span>Başvurular</span>
                  <span>Gözden Geçir</span>
                  <span>Görünüm</span>
                </div>
              </div>

              {/* Document Paper Simulation */}
              <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200/80 space-y-3 font-serif">
                <div className="text-center pb-2 border-b border-slate-200">
                  <div className="h-2.5 w-3/4 mx-auto bg-blue-900 rounded mb-1"></div>
                  <div className="h-2 w-1/2 mx-auto bg-slate-400 rounded"></div>
                </div>

                <div className="space-y-1.5 text-justify">
                  <div className="h-2 w-full bg-slate-300 rounded"></div>
                  <div className="h-2 w-full bg-slate-300 rounded"></div>
                  <div className="h-2 w-4/5 bg-slate-300 rounded"></div>
                </div>

                {/* Simulated Table */}
                <div className="bg-white rounded border border-blue-200 overflow-hidden text-2xs font-sans">
                  <div className="bg-blue-50 px-3 py-1 font-semibold text-blue-900 border-b border-blue-200 flex justify-between">
                    <span>Ölçüt</span>
                    <span>Beklenen Değer</span>
                    <span>Durum</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between text-slate-700 border-b border-slate-100">
                    <span>Yazı Tipi</span>
                    <span>Times New Roman 12pt</span>
                    <span className="text-emerald-600 font-semibold">Uygun</span>
                  </div>
                  <div className="px-3 py-1 flex justify-between text-slate-700">
                    <span>Satır Aralığı</span>
                    <span>1.5 Satır / İki Yana</span>
                    <span className="text-emerald-600 font-semibold">Uygun</span>
                  </div>
                </div>
              </div>

              {/* Assessment Engine Badge */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Deterministik OOXML Analizi</span>
                </span>
                <span className="font-semibold text-slate-900">Skor: 100 / 100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
