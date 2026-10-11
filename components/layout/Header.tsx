'use client';

import React, { useState } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { useAuth } from '../auth/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { 
  FileText, 
  BookOpen, 
  CheckCircle, 
  GraduationCap, 
  HelpCircle, 
  Info, 
  Menu, 
  X, 
  FolderEdit,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  AlertTriangle,
  LogIn,
  KeyRound
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectWeek?: (weekNum: number) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, role, logout } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [authModalMessage, setAuthModalMessage] = useState<string | undefined>(undefined);
  const [unauthorizedWarning, setUnauthorizedWarning] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleStudentDashboardClick = () => {
    if (!currentUser) {
      setAuthModalMessage(
        language === 'tr'
          ? 'Öğrenci Paneline erişebilmek için lütfen şifrenizle giriş yapınız veya kayıt olunuz.'
          : 'Please log in with your password to access the Student Dashboard.'
      );
      setAuthModalTab('login');
      setAuthModalOpen(true);
      return;
    }
    setActiveTab('student-dashboard');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminDashboardClick = () => {
    if (!currentUser) {
      setAuthModalMessage(
        language === 'tr'
          ? 'Yönetim Paneline erişebilmek için lütfen yönetici hesabınızla giriş yapınız.'
          : 'Please log in with an administrator account to access the Administration Dashboard.'
      );
      setAuthModalTab('login');
      setAuthModalOpen(true);
      return;
    }

    if (role === 'admin') {
      setActiveTab('admin-dashboard');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setUnauthorizedWarning(true);
    }
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

            {/* Right Actions: Dashboard Buttons, Language Switcher & User Profile */}
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

              {/* Functional Dashboard Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStudentDashboardClick}
                  title="Öğrenci Paneli"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'student-dashboard'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{t('btnStudentDashboard')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdminDashboardClick}
                  title="Yönetim Paneli"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'admin-dashboard'
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('btnAdminDashboard')}</span>
                </button>
              </div>

              {/* User Authentication Pill / Login Button */}
              {!mounted ? (
                <div className="w-24 h-7" />
              ) : currentUser ? (
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-1">
                  <div className="flex items-center gap-2 px-2 py-0.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
                    }`}>
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-2xs font-bold text-slate-900 leading-tight truncate max-w-[90px]">
                        {currentUser.fullName}
                      </span>
                      <span className="text-3xs text-slate-500 font-semibold uppercase leading-tight">
                        {role === 'admin' ? 'YÖNETİCİ' : 'ÖĞRENCİ'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      if (activeTab === 'student-dashboard' || activeTab === 'admin-dashboard') {
                        setActiveTab('home');
                      }
                    }}
                    title="Oturumu Kapat"
                    className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMessage(undefined);
                    setAuthModalTab('login');
                    setAuthModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Giriş / Kayıt' : 'Sign In'}</span>
                </button>
              )}

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
            
            {/* Mobile Auth Summary */}
            {!mounted ? (
              <div className="h-10 mb-3" />
            ) : currentUser ? (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                    role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
                  }`}>
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{currentUser.fullName}</span>
                    <span className="text-2xs text-slate-500 block">
                      {role === 'admin' ? 'Yönetici Hesabı' : `Öğrenci (${currentUser.studentNumber || ''})`}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    setActiveTab('home');
                  }}
                  className="text-2xs font-semibold text-red-600 hover:bg-red-50 px-2 py-1 rounded border border-red-200"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalMessage(undefined);
                  setAuthModalTab('login');
                  setAuthModalOpen(true);
                }}
                className="w-full py-2 px-3 bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 mb-3"
              >
                <KeyRound className="w-4 h-4" />
                <span>Şifreyle Giriş Yap veya Kaydol</span>
              </button>
            )}

            {/* Dashboards on Mobile */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={handleStudentDashboardClick}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg ${
                  activeTab === 'student-dashboard'
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Öğrenci Paneli</span>
              </button>

              <button
                type="button"
                onClick={handleAdminDashboardClick}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg ${
                  activeTab === 'admin-dashboard'
                    ? 'bg-purple-700 text-white'
                    : 'bg-purple-50 text-purple-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Yönetim Paneli</span>
              </button>
            </div>

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
          </div>
        )}
      </header>

      {/* Role Protection Warning Modal */}
      {unauthorizedWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900 mb-1">
              {language === 'tr' ? 'Yönetici Yetkisi Gereklidir' : 'Administrator Access Required'}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              {language === 'tr'
                ? `Şu anda Öğrenci rolündeki (${currentUser?.fullName}) hesapla oturum açmış durumdasınız. Yönetim Paneline yalnızca Ana Yönetici veya yönetici yetkisi atanmış kullanıcılar erişebilir.`
                : 'You are currently logged in with a Student account. Only administrators can access the Administration Dashboard.'}
            </p>

            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setUnauthorizedWarning(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                {language === 'tr' ? 'Kapat' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setUnauthorizedWarning(false);
                  logout();
                  setAuthModalMessage('Lütfen Ana Yönetici şifrenizle giriş yapınız.');
                  setAuthModalTab('login');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-bold bg-purple-700 text-white hover:bg-purple-800 rounded-lg transition-colors cursor-pointer"
              >
                {language === 'tr' ? 'Yönetici Olarak Giriş Yap' : 'Log in as Admin'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
        message={authModalMessage}
      />
    </>
  );
}
