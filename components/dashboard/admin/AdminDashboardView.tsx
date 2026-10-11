'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/common/LanguageContext';
import { useCurriculum } from '@/hooks/useCurriculum';
import { parseVideoUrl } from '@/lib/video-utils';
import { 
  getAllProfiles, 
  getCourseGroups, 
  addCourseGroup, 
  removeStudentProfile,
  getAllSubmissions, 
  overrideSubmissionScore, 
  getAllExamAttempts, 
  getCurriculumOverrides, 
  saveCurriculumWeekOverride, 
  resetCurriculumWeekOverride,
  getAllQuestions, 
  saveQuestion, 
  deleteQuestion, 
  getAllExaminations, 
  saveExamination, 
  toggleExamStatus,
  getStudentProgress 
} from '@/lib/db/store';
import { 
  UserProfile, 
  CourseGroup, 
  SubmissionRecord, 
  ExamAttemptRecord, 
  CurriculumWeekOverride, 
  CustomExamConfig 
} from '@/lib/db/types';
import { 
  ExamQuestion, 
  WeekCurriculum, 
  PracticalAssignment, 
  AssignmentRubricItem, 
  LearningObjective, 
  VideoResource,
  InteractiveActivity 
} from '@/lib/types';
import { 
  Users, 
  BookOpen, 
  FileCheck2, 
  GraduationCap, 
  BarChart3, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Save, 
  Layers, 
  Settings, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Award, 
  FolderPlus,
  RefreshCw,
  FileSpreadsheet,
  UserCheck,
  UserX,
  Lock,
  Video,
  Sparkles,
  HelpCircle,
  FileText,
  RotateCcw,
  Loader2
} from 'lucide-react';

