'use client';

import React, { useState } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { 
  Keyboard, 
  Languages, 
  BookMarked, 
  Download, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  Search
} from 'lucide-react';
import { createRealDocxBlob, downloadBlob } from '@/lib/docx/generator';

export function ResourcesView() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const shortcuts = [
    { tr: 'Ctrl + S', en: 'Ctrl + S', descTr: 'Belgeyi Kaydet', descEn: 'Save Document', cat: 'Dosya' },
    { tr: 'Ctrl + N', en: 'Ctrl + N', descTr: 'Yeni Boş Belge Aç', descEn: 'New Blank Document', cat: 'Dosya' },
    { tr: 'Ctrl + O', en: 'Ctrl + O', descTr: 'Var Olan Belgeyi Aç', descEn: 'Open Document', cat: 'Dosya' },
    { tr: 'Ctrl + P', en: 'Ctrl + P', descTr: 'Yazdır / Baskı Önizleme', descEn: 'Print Document', cat: 'Dosya' },
    { tr: 'Ctrl + Z', en: 'Ctrl + Z', descTr: 'Son İşlemi Geri Al', descEn: 'Undo', cat: 'Düzen' },
    { tr: 'Ctrl + Y', en: 'Ctrl + Y', descTr: 'Geri Alınan İşlemi Yinele', descEn: 'Redo', cat: 'Düzen' },
    { tr: 'Ctrl + K', en: 'Ctrl + B', descTr: 'Kalın (Bold) Yap', descEn: 'Toggle Bold', cat: 'Biçim' },
    { tr: 'Ctrl + T', en: 'Ctrl + I', descTr: 'İtalik (Eğik) Yap', descEn: 'Toggle Italic', cat: 'Biçim' },
    { tr: 'Ctrl + A', en: 'Ctrl + U', descTr: 'Altı Çizili Yap', descEn: 'Toggle Underline', cat: 'Biçim' },
    { tr: 'Ctrl + D', en: 'Ctrl + J', descTr: 'Paragrafı İki Yana Yasla (Justify)', descEn: 'Justify Paragraph', cat: 'Paragraf' },
    { tr: 'Ctrl + R', en: 'Ctrl + E', descTr: 'Paragrafı Ortala', descEn: 'Center Paragraph', cat: 'Paragraf' },
    { tr: 'Ctrl + L', en: 'Ctrl + L', descTr: 'Paragrafı Sola Hizala', descEn: 'Left Align', cat: 'Paragraf' },
    { tr: 'Ctrl + G', en: 'Ctrl + R', descTr: 'Paragrafı Sağa Hizala', descEn: 'Right Align', cat: 'Paragraf' },
    { tr: 'Ctrl + Enter', en: 'Ctrl + Enter', descTr: 'Sayfa Sonu (Page Break) Ekle', descEn: 'Insert Page Break', cat: 'Düzen' },
    { tr: 'Shift + F3', en: 'Shift + F3', descTr: 'Büyük / Küçük Harf Durumu Döngüsü', descEn: 'Cycle Capitalization Case', cat: 'Biçim' },
    { tr: 'Ctrl + Alt + F', en: 'Ctrl + Alt + F', descTr: 'Dipnot Ekle (Insert Footnote)', descEn: 'Insert Footnote', cat: 'Başvuru' },
    { tr: 'F7', en: 'F7', descTr: 'Yazım ve Dilbilgisi Denetimi', descEn: 'Spelling & Grammar Check', cat: 'Gözden Geçir' },
    { tr: 'Ctrl + F', en: 'Ctrl + F', descTr: 'Bul ve Gezinti Bölmesini Aç', descEn: 'Find & Open Navigation Pane', cat: 'Gezinti' },
  ];

  const terminology = [
    { tr: 'Giriş', en: 'Home', descTr: 'Temel metin, pano ve stiller sekmesi' },
    { tr: 'Ekle', en: 'Insert', descTr: 'Tablo, resim, sayfa numarası ve sembol ekleme' },
    { tr: 'Tasarım', en: 'Design', descTr: 'Belge temaları, stil kümeleri ve sayfa rengi' },
    { tr: 'Düzen', en: 'Layout', descTr: 'Kenar boşlukları, yönlendirme, sütunlar ve kesmeler' },
    { tr: 'Başvurular', en: 'References', descTr: 'İçindekiler tablosu, dipnot, kaynakça ve resim yazısı' },
    { tr: 'Postalar', en: 'Mailings', descTr: 'Adres mektup birleştirme ve etiketler' },
    { tr: 'Gözden Geçir', en: 'Review', descTr: 'Yazım denetimi, açıklamalar ve değişiklikleri takip et' },
    { tr: 'Görünüm', en: 'View', descTr: 'Sayfa düzeni, gezinti bölmesi ve yakınlaştırma' },
    { tr: 'Şerit', en: 'Ribbon', descTr: 'Pencerenin üstündeki komut çubuğu' },
    { tr: 'İki Yana Yasla', en: 'Justify', descTr: 'Her iki kenar boşluğuna hizalama' },
    { tr: 'Stiller', en: 'Styles', descTr: 'Başlık 1, Başlık 2 gibi yapısal biçimlendirmeler' },
    { tr: 'Metni Kaydır', en: 'Wrap Text', descTr: 'Resmin etrafındaki metin akış düzeni' },
    { tr: 'İçerik Denetimi', en: 'Content Control', descTr: 'Etkileşimli form alanları' },
  ];

  // Download academic thesis starter
  const handleDownloadAcademicTemplate = async () => {
    const blob = await createRealDocxBlob({
      title: 'T.C. ÜNİVERSİTESİ EĞİTİM BİLİMLERİ ENSTİTÜSÜ',
      subtitle: 'EĞİTİMDE BİLİŞİM TEKNOLOJİLERİ TEZ ŞABLONU',
      paragraphs: [
        'ÖZET: Bu çalışma, yükseköğretimde bilgisayar destekli kelime işlem öğretiminin etkililiğini incelemektedir. Araştırma kapsamında kural tabanlı değerlendirme ve anlık biçimlendirici geri bildirimlerin öğrencilerin tipografik yeterlilikleri üzerindeki rolü ele alınmıştır.',
        '1. GİRİŞ: Bilgi çağında öğretmen adaylarının akademik doküman standartlarına tam uyum sağlaması büyük önem taşımaktadır. APA 7 standartlarına göre hazırlanan bu şablonda yazı tipi Times New Roman 12 pt, satır aralığı 1.5 ve kenar boşlukları Normal (2.5 cm) olarak yapılandırılmıştır.',
        '2. YÖNTEM: Araştırmada nicel ve nitel veri toplama teknikleri harmanlanmıştır.',
      ],
      fontFamily: 'Times New Roman',
      fontSizePt: 12,
      alignment: 'both',
      lineSpacingTwips: 360,
      marginsTwips: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      hasHeader: true,
      headerText: 'WordLab TR | Yükseköğretim Tez Formatı',
      hasFooter: true,
      footerText: 'Sayfa',
      includePageNumber: true,
      heading1Text: '1. GİRİŞ VE KURAMSAL ÇERÇEVE',
      tableData: {
        headers: ['Bölüm No', 'Başlık', 'Sayfa Aralığı'],
        rows: [
          ['Bölüm 1', 'Giriş ve Problem Durumu', '1 - 15'],
          ['Bölüm 2', 'Alanyazın Taraması', '16 - 45'],
          ['Bölüm 3', 'Yöntem ve Materyal', '46 - 65'],
        ],
      },
    });

    downloadBlob(blob, 'WordLab_Akademik_Tez_Sablonu.docx');
  };

  const filteredShortcuts = shortcuts.filter((s) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.tr.toLowerCase().includes(term) ||
      s.en.toLowerCase().includes(term) ||
      s.descTr.toLowerCase().includes(term) ||
      s.descEn.toLowerCase().includes(term)
    );
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
            {language === 'tr' ? 'Eğitim Materyalleri ve Kılavuzlar' : 'Educational Resources & References'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'tr' ? 'WordLab TR Kaynak Merkezi' : 'WordLab TR Resource Center'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {language === 'tr'
              ? 'Klavye kısayolları, Türkçe-İngilizce menü terimleri sözlüğü, APA 7 akademik format standartları ve indirilebilir Word şablonları.'
              : 'Keyboard shortcuts, Turkish-English ribbon dictionary, APA 7 thesis styling guidelines, and downloadable starter documents.'}
          </p>
        </div>

        {/* Section 1: Downloadable Templates */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === 'tr' ? 'Standart Akademik Word Şablonları (.docx)' : 'Academic Word Templates (.docx)'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'tr'
                  ? 'Tez ve ödevlerinizde doğrudan kullanabileceğiniz doğrulanmış OOXML Word belgeleri.'
                  : 'Pre-configured OOXML Word documents conforming to academic formatting guidelines.'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadAcademicTemplate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'tr' ? 'Akademik Tez Şablonunu İndir (.docx)' : 'Download Thesis Template (.docx)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Times New Roman 12 pt</strong>
              <span>APA 7 ve YÖK standartlarına tam uyumlu gövde metni.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">1.5 Satır Aralığı & 2.5 cm</strong>
              <span>İki yana yaslı paragraflar ve standart Normal kenar boşlukları.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900 block mb-0.5">Yapılandırılmış Başlıklar</strong>
              <span>Başlık 1 ve Başlık 2 stilleri ile otomatik içindekiler uyumu.</span>
            </div>
          </div>
        </div>

        {/* Section 2: Shortcuts Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-blue-700" />
                <span>{language === 'tr' ? 'Klavye Kısayolları (TR & EN Karşılaştırmalı)' : 'Keyboard Shortcuts (TR vs EN)'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'tr'
                  ? 'Türkçe ve İngilizce Word sürümlerindeki en kritik kısayol farkları.'
                  : 'Key shortcut equivalents between Turkish and English Office editions.'}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'tr' ? 'Kısayol ara...' : 'Search shortcut...'}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-2xs uppercase text-slate-500 font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-3">İşlev / Function</th>
                  <th className="px-6 py-3">Türkçe Word</th>
                  <th className="px-6 py-3">İngilizce Word</th>
                  <th className="px-6 py-3">Kategori</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredShortcuts.map((sc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-sans font-medium text-slate-900">
                      {language === 'tr' ? sc.descTr : sc.descEn}
                    </td>
                    <td className="px-6 py-3 text-blue-700 font-bold">
                      <span className="bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{sc.tr}</span>
                    </td>
                    <td className="px-6 py-3 text-slate-700 font-bold">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{sc.en}</span>
                    </td>
                    <td className="px-6 py-3 font-sans text-slate-500 text-2xs">
                      {sc.cat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Word Menu & Terminology Glossary */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-700" />
            <span>{language === 'tr' ? 'Word Menü ve Terminoloji Sözlüğü' : 'Word Ribbon & Terminology Glossary'}</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {language === 'tr'
              ? 'Şerit menü sekmeleri ve sık kullanılan Word araçlarının Türkçe - İngilizce karşılıkları.'
              : 'Bilingual translation glossary of Ribbon tabs and common word processing concepts.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {terminology.map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                  <span>{item.tr}</span>
                  <span className="text-2xs font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    {item.en}
                  </span>
                </div>
                <p className="text-2xs text-slate-500 leading-relaxed">
                  {item.descTr}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
