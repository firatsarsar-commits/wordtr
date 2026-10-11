'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useLanguage } from '../common/LanguageContext';
import { 
  Lock, 
  User, 
  Mail, 
  X, 
  Check, 
  ArrowRight, 
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
  FileText,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register' | 'forgot';
  message?: string;
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login', message }: AuthModalProps) {
  const { login, register, resetPassword, checkEmailExists } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(defaultTab);
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Register fields
  const [fullName, setFullName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [showKvkkModal, setShowKvkkModal] = useState(false);

  // Forgot password fields
  const [forgotStep, setForgotStep] = useState<'email' | 'verify' | 'new_password'>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [codeCountdown, setCodeCountdown] = useState(0);

  // Common UI state
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync defaultTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, defaultTab]);

  // Countdown timer for email verification code
  useEffect(() => {
    if (codeCountdown <= 0) return;
    const interval = setInterval(() => {
      setCodeCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [codeCountdown]);

  if (!isOpen) return null;

  // -------------------------------------------------------------
  // LOGIN SUBMIT
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // REGISTER SUBMIT (with strict KVKK validation)
  // -------------------------------------------------------------
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

    if (!kvkkAccepted) {
      setError(language === 'tr' 
        ? 'Kayıt işlemini tamamlayabilmek için KVKK Aydınlatma Metni\'ni okuyup onaylamanız zorunludur.' 
        : 'You must accept the KVKK consent to complete registration.');
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

  // -------------------------------------------------------------
  // FORGOT PASSWORD FLOW
  // -------------------------------------------------------------
  const handleSendVerificationCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccess(null);

    const targetEmail = forgotEmail.trim();
    if (!targetEmail || !targetEmail.includes('@')) {
      setError(language === 'tr' ? 'Lütfen geçerli bir e-posta adresi giriniz.' : 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const exists = checkEmailExists(targetEmail);
    setIsSubmitting(false);

    if (!exists) {
      setError(language === 'tr' 
        ? `"${targetEmail}" adresine kayıtlı bir kullanıcı hesabı bulunamadı. Lütfen e-postayı kontrol ediniz veya yeni kayıt oluşturunuz.`
        : 'No account found with this email.');
      return;
    }

    // Generate 6-digit random code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generatedCode);
    setEnteredCode('');
    setCodeCountdown(180); // 3 minutes validity
    setForgotStep('verify');
    setSuccess(language === 'tr' 
      ? `6 haneli doğrulama kodu ${targetEmail} adresine başarıyla gönderildi.` 
      : 'Verification code sent to your email.');
  };

  const handleVerifyCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanEntered = enteredCode.trim();
    if (!cleanEntered || cleanEntered.length !== 6) {
      setError(language === 'tr' ? 'Lütfen 6 haneli doğrulama kodunu eksiksiz giriniz.' : 'Please enter the 6-digit code.');
      return;
    }

    if (codeCountdown <= 0) {
      setError(language === 'tr' ? 'Doğrulama kodunun süresi doldu. Lütfen tekrar kod isteyiniz.' : 'Code expired. Please request a new one.');
      return;
    }

    if (cleanEntered !== verificationCode) {
      setError(language === 'tr' ? 'Girdiğiniz doğrulama kodu hatalı. Lütfen kontrol edip tekrar deneyiniz.' : 'Invalid verification code.');
      return;
    }

    setForgotStep('new_password');
    setSuccess(language === 'tr' ? 'E-posta adresiniz doğrulandı! Lütfen yeni şifrenizi belirleyiniz.' : 'Email verified! Set your new password.');
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newPassword || newPassword.length < 6) {
      setError(language === 'tr' ? 'Yeni şifre en az 6 karakter olmalıdır.' : 'Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError(language === 'tr' ? 'Şifreler birbiriyle eşleşmiyor.' : 'Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword(forgotEmail.trim(), newPassword);
    if (!result.success) {
      setIsSubmitting(false);
      setError(result.error || (language === 'tr' ? 'Şifre sıfırlama işlemi başarısız.' : 'Password reset failed.'));
      return;
    }

    // Automatically log in with new password
    const loginResult = await login(forgotEmail.trim(), newPassword);
    setIsSubmitting(false);

    if (loginResult.success) {
      setSuccess(language === 'tr' ? 'Şifreniz başarıyla güncellendi! Oturum açılıyor...' : 'Password updated! Logging in...');
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 700);
    } else {
      setSuccess(language === 'tr' ? 'Şifreniz güncellendi. Yeni şifrenizle giriş yapabilirsiniz.' : 'Password updated! Please log in.');
      setActiveTab('login');
      setEmail(forgotEmail.trim());
      setPassword(newPassword);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150 relative">
        
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
              {activeTab === 'forgot' ? (
                <KeyRound className="w-5 h-5 text-amber-300" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-blue-200" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {activeTab === 'forgot'
                  ? (language === 'tr' ? 'WordLab TR Şifre Sıfırlama' : 'WordLab TR Password Reset')
                  : (language === 'tr' ? 'WordLab TR Güvenli Giriş' : 'WordLab TR Secure Authentication')}
              </h2>
              <p className="text-xs text-blue-100">
                {activeTab === 'forgot'
                  ? (language === 'tr' ? 'E-posta Doğrulaması ile Yeni Parola Belirleme' : 'Email Verification & Password Recovery')
                  : (language === 'tr' ? 'Şifreli Oturum ve Rol Tabanlı Erişim' : 'Password-Protected Role-Based Access')}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 mt-4 bg-black/20 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); setSuccess(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'login' ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              {language === 'tr' ? 'Şifreyle Giriş' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setError(null); setSuccess(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'register' ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-100 hover:text-white'
              }`}
            >
              {language === 'tr' ? 'Yeni Şifreli Kayıt' : 'Register'}
            </button>
            {activeTab === 'forgot' && (
              <button
                type="button"
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 text-slate-900 shadow-sm font-bold"
              >
                {language === 'tr' ? '🔑 Şifre Sıfırla' : 'Reset'}
              </button>
            )}
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

          {/* ============================================================== */}
          {/* TAB 1: LOGIN FORM */}
          {/* ============================================================== */}
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    {language === 'tr' ? 'Hesap Şifresi' : 'Password'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setForgotStep('email');
                      setForgotEmail(email || '');
                      setError(null);
                      setSuccess(null);
                    }}
                    className="text-2xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer hover:underline"
                  >
                    {language === 'tr' ? 'Şifremi unuttum?' : 'Forgot password?'}
                  </button>
                </div>
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

          {/* ============================================================== */}
          {/* TAB 2: REGISTER FORM (with mandatory KVKK checkbox & view)     */}
          {/* ============================================================== */}
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

              {/* KVKK ONAY KUTUSU (MANDATORY CHECKBOX) */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <span className="text-2xs text-slate-700 leading-relaxed">
                    <span>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowKvkkModal(true);
                      }}
                      className="text-blue-700 font-bold underline hover:text-blue-900 transition-colors cursor-pointer inline-flex items-center gap-0.5"
                    >
                      <FileText className="w-3 h-3 inline" />
                      KVKK Aydınlatma Metni
                    </button>
                    <span>'ni okudum, anladım ve kişisel verilerimin bu kapsamda işlenmesini onaylıyorum. *</span>
                  </span>
                </label>
                
                {!kvkkAccepted && (
                  <p className="text-3xs text-amber-600 font-medium mt-1.5 flex items-center gap-1 pl-6">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    Kayıt butonunun aktif olması için lütfen yukarıdaki KVKK metnini onaylayınız.
                  </p>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-2xs text-blue-900 leading-relaxed">
                🛡️ <strong>Güvenlik İlkesi:</strong> Yeni kayıt olan kullanıcılar daima <strong>Öğrenci</strong> rolünü alır. Yönetici rolü yalnızca <strong>Ana Yönetici</strong> tarafından sistem üzerinden atanabilir.
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !kvkkAccepted}
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  kvkkAccepted && !isSubmitting
                    ? 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer shadow-blue-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <span>{isSubmitting ? 'Kaydediliyor...' : (language === 'tr' ? 'Şifreli Kaydı Tamamla' : 'Complete Registration')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PAROLAMI UNUTTUM & E-POSTA DOĞRULAMA (FORGOT PASSWORD)  */}
          {/* ============================================================== */}
          {activeTab === 'forgot' && (
            <div className="space-y-4">
              
              {/* FORGOT STEP 1: ENTER EMAIL */}
              {forgotStep === 'email' && (
                <form onSubmit={handleSendVerificationCode} className="space-y-4">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-2xs text-blue-800 leading-relaxed">
                    💡 Kayıtlı e-posta adresinizi giriniz. Sistem hesabınızı doğrulayacak ve size tek kullanımlık <strong>6 haneli güvenlik kodu</strong> gönderecektir.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'tr' ? 'Kayıtlı E-posta Adresiniz' : 'Registered Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="ogrenci@wordlabtr.edu.tr"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isSubmitting ? 'Kontrol Ediliyor...' : (language === 'tr' ? 'E-posta ile Doğrulama Kodu Gönder' : 'Send Verification Code')}</span>
                  </button>
                </form>
              )}

              {/* FORGOT STEP 2: VERIFY 6-DIGIT CODE */}
              {forgotStep === 'verify' && (
                <form onSubmit={handleVerifyCodeSubmit} className="space-y-4">
                  
                  {/* SIMULATED EMAIL INBOX PREVIEW BANNER */}
                  <div className="p-3.5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-left shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xs font-bold text-blue-900 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                        WordLab TR E-posta Doğrulama Servisi
                      </span>
                      <span className="text-3xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        📬 Gelen Kutusu
                      </span>
                    </div>
                    <p className="text-2xs text-slate-600 mb-2">
                      Alıcı: <strong className="text-slate-800 font-mono">{forgotEmail}</strong>
                    </p>
                    <div className="p-3 bg-white rounded-xl border border-blue-200 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-3xs font-semibold text-slate-400 block uppercase tracking-wider">
                          6 Haneli Güvenlik Kodunuz:
                        </span>
                        <span className="font-mono text-xl font-extrabold tracking-widest text-blue-700">
                          {verificationCode}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEnteredCode(verificationCode)}
                        className="text-2xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Kodu Doldur
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-3xs text-slate-500 mt-2">
                      <span>⏱️ Kod Geçerlilik Süresi:</span>
                      <span className={`font-mono font-bold ${codeCountdown < 30 ? 'text-red-600' : 'text-slate-700'}`}>
                        {Math.floor(codeCountdown / 60)}:{(codeCountdown % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">
                      {language === 'tr' ? 'E-postanıza Gelen 6 Haneli Kodu Giriniz' : 'Enter 6-Digit Code'}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••••"
                      className="w-full text-center font-mono text-2xl font-bold tracking-widest py-2.5 px-4 rounded-xl border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'tr' ? 'Kodu Doğrula ve Devam Et' : 'Verify Code & Proceed'}</span>
                  </button>

                  <div className="flex items-center justify-between text-2xs pt-1">
                    <button
                      type="button"
                      onClick={() => handleSendVerificationCode()}
                      disabled={codeCountdown > 120}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{language === 'tr' ? 'Yeni Kod Gönder' : 'Resend Code'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setForgotStep('email'); setError(null); }}
                      className="text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      {language === 'tr' ? 'Farklı E-posta Kullan' : 'Change Email'}
                    </button>
                  </div>
                </form>
              )}

              {/* FORGOT STEP 3: SET NEW PASSWORD */}
              {forgotStep === 'new_password' && (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-2xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>E-posta doğrulandı!</strong> Lütfen hesabınız için yeni ve güvenli bir şifre belirleyiniz.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'tr' ? 'Yeni Hesap Şifresi' : 'New Password'} *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="En az 6 karakter"
                        className="w-full pl-9 pr-10 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {language === 'tr' ? 'Yeni Şifre Tekrar' : 'Confirm New Password'} *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Şifreyi tekrar yazınız"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isSubmitting ? 'Güncelleniyor...' : (language === 'tr' ? 'Şifreyi Güncelle ve Giriş Yap' : 'Update & Log In')}</span>
                  </button>
                </form>
              )}

              {/* Back to Login link */}
              <div className="pt-2 text-center border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setError(null); setSuccess(null); }}
                  className="text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Giriş Ekranına Geri Dön' : 'Back to Login'}</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ============================================================== */}
      {/* KVKK AYDINLATMA METNİ MODAL (POPUP & READING MODAL)            */}
      {/* ============================================================== */}
      {showKvkkModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            
            {/* KVKK Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                  <FileText className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold">6698 Sayılı KVKK Aydınlatma Metni</h3>
                  <p className="text-2xs text-blue-200">WordLab TR Dijital Eğitim ve Değerlendirme Platformu</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowKvkkModal(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* KVKK Content Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium">
                Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) madde 10 uyarınca, WordLab TR platformu kullanıcılarının (&quot;Öğrenci ve Yöneticiler&quot;) kişisel verilerinin işlenmesine ilişkin bilgilendirilmesi amacıyla hazırlanmıştır.
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Veri Sorumlusu</h4>
                <p>
                  WordLab TR Eğitim Teknolojileri ve Akademik Değerlendirme Platformu Yönetimi, veri sorumlusu sıfatıyla kişisel verilerinizi işlemektedir.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. İşlenen Kişisel Veri Kategorileri</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Kimlik Bilgileri:</strong> Ad, Soyad, Öğrenci Numarası.</li>
                  <li><strong>İletişim Bilgileri:</strong> E-posta Adresi.</li>
                  <li><strong>İşlem ve Güvenlik Bilgileri:</strong> Şifrelenmiş parola verisi, oturum kayıtları, rol (Öğrenci/Yönetici) bilgisi.</li>
                  <li><strong>Akademik ve Değerlendirme Verileri:</strong> Sisteme yüklenen Microsoft Word (DOCX) belgeleri, OOXML teknik analiz çıktıları, rubrik puanları, haftalık müfredat ilerlemesi, deneme sınavı sonuçları ve geribildirimler.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Kişisel Verilerin İşlenme Amaçları</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Öğrenci hesabının oluşturulması, kimlik doğrulama ve güvenli oturum yönetimi,</li>
                  <li>14 haftalık Microsoft Word müfredatının sunulması ve etkileşimli içeriklerin takibi,</li>
                  <li>DOCX ödevlerinin OOXML motoru ile biçimsel analizi ve rubrik kriterlerine göre otomatik değerlendirilmesi,</li>
                  <li>Akademik gelişim raporları, sınav ve ödev istatistiklerinin ders yürütücüsü ve öğrenci paneline sunulması.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">4. Verilerin Aktarılması ve Güvenliği</h4>
                <p>
                  Kişisel verileriniz hiçbir surette ticari, reklam veya pazarlama amaçlı üçüncü şahıslara veya şirketlere aktarılmaz. Veriler yalnızca ders yürütücüsü akademisyenler ve sistem ana yöneticisi tarafından akademik değerlendirme amacıyla görüntülenebilir. Tüm veriler şifreli güvenli ortamlarda muhafaza edilmektedir.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">5. KVKK Madde 11 Kapsamındaki Haklarınız</h4>
                <p>
                  Kullanıcılar; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, amaca uygun kullanılıp kullanılmadığını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme ve silinmesini talep etme haklarına sahiptir.
                </p>
              </div>
            </div>

            {/* KVKK Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowKvkkModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Vazgeç / Kapat
              </button>

              <button
                type="button"
                onClick={() => {
                  setKvkkAccepted(true);
                  setShowKvkkModal(false);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Okudum, Anladım ve Kabul Ediyorum</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
