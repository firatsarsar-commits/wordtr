'use client';

import React, { useState } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { 
  FileText, 
  BookOpen, 
  CheckCircle, 
  GraduationCap, 
  HelpCircle, 
  Info, 
  Menu, 
  X, 
  Globe, 
  Lock, 
  FolderEdit
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectWeek?: (weekNum: number) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [placeholderModal, setPlaceholderModal] = useState<{
    isOpen: boolean;
    type: 'student' | 'admin' | null;
  }>({ isOpen: false, type: null });

  const navItems = [
    { id: 'home', label: t('navHome'), icon: BookOpen },
    { id: 'curriculum', label: t('navCurriculum'), icon: FileText },
    { id: 'practice', label: t('navPracticeLab'), icon: CheckCircle },
    { id: 'exams', label: t('navExams'), icon: GraduationCap },
    { id: 'question-bank', label: t('navQuestionBank'), icon: FolderEdit },
    { id: 'resources', label: t('navResources'), icon: HelpCircle },
    { id: 'about', label: t('navAbout'), icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-800 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">WordLab</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">TR</span>
                </div>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  {language === 'tr' ? 'Etkileşimli Word Öğrenme Platformu' : 'Interactive Word Platform'}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      isActive 
                        ? 'text-blue-700 bg-blue-50 font-semibold' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Actions: Placeholders & Language Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Language Switcher */}
              <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setLanguage('tr')}
                  aria-label="Türkçe Diline Geç"
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    language === 'tr'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  TR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  aria-label="Switch to English"
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Placeholder Buttons (explicitly non-functional placeholders for Antigravity as mandated) */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlaceholderModal({ isOpen: true, type: 'student' })}
                  title={t('btnStudentDashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t('btnStudentDashboard')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlaceholderModal({ isOpen: true, type: 'admin' })}
                  title={t('btnAdminDashboard')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t('btnAdminDashboard')}</span>
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                aria-label="Menüyü aç/kapat"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPlaceholderModal({ isOpen: true, type: 'student' });
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 rounded-md"
              >
                <span>{t('btnStudentDashboard')}</span>
                <span className="text-2xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Yakında</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPlaceholderModal({ isOpen: true, type: 'admin' });
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 rounded-md"
              >
                <span>{t('btnAdminDashboard')}</span>
                <span className="text-2xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Yakında</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Placeholder Modal for Student & Admin Dashboards */}
      {placeholderModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {placeholderModal.type === 'student' ? t('btnStudentDashboard') : t('btnAdminDashboard')}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Google Antigravity Modülü</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {placeholderModal.type === 'student'
                ? t('placeholderStudentDesc')
                : t('placeholderAdminDesc')}
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPlaceholderModal({ isOpen: false, type: null })}
                className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
              >
                {t('btnClose')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