export function AdminDashboardView() {
  const { currentUser, isMainAdmin, assignUserRole, allProfiles, refreshProfiles } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'curriculum' | 'assignments' | 'questions' | 'reports'>('overview');

  // Sub-tab / Modal / Drawer states
  const [selectedStudent, setSelectedStudent] = useState<UserProfile | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentGroupFilter, setStudentGroupFilter] = useState<string>('all');
  const [newGroupModalOpen, setNewGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCode, setNewGroupCode] = useState('');
  const [roleChangeNotice, setRoleChangeNotice] = useState<string | null>(null);

  // Curriculum Editor States
  const { curriculum, refreshCurriculum } = useCurriculum();
  const [editorWeekNum, setEditorWeekNum] = useState<number>(1);
  const selectedCurriculumWeek = useMemo(() => {
    return curriculum.find((w) => w.weekNumber === editorWeekNum) || curriculum[0];
  }, [curriculum, editorWeekNum]);

  const [editTitleTr, setEditTitleTr] = useState('');
  const [editTitleEn, setEditTitleEn] = useState('');
  const [editIntroTr, setEditIntroTr] = useState('');
  const [editSummaryTr, setEditSummaryTr] = useState('');

  // Editable sub-components linked to this week
  const [editObjectives, setEditObjectives] = useState<LearningObjective[]>([]);
  const [editVideos, setEditVideos] = useState<VideoResource[]>([]);
  const [editActivities, setEditActivities] = useState<InteractiveActivity[]>([]);
  const [editAssignments, setEditAssignments] = useState<PracticalAssignment[]>([]);
  const [activeComponentTab, setActiveComponentTab] = useState<'objectives' | 'videos' | 'activities' | 'assignments'>('objectives');
  const [curriculumSaveMessage, setCurriculumSaveMessage] = useState<string | null>(null);

  // Sync state whenever selected week changes or curriculum is updated
  useEffect(() => {
    const target = curriculum.find((w) => w.weekNumber === editorWeekNum) || curriculum[0];
    if (target) {
      setEditTitleTr(target.titleTr);
      setEditTitleEn(target.titleEn);
      setEditIntroTr(target.introductionTr);
      setEditSummaryTr(target.summaryTr);
      setEditObjectives(target.objectives || []);
      setEditVideos(target.videos || []);
      setEditActivities(target.activities || []);
      setEditAssignments(target.assignments || []);
    }
  }, [editorWeekNum, curriculum]);

  // Select week in editor
  const handleSelectEditorWeek = (wNum: number) => {
    setEditorWeekNum(wNum);
    setCurriculumSaveMessage(null);
  };

  // Auto-fetch video title, channel, duration from YouTube
  const [fetchingVideoIdx, setFetchingVideoIdx] = useState<number | null>(null);
  const [videoAutoFetchStatus, setVideoAutoFetchStatus] = useState<{ idx: number; message: string; success: boolean } | null>(null);

  const handleAutoFetchVideoMetadata = async (idx: number, inputUrl?: string) => {
    const targetUrl = (inputUrl !== undefined ? inputUrl : editVideos[idx]?.url) || '';
    if (!targetUrl.trim()) return;

    setFetchingVideoIdx(idx);
    setVideoAutoFetchStatus(null);

    try {
      const res = await fetch(`/api/video-info?url=${encodeURIComponent(targetUrl.trim())}`);
      const data = await res.json();

      if (data.success) {
        setEditVideos((prev) => {
          const updated = [...prev];
          if (updated[idx]) {
            updated[idx] = {
              ...updated[idx],
              titleTr: data.title || updated[idx].titleTr,
              channel: data.channel || updated[idx].channel,
              duration: data.duration || updated[idx].duration || '10:00',
              youtubeId: data.youtubeId || updated[idx].youtubeId,
              url: targetUrl.trim(),
              isVerified: true,
            };
          }
          return updated;
        });

        setVideoAutoFetchStatus({
          idx,
          message: `"${data.title}" başlıklı video bilgileri YouTube'dan başarıyla aktarıldı! (${data.duration})`,
          success: true,
        });
      } else {
        setVideoAutoFetchStatus({
          idx,
          message: data.error || 'Video bilgileri alınamadı.',
          success: false,
        });
      }
    } catch {
      setVideoAutoFetchStatus({
        idx,
        message: 'Video sunucusuna bağlanırken hata oluştu.',
        success: false,
      });
    } finally {
      setFetchingVideoIdx(null);
      setTimeout(() => {
        setVideoAutoFetchStatus(null);
      }, 5000);
    }
  };

  // Assignment Management States
  const allSubmissions = useMemo(() => getAllSubmissions(), []);
  const [overrideModal, setOverrideModal] = useState<{
    isOpen: boolean;
    submission: SubmissionRecord | null;
    newScore: number;
    notes: string;
  }>({ isOpen: false, submission: null, newScore: 0, notes: '' });

  // Question Bank States
  const [allQuestionsList, setAllQuestionsList] = useState<ExamQuestion[]>(() => getAllQuestions());
  const [questionSearch, setQuestionSearch] = useState('');
  const [questionWeekFilter, setQuestionWeekFilter] = useState<number | 'all'>('all');

  // Custom Exam Creation States
  const [newExamModalOpen, setNewExamModalOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newExamCount, setNewExamCount] = useState(25);
  const [newExamTime, setNewExamTime] = useState(30);

  // Data
  const profiles = useMemo(() => getAllProfiles(), [allProfiles]);
  const courseGroups = useMemo(() => getCourseGroups(), []);
  const students = useMemo(() => profiles.filter((p) => p.role === 'student'), [profiles]);
  const examAttempts = useMemo(() => getAllExamAttempts(), []);
  const examinations = useMemo(() => getAllExaminations(), []);

  // Filtered Users for the user management table
  const filteredUsers = profiles.filter((u) => {
    if (studentGroupFilter !== 'all' && u.courseGroupId !== studentGroupFilter) return false;
    if (studentSearch) {
      const q = studentSearch.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.studentNumber && u.studentNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Role Assignment by Main Admin
  const handleRoleToggle = (targetUser: UserProfile) => {
    if (!isMainAdmin) {
      alert('Yalnızca Ana Yönetici rol atayabilir.');
      return;
    }

    if (targetUser.isMainAdmin) {
      alert('Ana yönetici hesabı korumalıdır; rolü değiştirilemez.');
      return;
    }

    const nextRole = targetUser.role === 'admin' ? 'student' : 'admin';
    const confirmMsg = nextRole === 'admin'
      ? `"${targetUser.fullName}" kullanıcısına YÖNETİCİ rolü atamak istediğinizden emin misiniz? Bu kullanıcı tüm yönetim paneline erişebilecektir.`
      : `"${targetUser.fullName}" kullanıcısının yönetici yetkisini kaldırıp ÖĞRENCİ rolüne döndürmek istediğinizden emin misiniz?`;

    if (!window.confirm(confirmMsg)) return;

    const res = assignUserRole(targetUser.id, nextRole);
    if (res.success) {
      setRoleChangeNotice(
        `"${targetUser.fullName}" kullanıcısının rolü başarıyla "${nextRole === 'admin' ? 'YÖNETİCİ' : 'ÖĞRENCİ'}" olarak güncellendi.`
      );
      setTimeout(() => setRoleChangeNotice(null), 4000);
      refreshProfiles();
    } else {
      alert(res.error || 'Rol güncellenirken bir sorun oluştu.');
    }
  };

  // Save Curriculum Changes including sub-components
  const handleSaveCurriculum = () => {
    saveCurriculumWeekOverride({
      weekNumber: editorWeekNum,
      titleTr: editTitleTr,
      titleEn: editTitleEn,
      taglineTr: selectedCurriculumWeek.taglineTr,
      taglineEn: selectedCurriculumWeek.taglineEn,
      introductionTr: editIntroTr,
      introductionEn: selectedCurriculumWeek.introductionEn,
      summaryTr: editSummaryTr,
      summaryEn: selectedCurriculumWeek.summaryEn,
      objectives: editObjectives,
      videos: editVideos,
      writtenGuides: selectedCurriculumWeek.writtenGuides,
      activities: editActivities,
      preparationQuestionsTr: selectedCurriculumWeek.preparationQuestionsTr,
      preparationQuestionsEn: selectedCurriculumWeek.preparationQuestionsEn,
      assignments: editAssignments,
      updatedAt: new Date().toISOString(),
    });

    refreshCurriculum();

    setCurriculumSaveMessage(
      language === 'tr' 
        ? `${editorWeekNum}. Hafta ve bağlı tüm bileşenleri (hedefler, videolar, alıştırmalar, ödevler) başarıyla kaydedildi!` 
        : `Week ${editorWeekNum} and all its components saved persistently!`
    );
    setTimeout(() => setCurriculumSaveMessage(null), 4000);
  };

  // Revert this week to default curriculum
  const handleResetCurriculum = () => {
    if (!window.confirm(`${editorWeekNum}. Hafta değişikliklerini sıfırlayıp orijinal müfredat içeriğine döndürmek istediğinizden emin misiniz?`)) {
      return;
    }
    resetCurriculumWeekOverride(editorWeekNum);
    refreshCurriculum();
    setCurriculumSaveMessage(
      language === 'tr' 
        ? `${editorWeekNum}. Hafta orijinal müfredat içeriğine sıfırlandı.` 
        : `Week ${editorWeekNum} reset to original curriculum.`
    );
    setTimeout(() => setCurriculumSaveMessage(null), 4000);
  };

  // Sub-component Helper Actions
  const handleAddObjective = () => {
    setEditObjectives([
      ...editObjectives,
      {
        id: `obj-${Date.now()}`,
        textTr: 'Yeni Word biçimlendirme hedefi...',
        textEn: 'New formatting learning objective...',
      },
    ]);
  };

  const handleRemoveObjective = (index: number) => {
    setEditObjectives(editObjectives.filter((_, i) => i !== index));
  };

  const handleAddVideo = () => {
    setEditVideos([
      ...editVideos,
      {
        id: `vid-${Date.now()}`,
        titleTr: 'Yeni Eğitim Videosu',
        titleEn: 'New Tutorial Video',
        channel: 'WordLab Akademi',
        url: '',
        youtubeId: '',
        duration: '10:00',
        isVerified: false,
        notesTr: '',
        notesEn: '',
      },
    ]);
  };

  const handleRemoveVideo = (index: number) => {
    setEditVideos(editVideos.filter((_, i) => i !== index));
  };

  const handleAddActivity = () => {
    setEditActivities([
      ...editActivities,
      {
        id: `act-${Date.now()}`,
        type: 'formatting_choice',
        titleTr: 'Yeni Etkileşimli Alıştırma',
        titleEn: 'New Interactive Activity',
        descriptionTr: 'Yönergeyi dikkatlice okuyup doğru seçeneği işaretleyin.',
        descriptionEn: 'Follow instructions and pick the correct option.',
        hintTr: 'Şerit menüsündeki Giriş sekmesine bakın.',
        hintEn: 'Check the Home tab on ribbon.',
        explanationTr: 'Doğru işlem adımı Word standardına uygundur.',
        explanationEn: 'Correct step matches standard.',
      },
    ]);
  };

  const handleRemoveActivity = (index: number) => {
    setEditActivities(editActivities.filter((_, i) => i !== index));
  };

  const handleAddAssignment = () => {
    setEditAssignments([
      ...editAssignments,
      {
        id: `w${editorWeekNum}-a${editAssignments.length + 1}`,
        weekNumber: editorWeekNum,
        assignmentNumber: editAssignments.length + 1,
        titleTr: `${editorWeekNum}. Hafta Pratik Uygulama Ödevi`,
        titleEn: `Week ${editorWeekNum} Practical Assignment`,
        difficulty: 'intermediate',
        estimatedMinutes: 30,
        objectivesTr: ['Belgeyi standartlara uygun biçimlendirin.'],
        objectivesEn: ['Format document according to guidelines.'],
        instructionsTr: ['DOCX dosyasını hazırlayıp sisteme yükleyin.'],
        instructionsEn: ['Prepare DOCX and submit to system.'],
        rubric: [
          {
            id: `r-${Date.now()}`,
            category: 'font',
            titleTr: 'Yazı Tipi ve Boyutu',
            titleEn: 'Font & Size',
            points: 50,
            expectedDescriptionTr: 'Times New Roman 12 pt kuralı',
            expectedDescriptionEn: 'Times New Roman 12 pt rule',
            checkFn: 'check_font',
          },
          {
            id: `r-${Date.now() + 1}`,
            category: 'paragraph',
            titleTr: 'Paragraf Düzeni',
            titleEn: 'Paragraph Layout',
            points: 50,
            expectedDescriptionTr: 'İki yana yaslama ve 1.5 satır aralığı',
            expectedDescriptionEn: 'Justified with 1.5 spacing',
            checkFn: 'check_paragraph',
          },
        ],
        referenceDocName: `Hafta${editorWeekNum}_Odev.docx`,
      },
    ]);
  };

  const handleRemoveAssignment = (index: number) => {
    setEditAssignments(editAssignments.filter((_, i) => i !== index));
  };

  // Handle Score Override Submit
  const handleScoreOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!overrideModal.submission) return;
    overrideSubmissionScore(
      overrideModal.submission.id,
      overrideModal.newScore,
      overrideModal.notes
    );
    setOverrideModal({ isOpen: false, submission: null, newScore: 0, notes: '' });
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Öğrenci No', 'Ad Soyad', 'Rol', 'E-posta', 'Şube', 'Teslim Edilen Ödevler', 'Ortalama Ödev Puanı', 'Sınav Denemeleri', 'Sınav Ortalaması'];
    const rows = profiles.map((s) => {
      const subs = allSubmissions.filter((sub) => sub.studentId === s.id);
      const ex = examAttempts.filter((att) => att.studentId === s.id);
      const subScore = subs.length > 0
        ? Math.round(subs.reduce((a, b) => a + (b.instructorOverrideScore ?? b.score), 0) / subs.length)
        : 0;
      const exScore = ex.length > 0 ? Math.round(ex.reduce((a, b) => a + b.score, 0) / ex.length) : 0;
      return [
        s.studentNumber || '-',
        `"${s.fullName}"`,
        s.role,
        s.email,
        `"${s.courseGroupName || '-'}"`,
        subs.length,
        subScore,
        ex.length,
        exScore,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `WordLabTR_Kullanici_Raporu_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Authorization Guard
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Yönetici Girişi Gereklidir</h2>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Yönetim Paneline erişebilmek için lütfen Ana Yönetici hesabınızla veya yönetici yetkisi verilmiş bir hesapla giriş yapınız.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ADMIN HEADER BANNER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-700 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {currentUser.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                    {isMainAdmin ? 'Ana Yönetici (Süpervizör)' : 'Eğitmen & Yönetici'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">WordLab TR Ders Yönetim Portalı</span>
                  <span>·</span>
                  <span>{currentUser.courseGroupName || 'Tüm Şubeler'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportCSV}
                className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>{language === 'tr' ? 'Tüm Raporu İndir (CSV)' : 'Export CSV'}</span>
              </button>
            </div>

          </div>

          {/* ADMIN TABS NAVIGATION */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{language === 'tr' ? 'Genel Bakış' : 'Overview'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{language === 'tr' ? 'Kullanıcı & Rol Yönetimi' : 'Users & Roles'}</span>
              <span className={`text-2xs px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'students' ? 'bg-white text-purple-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {profiles.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'tr' ? 'Müfredat & Bileşen Editörü' : 'Curriculum Editor'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('assignments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'assignments'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{language === 'tr' ? 'Ödevler & Not Girişi' : 'Grading & Overrides'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'tr' ? 'Soru Bankası & Sınavlar' : 'Questions & Exams'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{language === 'tr' ? 'Raporlar & Analiz' : 'Reports & Analytics'}</span>
            </button>
          </div>

        </div>

        {/* ROLE CHANGE NOTICE BANNER */}
        {roleChangeNotice && (
          <div className="mb-6 p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
              <span className="font-semibold">{roleChangeNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setRoleChangeNotice(null)}
              className="p-1 text-purple-500 hover:text-purple-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 1: ADMIN OVERVIEW */}
        {/* ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Kayıtlı Öğrenciler
                </span>
                <span className="text-3xl font-extrabold text-slate-900 block">{students.length}</span>
                <p className="text-2xs text-slate-500 mt-2">{courseGroups.length} aktif şube</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Toplam Ödev Teslimi
                </span>
                <span className="text-3xl font-extrabold text-slate-900 block">{allSubmissions.length}</span>
                <p className="text-2xs text-slate-500 mt-2">DOCX değerlendirmeleri aktif</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Sınav Katılımı
                </span>
                <span className="text-3xl font-extrabold text-slate-900 block">{examAttempts.length}</span>
                <p className="text-2xs text-slate-500 mt-2">Deneme sınavları</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">
                  Soru Havuzu
                </span>
                <span className="text-3xl font-extrabold text-slate-900 block">{allQuestionsList.length}</span>
                <p className="text-2xs text-slate-500 mt-2">14 haftalık soru bankası</p>
              </div>
            </div>

            {/* Quick Policy Reminder */}
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Rol Yetkilendirme Kuralı</span>
                <p className="text-indigo-900 text-2xs leading-relaxed">
                  Sisteme yeni kaydolan her kullanıcı şifresiyle sadece <strong>Öğrenci</strong> rolü alabilir. 
                  Yalnızca Ana Yönetici, &quot;Kullanıcı &amp; Rol Yönetimi&quot; sekmesinden seçtiği kişileri <strong>Yönetici</strong> rolüne yükseltebilir veya yetkilerini geri alabilir.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: USER & ROLE MANAGEMENT (ANA ADMIN ROL ATAMA) */}
        {/* ==================================================================== */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="İsim, numara veya e-posta..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
                  />
                </div>

                <select
                  value={studentGroupFilter}
                  onChange={(e) => setStudentGroupFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="all">Tüm Şubeler</option>
                  {courseGroups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{filteredUsers.length} Toplam Kullanıcı</span>
              </div>
            </div>

            {/* Users Table with Role Assignment */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-2xs font-bold uppercase text-slate-500">
                      <th className="py-3 px-5">Kullanıcı Bilgisi</th>
                      <th className="py-3 px-4">Şube / Görev</th>
                      <th className="py-3 px-4">Mevcut Rol</th>
                      <th className="py-3 px-4">Ödev &amp; Sınav</th>
                      <th className="py-3 px-5 text-right">Rol Atama &amp; İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredUsers.map((u) => {
                      const uSubs = allSubmissions.filter((s) => s.studentId === u.id);
                      const uExams = examAttempts.filter((e) => e.studentId === u.id);
                      const isAdminRole = u.role === 'admin';
                      const isMain = u.isMainAdmin || u.email === 'admin@wordlabtr.edu.tr';

                      return (
                        <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg text-white font-bold flex items-center justify-center text-xs shrink-0 ${
                                isAdminRole ? 'bg-purple-600' : 'bg-blue-600'
                              }`}>
                                {u.fullName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">{u.fullName}</span>
                                <span className="text-2xs text-slate-500">
                                  {u.studentNumber ? `No: ${u.studentNumber} · ` : ''}{u.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600">
                            {u.courseGroupName || 'Genel Şube'}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-2xs font-extrabold inline-flex items-center gap-1 ${
                              isAdminRole 
                                ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {isAdminRole ? <ShieldCheck className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
                              <span>{isAdminRole ? 'YÖNETİCİ' : 'ÖĞRENCİ'}</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-slate-600">
                            {uSubs.length} Ödev · {uExams.length} Sınav
                          </td>

                          <td className="py-3.5 px-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Main Admin Role Toggle Button */}
                              {isMainAdmin ? (
                                isMain ? (
                                  <span className="text-2xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                                    Ana Yönetici
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleRoleToggle(u)}
                                    className={`px-3 py-1 text-2xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                                      isAdminRole
                                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                    }`}
                                  >
                                    {isAdminRole ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                                    <span>{isAdminRole ? 'Öğrenciye Çevir' : 'Yönetici Rolü Ata'}</span>
                                  </button>
                                )
                              ) : (
                                <span className="text-2xs text-slate-400 italic">
                                  Yetki yok
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() => setSelectedStudent(u)}
                                className="px-2.5 py-1 text-2xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                              >
                                Detay
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: CURRICULUM MANAGEMENT & EDITABLE SUB-COMPONENTS */}
        {/* ==================================================================== */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Week Selector Sidebar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs h-fit space-y-2">
              <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
                14 Hafta Seçimi
              </span>
              <div className="space-y-1">
                {curriculum.map((w) => {
                  const isSelected = editorWeekNum === w.weekNumber;
                  return (
                    <button
                      key={w.weekNumber}
                      type="button"
                      onClick={() => handleSelectEditorWeek(w.weekNumber)}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-purple-700 text-white font-bold shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{w.weekNumber}. Hafta: {w.titleTr.substring(0, 20)}...</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Editor Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editorWeekNum}. Hafta Müfredat &amp; Bileşen Editörü
                  </h3>
                  <p className="text-xs text-slate-500">
                    Haftalık metinleri ve bağlı bileşenleri (hedefler, videolar, alıştırmalar, ödevler) düzenleyin.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetCurriculum}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Bu haftayı varsayılan müfredat içeriğine sıfırla"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Orijinale Dön</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCurriculum}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Değişiklikleri Kaydet</span>
                  </button>
                </div>
              </div>

              {curriculumSaveMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{curriculumSaveMessage}</span>
                </div>
              )}

              {/* Basic Week Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hafta Başlığı (Türkçe)
                  </label>
                  <input
                    type="text"
                    value={editTitleTr}
                    onChange={(e) => setEditTitleTr(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hafta Başlığı (İngilizce - EN)
                  </label>
                  <input
                    type="text"
                    value={editTitleEn}
                    onChange={(e) => setEditTitleEn(e.target.value)}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Haftalık Giriş ve Açıklama Metni (Türkçe)
                </label>
                <textarea
                  rows={3}
                  value={editIntroTr}
                  onChange={(e) => setEditIntroTr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Haftalık Özet ve Anahtar Kazanımlar (Türkçe)
                </label>
                <textarea
                  rows={2}
                  value={editSummaryTr}
                  onChange={(e) => setEditSummaryTr(e.target.value)}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* ============================================================= */}
              {/* EDITABLE SUB-COMPONENTS SECTION (BU HAFTAYA BAĞLI BİLEŞENLER) */}
              {/* ============================================================= */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-700" />
                      <span>Bu Haftaya Bağlı Bileşenleri Düzenle</span>
                    </h4>
                    <p className="text-2xs text-slate-500">
                      Öğrenme hedefleri, eğitim videoları, alıştırmalar ve ödevleri düzenleyip ekleyin veya çıkarın.
                    </p>
                  </div>

                  {/* Sub-component Tabs */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setActiveComponentTab('objectives')}
                      className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-all cursor-pointer ${
                        activeComponentTab === 'objectives'
                          ? 'bg-white text-purple-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Hedefler ({editObjectives.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveComponentTab('videos')}
                      className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-all cursor-pointer ${
                        activeComponentTab === 'videos'
                          ? 'bg-white text-purple-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Videolar ({editVideos.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveComponentTab('activities')}
                      className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-all cursor-pointer ${
                        activeComponentTab === 'activities'
                          ? 'bg-white text-purple-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Alıştırmalar ({editActivities.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveComponentTab('assignments')}
                      className={`px-2.5 py-1 rounded-lg text-2xs font-bold transition-all cursor-pointer ${
                        activeComponentTab === 'assignments'
                          ? 'bg-white text-purple-800 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Ödevler ({editAssignments.length})
                    </button>
                  </div>
                </div>

                {/* 1. OBJECTIVES TAB */}
                {activeComponentTab === 'objectives' && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Öğrenme Hedefleri Listesi</span>
                      <button
                        type="button"
                        onClick={handleAddObjective}
                        className="px-2.5 py-1 bg-purple-700 text-white rounded-lg text-2xs font-bold flex items-center gap-1 hover:bg-purple-800 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Yeni Hedef Ekle</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {editObjectives.map((obj, idx) => (
                        <div key={obj.id || idx} className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-2xs font-bold flex items-center justify-center shrink-0 mt-1">
                            {idx + 1}
                          </span>
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={obj.textTr}
                              onChange={(e) => {
                                const updated = [...editObjectives];
                                updated[idx].textTr = e.target.value;
                                setEditObjectives(updated);
                              }}
                              placeholder="Hedef metni (Türkçe)..."
                              className="w-full px-2.5 py-1 text-xs border rounded focus:ring-1 focus:ring-purple-500"
                            />
                            <input
                              type="text"
                              value={obj.textEn}
                              onChange={(e) => {
                                const updated = [...editObjectives];
                                updated[idx].textEn = e.target.value;
                                setEditObjectives(updated);
                              }}
                              placeholder="Objective text (English)..."
                              className="w-full px-2.5 py-1 text-xs border rounded text-slate-500 focus:ring-1 focus:ring-purple-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveObjective(idx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                            title="Hedefi Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. VIDEOS TAB */}
                {activeComponentTab === 'videos' && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Eğitim Videoları</span>
                      <button
                        type="button"
                        onClick={handleAddVideo}
                        className="px-2.5 py-1 bg-purple-700 text-white rounded-lg text-2xs font-bold flex items-center gap-1 hover:bg-purple-800 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Yeni Video Ekle</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {editVideos.map((vid, idx) => {
                        const parsed = parseVideoUrl(vid.url, vid.youtubeId);

                        return (
                          <div key={vid.id || idx} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                                  <Video className="w-3.5 h-3.5" />
                                </span>
                                <span className="text-xs font-bold text-slate-800">Video #{idx + 1}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveVideo(idx)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                                title="Videoyu Sil"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-3xs font-semibold text-slate-500 uppercase mb-0.5">Video Başlığı</label>
                                <input
                                  type="text"
                                  value={vid.titleTr}
                                  onChange={(e) => {
                                    const updated = [...editVideos];
                                    updated[idx].titleTr = e.target.value;
                                    setEditVideos(updated);
                                  }}
                                  placeholder="Video Başlığı..."
                                  className="w-full px-2.5 py-1 text-xs border rounded focus:ring-1 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-3xs font-semibold text-slate-500 uppercase mb-0.5">Kanal / Kaynak</label>
                                <input
                                  type="text"
                                  value={vid.channel}
                                  onChange={(e) => {
                                    const updated = [...editVideos];
                                    updated[idx].channel = e.target.value;
                                    setEditVideos(updated);
                                  }}
                                  placeholder="Kanal Adı..."
                                  className="w-full px-2.5 py-1 text-xs border rounded focus:ring-1 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-3xs font-semibold text-slate-500 uppercase mb-0.5">Süre (Örn: 12:45)</label>
                                <input
                                  type="text"
                                  value={vid.duration || ''}
                                  onChange={(e) => {
                                    const updated = [...editVideos];
                                    updated[idx].duration = e.target.value;
                                    setEditVideos(updated);
                                  }}
                                  placeholder="10:00"
                                  className="w-full px-2.5 py-1 text-xs border rounded focus:ring-1 focus:ring-purple-500"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-3xs font-semibold text-slate-500 uppercase mb-0.5">
                                Video Bağlantısı (YouTube URL veya Video ID)
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={vid.url || (vid.youtubeId ? `https://www.youtube.com/watch?v=${vid.youtubeId}` : '')}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const p = parseVideoUrl(val);
                                    const updated = [...editVideos];
                                    updated[idx].url = val;
                                    if (p.youtubeId) {
                                      updated[idx].youtubeId = p.youtubeId;
                                    }
                                    updated[idx].isVerified = p.isValid;
                                    setEditVideos(updated);

                                    // Auto fetch when a valid YouTube link is pasted/typed
                                    if (p.isValid && (val.includes('youtu') || val.length === 11)) {
                                      handleAutoFetchVideoMetadata(idx, val);
                                    }
                                  }}
                                  onPaste={(e) => {
                                    const pasted = e.clipboardData.getData('text');
                                    if (pasted) {
                                      const p = parseVideoUrl(pasted);
                                      if (p.isValid) {
                                        setTimeout(() => handleAutoFetchVideoMetadata(idx, pasted), 80);
                                      }
                                    }
                                  }}
                                  placeholder="Örn: https://www.youtube.com/watch?v=n_TA_-vByFg veya https://youtu.be/..."
                                  className="flex-1 px-2.5 py-1 text-xs border rounded focus:ring-1 focus:ring-purple-500 font-mono"
                                />

                                <button
                                  type="button"
                                  onClick={() => handleAutoFetchVideoMetadata(idx, vid.url)}
                                  disabled={fetchingVideoIdx === idx}
                                  className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-2xs font-bold rounded flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50 transition-colors border border-purple-200"
                                  title="YouTube'dan video başlığı, kanal ve süreyi otomatik getir"
                                >
                                  {fetchingVideoIdx === idx ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin text-purple-600" />
                                      <span>Alınıyor...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-3 h-3 text-amber-500" />
                                      <span>Bilgileri Getir</span>
                                    </>
                                  )}
                                </button>

                                {parsed.directUrl && (
                                  <a
                                    href={parsed.directUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-2xs font-bold rounded flex items-center gap-1 shrink-0"
                                    title="Videoyu yeni sekmede test et"
                                  >
                                    <span>Test Et</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>

                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                {fetchingVideoIdx === idx ? (
                                  <span className="text-3xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 animate-pulse">
                                    <Loader2 className="w-3 h-3 animate-spin text-purple-600" />
                                    <span>YouTube'dan video başlığı, kanal ve süre otomatik çekiliyor...</span>
                                  </span>
                                ) : videoAutoFetchStatus && videoAutoFetchStatus.idx === idx ? (
                                  <span className={`text-3xs font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                                    videoAutoFetchStatus.success 
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                      : 'bg-red-50 text-red-800 border border-red-200'
                                  }`}>
                                    {videoAutoFetchStatus.success ? <Check className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-red-600" />}
                                    <span>{videoAutoFetchStatus.message}</span>
                                  </span>
                                ) : parsed.isValid ? (
                                  <span className="text-3xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>Oynatılabilir ({parsed.type.toUpperCase()}{parsed.youtubeId ? ` · ID: ${parsed.youtubeId}` : ''})</span>
                                  </span>
                                ) : (vid.url || vid.youtubeId) ? (
                                  <span className="text-3xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3 text-amber-600" />
                                    <span>Geçersiz veya tanınmayan bağlantı. Standart YouTube linki girin.</span>
                                  </span>
                                ) : (
                                  <span className="text-3xs text-slate-400">
                                    ⓘ Linki yapıştırdığınızda Başlık, Kanal ve Süre otomatik olarak doldurulacaktır.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. ACTIVITIES TAB */}
                {activeComponentTab === 'activities' && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Etkileşimli Alıştırmalar</span>
                      <button
                        type="button"
                        onClick={handleAddActivity}
                        className="px-2.5 py-1 bg-purple-700 text-white rounded-lg text-2xs font-bold flex items-center gap-1 hover:bg-purple-800 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Yeni Alıştırma Ekle</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {editActivities.map((act, idx) => (
                        <div key={act.id || idx} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xs font-bold text-purple-700 uppercase">Alıştırma #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveActivity(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={act.titleTr}
                            onChange={(e) => {
                              const updated = [...editActivities];
                              updated[idx].titleTr = e.target.value;
                              setEditActivities(updated);
                            }}
                            placeholder="Alıştırma Başlığı..."
                            className="w-full px-2.5 py-1 text-xs border rounded font-semibold"
                          />
                          <textarea
                            rows={2}
                            value={act.descriptionTr}
                            onChange={(e) => {
                              const updated = [...editActivities];
                              updated[idx].descriptionTr = e.target.value;
                              setEditActivities(updated);
                            }}
                            placeholder="Alıştırma Açıklaması ve Yönergesi..."
                            className="w-full px-2.5 py-1 text-xs border rounded text-slate-600"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. ASSIGNMENTS TAB */}
                {activeComponentTab === 'assignments' && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Pratik DOCX Ödevleri</span>
                      <button
                        type="button"
                        onClick={handleAddAssignment}
                        className="px-2.5 py-1 bg-purple-700 text-white rounded-lg text-2xs font-bold flex items-center gap-1 hover:bg-purple-800 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Yeni Ödev Ekle</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {editAssignments.map((ass, idx) => (
                        <div key={ass.id || idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-800">
                              Ödev {ass.assignmentNumber || idx + 1}: {ass.titleTr}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAssignment(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div>
                              <label className="block text-3xs font-semibold text-slate-500 uppercase">Ödev Başlığı</label>
                              <input
                                type="text"
                                value={ass.titleTr}
                                onChange={(e) => {
                                  const updated = [...editAssignments];
                                  updated[idx].titleTr = e.target.value;
                                  setEditAssignments(updated);
                                }}
                                className="w-full px-2 py-1 text-xs border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-3xs font-semibold text-slate-500 uppercase">Zorluk Düzeyi</label>
                              <select
                                value={ass.difficulty}
                                onChange={(e) => {
                                  const updated = [...editAssignments];
                                  updated[idx].difficulty = e.target.value as any;
                                  setEditAssignments(updated);
                                }}
                                className="w-full px-2 py-1 text-xs border rounded bg-white"
                              >
                                <option value="beginner">Başlangıç (Beginner)</option>
                                <option value="intermediate">Orta (Intermediate)</option>
                                <option value="advanced">İleri (Advanced)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-3xs font-semibold text-slate-500 uppercase">Tahmini Süre (Dk)</label>
                              <input
                                type="number"
                                value={ass.estimatedMinutes}
                                onChange={(e) => {
                                  const updated = [...editAssignments];
                                  updated[idx].estimatedMinutes = Number(e.target.value);
                                  setEditAssignments(updated);
                                }}
                                className="w-full px-2 py-1 text-xs border rounded"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-3xs font-semibold text-slate-500 uppercase mb-1">
                              Ödev Yönergeleri ({ass.instructionsTr?.length || 0} Madde)
                            </label>
                            <textarea
                              rows={2}
                              value={ass.instructionsTr?.join('\n') || ''}
                              onChange={(e) => {
                                const updated = [...editAssignments];
                                updated[idx].instructionsTr = e.target.value.split('\n').filter(Boolean);
                                setEditAssignments(updated);
                              }}
                              placeholder="Her satıra bir yönerge maddesi yazın..."
                              className="w-full px-2 py-1 text-xs border rounded text-slate-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: ASSIGNMENTS & INSTRUCTOR GRADING OVERRIDE */}
        {/* ==================================================================== */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                DOCX Ödev Değerlendirme &amp; Eğitmen Not Düzenleme
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Öğrencilerin yüklediği DOCX belgeleri deterministik rubrik kurallarıyla taranır. Eğitmen olarak otomatik puanı gerekçe belirterek güncelleyebilir veya geribildirim ekleyebilirsiniz.
              </p>
            </div>

            {/* Submissions Table with Override Action */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-2xs font-bold uppercase text-slate-500">
                      <th className="py-3 px-5">Öğrenci</th>
                      <th className="py-3 px-4">Ödev &amp; Hafta</th>
                      <th className="py-3 px-4">Dosya</th>
                      <th className="py-3 px-4">Otomatik Skor</th>
                      <th className="py-3 px-4">Geçerli / Eğitmen Skoru</th>
                      <th className="py-3 px-5 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {allSubmissions.map((sub) => {
                      const finalScore = sub.instructorOverrideScore ?? sub.score;
                      const hasOverride = sub.instructorOverrideScore !== undefined;

                      return (
                        <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5">
                            <span className="font-bold text-slate-900 block">{sub.studentName}</span>
                            <span className="text-2xs text-slate-500">{sub.studentNumber || '-'}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-800 block">{sub.assignmentTitleTr}</span>
                            <span className="text-2xs text-slate-400">{sub.weekNumber}. Hafta</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-2xs text-slate-600">
                            {sub.fileName}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-700">
                            {sub.score} / 100
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-md font-extrabold text-xs inline-flex items-center gap-1 ${
                              hasOverride ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {finalScore} / 100
                              {hasOverride && <span className="text-2xs font-normal">✎</span>}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setOverrideModal({
                                  isOpen: true,
                                  submission: sub,
                                  newScore: finalScore,
                                  notes: sub.instructorNotes || '',
                                });
                              }}
                              className="px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold rounded-lg text-2xs transition-colors cursor-pointer"
                            >
                              Puanı Düzenle
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Score Override Modal */}
            {overrideModal.isOpen && overrideModal.submission && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Eğitmen Not Düzenleme</h3>
                    <button
                      type="button"
                      onClick={() => setOverrideModal({ isOpen: false, submission: null, newScore: 0, notes: '' })}
                      className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleScoreOverrideSubmit} className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 block">Öğrenci:</span>
                      <span className="text-sm font-bold text-slate-900">
                        {overrideModal.submission.studentName} ({overrideModal.submission.fileName})
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Yeni Geçerli Not (0 - 100)
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={overrideModal.newScore}
                        onChange={(e) => setOverrideModal({ ...overrideModal, newScore: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Eğitmen Açıklaması / Değerlendirme Gerekçesi (Zorunlu)
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={overrideModal.notes}
                        onChange={(e) => setOverrideModal({ ...overrideModal, notes: e.target.value })}
                        placeholder="Örn: 2. maddedeki yazı tipi biçimlendirmesi manüel incelenerek tam puan verildi."
                        className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setOverrideModal({ isOpen: false, submission: null, newScore: 0, notes: '' })}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-bold bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors cursor-pointer"
                      >
                        Notu Onayla &amp; Kaydet
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: QUESTION BANK & EXAMS */}
        {/* ==================================================================== */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Sınav Soru Havuzu ve Sınav Yönetimi
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  14 haftayı kapsayan {allQuestionsList.length} soru mevcuttur.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNewExamModalOpen(true)}
                  className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Sınav Oluştur</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {examinations.map((exam) => (
                <div key={exam.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
                        {exam.mode}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleExamStatus(exam.id)}
                        className={`text-2xs font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                          exam.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {exam.isActive ? 'Yayında' : 'Pasif'}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                      {exam.titleTr}
                    </h4>
                    <p className="text-2xs text-slate-500 mb-4">
                      {exam.questionCount} Soru · {exam.timeLimitMinutes} Dakika
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 6: REPORTS & ANALYTICS */}
        {/* ==================================================================== */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Akademik Değerlendirme Raporları ve Analiz
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Şube bazlı başarı oranları, DOCX rubrik eksiklikleri ve sınav analitikleri.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Excel / CSV Olarak İndir</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
