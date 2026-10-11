'use client';

import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { FileText, GraduationCap, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Course */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">WordLab TR</span>
              <span className="text-2xs font-semibold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                v1.0
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mb-4">
              {language === 'tr'
                ? '"Eğitimde Bilişim Teknolojileri" dersi için geliştirilmiş; 14 haftalık yapılandırılmış müfredat, gerçek OOXML belge analizi, 50 soruluk deneme sınavı ve pedagojik yapay zekâ asistanı sunan etkileşimli Word öğrenme platformu.'
                : 'An interactive Microsoft Word learning environment designed for university courses, featuring a 14-week curriculum, deterministic OOXML document evaluation, a 50-question exam, and AI educational coaching.'}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>Eğitimde Bilişim Teknolojileri</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>WCAG 2.2 AA Uyumlu</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {language === 'tr' ? 'Öğrenme Alanları' : 'Learning Sections'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('curriculum'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navCurriculum')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('practice'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navPracticeLab')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('exams'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navExams')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('question-bank'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navQuestionBank')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              {language === 'tr' ? 'Bilgi & Destek' : 'Support & Info'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navResources')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navAbout')}
                </button>
              </li>
              <li className="text-slate-400">
                <span>Google Antigravity Entegrasyonu</span>
              </li>
              <li className="text-slate-400">
                <span>Vercel & Next.js Destekli</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WordLab TR. {language === 'tr' ? 'Tüm hakları saklıdır. Eğitim amaçlı açık platform.' : 'All rights reserved. Educational open platform.'}</p>
          <p className="text-2xs text-slate-400">
            {language === 'tr' 
              ? 'Microsoft ve Word, Microsoft Corporation\'ın ticari markalarıdır. WordLab TR bağımsız bir akademik eğitim projesidir.' 
              : 'Microsoft and Word are trademarks of Microsoft Corporation. WordLab TR is an independent academic project.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
