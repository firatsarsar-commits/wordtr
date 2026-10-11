import { Language } from './types';

export const translations = {
  tr: {
    // Brand & Header
    brandTitle: 'WordLab TR',
    brandSubtitle: 'Etkileşimli Word Öğrenme Platformu',
    brandBadge: 'Eğitimde Bilişim Teknolojileri',
    
    // Navigation
    navHome: 'Ana Sayfa',
    navCurriculum: 'Haftalık Dersler',
    navPracticeLab: 'Uygulama Laboratuvarı',
    navExams: 'Deneme Sınavları',
    navQuestionBank: 'Soru Bankası',
    navResources: 'Kaynaklar',
    navAbout: 'Hakkında',
    
    // Placeholders
    btnStudentDashboard: 'Öğrenci Paneli',
    btnAdminDashboard: 'Yönetim Paneli',
    placeholderModalTitle: 'Geliştirme Aşamasında',
    placeholderStudentDesc: 'Öğrenci Paneli kullanıcı yetkilendirme, kişisel not dökümü ve ödev geçmişi özellikleri bir sonraki Google Antigravity geliştirme döngüsünde entegre edilecektir.',
    placeholderAdminDesc: 'Yönetim Paneli eğitmen soru bankası yönetimi, sınıf analitiği ve öğrenci performansı izleme modülleri Google Antigravity üzerinde geliştirilmektedir.',
    btnClose: 'Kapat',
    
    // Common Actions
    btnStartLearning: 'Öğrenmeye Başla',
    btnTakeExam: 'Deneme Sınavına Gir',
    btnExploreCurriculum: '14 Haftalık Müfredatı İncele',
    btnPracticeAssignments: 'Uygulamaları Çöz',
    btnNext: 'İleri',
    btnPrev: 'Geri',
    btnSubmit: 'Gönder',
    btnReset: 'Sıfırla',
    btnCheck: 'Kontrol Et',
    btnShowHint: 'İpucu Göster',
    btnHideHint: 'İpucunu Gizle',
    btnDownloadReference: 'Örnek Belgeyi İndir (.docx)',
    btnDownloadStarter: 'Başlangıç Belgesini İndir (.docx)',
    btnUploadDocx: 'Ödevini Yükle (.docx)',
    btnReassess: 'Yeniden Değerlendir',
    btnTryAgain: 'Tekrar Dene',
    
    // Sections & Tabs
    tabWatch: 'İzle',
    tabLearn: 'Öğren',
    tabExplore: 'Keşfet',
    tabPractice: 'Pratik Yap',
    tabAssess: 'Değerlendir',
    tabReflect: 'Özet',
    
    // Status & Metadata
    week: 'Hafta',
    weeks: 'Hafta',
    difficulty: 'Zorluk',
    duration: 'Tahmini Süre',
    points: 'Puan',
    score: 'Skor',
    accuracy: 'Doğruluk',
    completed: 'Tamamlandı',
    inProgress: 'Devam Ediyor',
    notStarted: 'Başlanmadı',
    min: 'dakika',
    levelBeginner: 'Başlangıç',
    levelIntermediate: 'Orta Düzey',
    levelAdvanced: 'İleri Düzey',
    
    // Hero & Features
    heroTitle: 'Microsoft Word\'ü Keşfet, Uygula ve Öğren',
    heroDescription: 'Üniversite düzeyinde "Eğitimde Bilişim Teknolojileri" dersi için özel olarak tasarlanmış 14 haftalık etkileşimli müfredat, gerçek OOXML belge analizi, 50 soruluk deneme sınavı ve yapay zeka destekli rehberlik.',
    featureCurriculumTitle: '14 Haftalık Kapsamlı Müfredat',
    featureCurriculumDesc: 'Temel arayüzden akademik tez ve rapor formatlamaya kadar tüm haftalar kilit olmadan açıktır.',
    featureDocxTitle: 'Otomatik DOCX Belge Analizi',
    featureDocxDesc: 'Hazırladığınız Word belgelerini sisteme yükleyin; yazı tipi, hizalama, kenar boşlukları ve tabloları anında kural tabanlı değerlendirsin.',
    featureExamTitle: '50 Soruluk Deneme Sınavı',
    featureExamDesc: 'Tüm müfredatı kapsayan özgün çoktan seçmeli sorularla vize ve final sınavlarına eksiksiz hazırlanın.',
    featureAiTitle: 'WordLab AI Asistanı',
    featureAiDesc: 'Microsoft Word adımları, formülleri ve biçimlendirme sorunlarında anında pedagojik ipuçları sunan akıllı yardımcı.',
    
    // DOCX Assessment
    assessmentTitle: 'Otomatik Belge Değerlendirme Raporu',
    assessmentSuccessRate: 'Başarı Oranı',
    assessmentPassed: 'Başarılı Kriterler',
    assessmentFailed: 'Geliştirilmesi Gerekenler',
    assessmentScoreBreakdown: 'Kriter Bazlı Puan Dağılımı',
    assessmentStrengths: 'Güçlü Yönler',
    assessmentSuggestions: 'İyileştirme Önerileri',
    assessmentUploadNotice: 'Yalnızca geçerli .docx dosyaları kabul edilir (maksimum 15 MB). Dosyanız doğrudan taranır ve makro çalıştırılmaz.',
    assessmentUploading: 'Belge OOXML yapısı analiz ediliyor...',
    assessmentDropPrompt: 'Word (.docx) belgenizi buraya sürükleyin veya seçmek için tıklayın',
    
    // Exams
    examTitle: 'Deneme Sınavı ve Sınava Hazırlık Merkezi',
    examSubtitle: 'Bilişim Teknolojileri dersi için 50 soruluk kapsamlı deneme ve konu bazlı testler.',
    examModeComprehensive: 'Kapsamlı 50 Soruluk Deneme Sınavı',
    examModeTopic: 'Haftalık / Konu Bazlı Alıştırma',
    examModeQuick: 'Hızlı Test (15 Soru)',
    examTimeRemaining: 'Kalan Süre',
    examQuestionNav: 'Soru Haritası',
    examSubmitConfirm: 'Sınavı bitirmek ve değerlendirmeyi görmek istediğinize emin misiniz?',
    examResultsTitle: 'Sınav Sonuç Raporu',
    examCongratulations: 'Tebrikler, sınavı başarıyla tamamladınız!',
    examReviewQuestions: 'Soruları ve Açıklamaları İncele',
    
    // Question Bank
    bankTitle: 'Soru Bankası Yönetim Arayüzü',
    bankSubtitle: 'Öğretim elemanı ve öğrenci için soru inceleme ve yerel ekleme/düzenleme alanı.',
    bankNotice: 'Bu arayüzdeki değişiklikler tarayıcınızın yerel depolama alanında tutulur. Kalıcı merkezi veritabanı yönetimi Google Antigravity entegrasyonuyla sunulacaktır.',
    bankAddQuestion: 'Yeni Soru Ekle',
    bankSearchPlaceholder: 'Soru metni veya konuda ara...',
    bankFilterWeek: 'Hafta Seç',
    bankFilterDifficulty: 'Zorluk Seç',
    bankAllWeeks: 'Tüm Haftalar',
    bankAllDifficulties: 'Tüm Zorluklar',
    bankResetDefault: 'Varsayılan Soru Bankasına Dön',
    
    // AI Assistant
    assistantName: 'WordLab AI Asistan',
    assistantRole: 'Microsoft Word Öğrenme Koçu',
    assistantGreeting: 'Merhaba! Ben WordLab AI Asistan. Microsoft Word öğrenme yolculuğunuzda adımlar, biçimlendirme kuralları ve ödev hazırlama konularında size yardımcı olabilirim. Nasıl yardımcı olabilirim?',
    assistantInputPlaceholder: 'Word ile ilgili bir soru sorun... (Örn: Otomatik içindekiler nasıl eklenir?)',
    assistantContextNotice: 'Aktif ders konusu:',
    assistantConfigError: 'Google Gemini API yapılandırması henüz tamamlanmadı veya anahtar tanımlanmadı. Lütfen sistem yöneticisiyle iletişime geçin.',
    
    // Progress
    progressTitle: 'Öğrenme İlerlemeniz',
    progressCompletedLessons: 'Tamamlanan Dersler',
    progressPracticedAssignments: 'Değerlendirilen Ödevler',
    progressExamAttempts: 'Sınav Denemeleri',
    progressOverallPercent: 'Genel İlerleme',
  },
  en: {
    // Brand & Header
    brandTitle: 'WordLab TR',
    brandSubtitle: 'Interactive Word Learning Platform',
    brandBadge: 'Information Technologies in Education',
    
    // Navigation
    navHome: 'Home',
    navCurriculum: 'Weekly Lessons',
    navPracticeLab: 'Practice Lab',
    navExams: 'Practice Exams',
    navQuestionBank: 'Question Bank',
    navResources: 'Resources',
    navAbout: 'About',
    
    // Placeholders
    btnStudentDashboard: 'Student Dashboard',
    btnAdminDashboard: 'Admin Dashboard',
    placeholderModalTitle: 'Under Development',
    placeholderStudentDesc: 'The Student Dashboard features including authentication, individual transcript, and assignment history will be integrated in the upcoming Google Antigravity development sprint.',
    placeholderAdminDesc: 'The Administration Dashboard including question bank management, classroom analytics, and student performance tracking is being developed on Google Antigravity.',
    btnClose: 'Close',
    
    // Common Actions
    btnStartLearning: 'Start Learning',
    btnTakeExam: 'Take Practice Exam',
    btnExploreCurriculum: 'Explore 14-Week Curriculum',
    btnPracticeAssignments: 'Solve Assignments',
    btnNext: 'Next',
    btnPrev: 'Previous',
    btnSubmit: 'Submit',
    btnReset: 'Reset',
    btnCheck: 'Check Answer',
    btnShowHint: 'Show Hint',
    btnHideHint: 'Hide Hint',
    btnDownloadReference: 'Download Reference (.docx)',
    btnDownloadStarter: 'Download Starter (.docx)',
    btnUploadDocx: 'Upload Assignment (.docx)',
    btnReassess: 'Re-assess Document',
    btnTryAgain: 'Try Again',
    
    // Sections & Tabs
    tabWatch: 'Watch',
    tabLearn: 'Learn',
    tabExplore: 'Explore',
    tabPractice: 'Practice',
    tabAssess: 'Assess',
    tabReflect: 'Reflect',
    
    // Status & Metadata
    week: 'Week',
    weeks: 'Weeks',
    difficulty: 'Difficulty',
    duration: 'Est. Time',
    points: 'Points',
    score: 'Score',
    accuracy: 'Accuracy',
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    min: 'mins',
    levelBeginner: 'Beginner',
    levelIntermediate: 'Intermediate',
    levelAdvanced: 'Advanced',
    
    // Hero & Features
    heroTitle: 'Discover, Practice, and Master Microsoft Word',
    heroDescription: 'An interactive 14-week curriculum designed for university students taking "Information Technologies in Education", featuring authentic OOXML document analysis, a 50-question practice exam, and AI educational guidance.',
    featureCurriculumTitle: 'Comprehensive 14-Week Curriculum',
    featureCurriculumDesc: 'From basic interface to thesis and academic report styling, all weeks are accessible from day one without artificial locks.',
    featureDocxTitle: 'Automated DOCX Document Analysis',
    featureDocxDesc: 'Upload your Word documents; deterministic rules inspect font families, alignments, page margins, and tables instantly.',
    featureExamTitle: '50-Question Practice Exam',
    featureExamDesc: 'Prepare thoroughly for midterm and final exams with original multiple-choice questions covering all weekly modules.',
    featureAiTitle: 'WordLab AI Assistant',
    featureAiDesc: 'Your intelligent pedagogical companion offering step-by-step guidance, menu navigation tips, and scaffolded hints.',
    
    // DOCX Assessment
    assessmentTitle: 'Automated Document Assessment Report',
    assessmentSuccessRate: 'Achievement Rate',
    assessmentPassed: 'Met Criteria',
    assessmentFailed: 'Needs Improvement',
    assessmentScoreBreakdown: 'Criterion Point Breakdown',
    assessmentStrengths: 'Document Strengths',
    assessmentSuggestions: 'Actionable Suggestions',
    assessmentUploadNotice: 'Only valid .docx files are accepted (max 15 MB). Documents are parsed directly; macros are never executed.',
    assessmentUploading: 'Analyzing OOXML document structure...',
    assessmentDropPrompt: 'Drag and drop your Word (.docx) file here or click to browse',
    
    // Exams
    examTitle: 'Practice Examination Center',
    examSubtitle: 'Comprehensive 50-question mock exam and topic-specific preparation for university courses.',
    examModeComprehensive: 'Comprehensive 50-Question Exam',
    examModeTopic: 'Weekly / Topic-Specific Practice',
    examModeQuick: 'Quick Quiz (15 Questions)',
    examTimeRemaining: 'Time Remaining',
    examQuestionNav: 'Question Navigator',
    examSubmitConfirm: 'Are you sure you want to finish the exam and view your evaluation?',
    examResultsTitle: 'Examination Score Report',
    examCongratulations: 'Congratulations, you have completed the examination!',
    examReviewQuestions: 'Review Questions & Explanations',
    
    // Question Bank
    bankTitle: 'Question Bank Editor Interface',
    bankSubtitle: 'Review, create, and edit practice questions locally for students and instructors.',
    bankNotice: 'Edits in this preview are preserved in your browser local storage. Central multi-user database administration will be provided in Google Antigravity.',
    bankAddQuestion: 'Add New Question',
    bankSearchPlaceholder: 'Search question text or topic...',
    bankFilterWeek: 'Select Week',
    bankFilterDifficulty: 'Select Difficulty',
    bankAllWeeks: 'All Weeks',
    bankAllDifficulties: 'All Difficulties',
    bankResetDefault: 'Reset to Default Bank',
    
    // AI Assistant
    assistantName: 'WordLab AI Assistant',
    assistantRole: 'Microsoft Word Learning Coach',
    assistantGreeting: 'Hello! I am your WordLab AI Assistant. I am here to guide you with Microsoft Word procedures, formatting standards, and course assignments. How can I help you today?',
    assistantInputPlaceholder: 'Ask a Word question... (e.g. How to insert an automatic table of contents?)',
    assistantContextNotice: 'Active lesson topic:',
    assistantConfigError: 'Google Gemini API configuration is not active or missing API key. Please check your setup.',
    
    // Progress
    progressTitle: 'Your Learning Progress',
    progressCompletedLessons: 'Completed Lessons',
    progressPracticedAssignments: 'Evaluated Assignments',
    progressExamAttempts: 'Exam Attempts',
    progressOverallPercent: 'Overall Progress',
  }
};

export function getTranslation(lang: Language, key: keyof typeof translations['tr']): string {
  return translations[lang]?.[key] || translations['tr'][key] || key;
}
