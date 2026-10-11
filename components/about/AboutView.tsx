'use client';

import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { 
  FileText, 
  GraduationCap, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export function AboutView() {
  const { language } = useLanguage();

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center mx-auto shadow-sm">
            <FileText className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block">
            {language === 'tr' ? 'Hakkında ve Pedagojik Çerçeve' : 'About & Pedagogical Framework'}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            WordLab TR
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            {language === 'tr'
              ? 'Üniversite öğrencileri için geliştirilmiş iki dilli, etkileşimli, yapay zekâ destekli Microsoft Word öğrenme ve belge analiz ortamı.'
              : 'A bilingual, interactive, AI-supported Microsoft Word learning and automated document evaluation platform for university students.'}
          </p>
        </div>

        {/* Project Vision & Course Context */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <span>{language === 'tr' ? 'Ders Bağlamı ve Vizyon' : 'Course Context & Vision'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'tr'
              ? 'WordLab TR, üniversitelerin Eğitim Fakültelerinde ve lisans programlarında okutulan "Eğitimde Bilişim Teknolojileri" dersi kapsamında kelime işlemci (Microsoft Word) yeterliklerini kazandırmak üzere özel olarak tasarlanmıştır. Öğrencilerin sadece kuramsal bilgi edinmelerini değil; gerçek OOXML (.docx) dosyaları üreterek, biçimlendirme hatalarını anında görerek ve düzeltmeler yaparak aktif bir öğrenme deneyimi yaşamalarını hedefler.'
              : 'WordLab TR is tailored for university students taking "Information Technologies in Education". It transforms passive instruction into an authentic hands-on laboratory where students author real OOXML (.docx) documents, receive instantaneous deterministic rubric feedback, and refine their academic formatting skills.'}
          </p>
        </div>

        {/* 4 Instructional Design Pillars */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-700" />
            <span>{language === 'tr' ? 'Öğretim Tasarımı İlkeleri' : 'Instructional Design Principles'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Aktif Öğrenme (Active Learning)</span>
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Öğrenciler pasif video izleyicisi olmak yerine, Word üzerinde gerçek ödevler üretir ve sisteme yükleyerek anında dönüt alır.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2. Yapı İskeleleri (Scaffolding)</span>
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Haftalık içerikler basitten karmaşığa (Başlangıç, Orta, İleri) ilerler. Yapay zekâ asistanı ödev cevaplarını doğrudan vermek yerine ipuçları sağlar.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3. Deterministik Değerlendirme</span>
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Yapay tahminler yerine gerçek OOXML XML etiketleri (w:sz, w:jc, w:pStyle, w:pgMar) doğrudan taranarak ölçülebilir puanlar üretilir.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <strong className="text-slate-900 font-bold block text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>4. Biçimlendirici Geri Bildirim</span>
              </strong>
              <p className="text-slate-600 leading-relaxed">
                Öğrenciler hatalı veya eksik kriterleri net şekilde görerek belgelerini revize edebilir ve puanlarını yükseltebilir.
              </p>
            </div>
          </div>
        </div>

        {/* Future Antigravity Roadmap & Security */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-700" />
            <span>{language === 'tr' ? 'Google Antigravity ve Gelecek Geliştirme Yol Haritası' : 'Google Antigravity Roadmap'}</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === 'tr'
              ? 'Bu sürüm (v1.0), tam fonksiyonel çekirdek eğitim platformunu, 14 haftalık müfredatı, 50 soruluk deneme sınavını ve OOXML analiz motorunu sunar. Öğrenci Paneli ve Yönetim Paneli için çok kullanıcılı veritabanı, eğitmen soru bankası senkronizasyonu ve kurumsal LMS entegrasyonu sonraki aşamada Google Antigravity üzerinde geliştirilecektir.'
              : 'This v1.0 release delivers the fully operational learning environment, 14-week curriculum, 50-question examination center, and deterministic OOXML engine. Multi-user authentication, cloud persistence, and institutional LMS connectivity will follow in Google Antigravity.'}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>WCAG 2.2 AA Standartları</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>TypeScript & Next.js Mimarisi</span>
            <span aria-hidden="true">·</span>
            <span>Google Gemini 3.8 Entegrasyonu</span>
          </div>
        </div>

      </div>
    </div>
  );
}
