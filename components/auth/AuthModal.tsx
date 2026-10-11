'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useLanguage } from '../common/LanguageContext';
import { 
  Lock, 
  User, 
  Mail, 
  ShieldCheck, 
  GraduationCap, 
  X, 
  Check, 
  ArrowRight,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  message?: string;
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login', message }: AuthModalProps) {
  const { login, register } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError(language === 'tr' ? 'Lütfen e-posta ve şifrenizi giriniz.' : 'Please enter email and password.');
      return;
    }
    
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(language === 'tr' ? 'Giriş başarılı! Yönlendiriliyorsunuz...' : 'Login successful!');
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 500);
    } else {
      setError(result.error || (language === 'tr' ? 'Giriş başarısız.' : 'Login failed.'));
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError(language === 'tr' ? 'Lütfen tüm zorunlu alanları doldurunuz.' : 'Please fill all required fields.');
      return;
    }

    if (password.length < 6) {
      setError(language === 'tr' ? 'Şifre en az 6 karakter olmalıdır.' : 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError(language === 'tr' ? 'Şifreler birbiriyle eşleşmiyor.' : 'Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({ fullName, email, studentNumber, password });
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(language === 'tr' ? 'Şifreli kaydınız başarıyla tamamlandı! Giriş yapıldı.' : 'Registered successfully!');
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 600);
    } else {
      setError(result.error || (language === 'tr' ? 'Kayıt işlemi başarısız.' : 'Registration failed.'));
    }
  };

  // Helper to fill demo credentials for convenience while enforcing real password authentication
  const fillCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {language === 'tr' ? 'WordLab TR Güvenli Giriş' : 'WordLab TR Secure Authentication'}
              </h2>
              <p className="text-xs text-blue-100">
                {language === 'tr' 
                  ? 'Şifreli Oturum ve Rol Tabanlı Erişim' 
                  : 'Password-Protected Role-Based Access'}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mt-4 bg-black/20 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'login' ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              {language === 'tr' ? 'Şifreyle Giriş Yap' : 'Log In with Password'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'register' ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              {language === 'tr' ? 'Yeni Şifreli Kayıt' : 'Register with Password'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          
          {message && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-blue-600" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{success}</span>
            </div>
          )}

          {/* Quick Credential Helpers */}
          {activeTab === 'login' && (
            <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                {language === 'tr' ? '🔑 Tanımlı Test Hesapları (Tıklayarak Doldurabilirsiniz)' : '🔑 Preset Accounts'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                <button
                  type="button"
                  onClick={() => fillCredentials('admin@wordlabtr.edu.tr', 'Admin123!')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-purple-300 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ana Yönetici</span>
                  </div>
                  <span className="text-2xs text-slate-500 block truncate">admin@wordlabtr.edu.tr</span>
                  <span className="text-3xs text-slate-400 font-mono">Şifre: Admin123!</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials('ogrenci@wordlabtr.edu.tr', 'Ogrenci123!')}
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Öğrenci (Ahmet Y.)</span>
                  </div>
                  <span className="text-2xs text-slate-500 block truncate">ogrenci@wordlabtr.edu.tr</span>
                  <span className="text-3xs text-slate-400 font-mono">Şifre: Ogrenci123!</span>
                </button>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {language === 'tr' ? 'E-posta Adresi' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@wordlabtr.edu.tr"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {language === 'tr' ? 'Hesap Şifresi' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Doğrulanıyor...' : (language === 'tr' ? 'Şifreyle Giriş Yap' : 'Sign In')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'tr' ? 'Ad ve Soyad' : 'Full Name'} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Örn: Ayşe Kaya"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Öğrenci No' : 'Student No'}
                  </label>
                  <input
                    type="text"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="Örn: 230104055"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'E-posta' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ogrenci@edu.tr"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Şifre Belirleyin' : 'Password'} *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="En az 6 karakter"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Şifre Tekrar' : 'Confirm'} *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Şifreyi tekrar yazın"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-2xs text-blue-900 leading-relaxed">
                🛡️ <strong>Güvenlik İlkesi:</strong> Yeni kayıt olan kullanıcılar daima <strong>Öğrenci</strong> rolünü alır. Yönetici rolü yalnızca <strong>Ana Yönetici</strong> tarafından sistem üzerinden atanabilir.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Kaydediliyor...' : (language === 'tr' ? 'Şifreli Kaydı Tamamla' : 'Complete Registration')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
