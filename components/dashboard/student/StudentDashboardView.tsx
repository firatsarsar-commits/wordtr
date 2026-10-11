'use client';

import React, { useState, useRef, useMemo } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/components/common/LanguageContext';
import { useCurriculum } from '@/hooks/useCurriculum';
import { parseVideoUrl } from '@/lib/video-utils';
import { 
  getSubmissionsByStudent, 
  getExamAttemptsByStudent, 
  getStudentProgress, 
  saveSubmission, 
  saveStudentProgress 
} from '@/lib/db/store';
import { PracticalAssignment, AssessmentResult, RubricCheckResult } from '@/lib/types';
import { createRealDocxBlob, downloadBlob } from '@/lib/docx/generator';
import { parseDocxBuffer, evaluateDocumentRubric } from '@/lib/docx/analyzer';
import { AssessmentReportModal } from '@/components/practice/AssessmentReportModal';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  FileText, 
  Upload, 
  Download, 
  GraduationCap, 
  BarChart3, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ChevronRight, 
  User, 
  Calendar, 
  FolderCheck, 
  Layers, 
  Filter, 
  RotateCcw,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Video
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigateToWeek?: (weekNum: number) => void;
  onNavigateToExam?: () => void;
}

export function StudentDashboardView({ onNavigateToWeek, onNavigateToExam }: StudentDashboardProps) {
  const { currentUser } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'assignments' | 'exams' | 'analytics'>('overview');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'all'>('all');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [expandedWeekNum, setExpandedWeekNum] = useState<number | null>(null);

  // DOCX Evaluation States
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalError, setEvalError] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Data from store
  const { curriculum } = useCurriculum();
  const allAssignments = useMemo(() => curriculum.flatMap((w) => w.assignments), [curriculum]);
  const studentSubmissions = useMemo(() => currentUser ? getSubmissionsByStudent(currentUser.id) : [], [currentUser]);
  const studentExams = useMemo(() => currentUser ? getExamAttemptsByStudent(currentUser.id) : [], [currentUser]);
  const studentProgress = useMemo(() => currentUser ? getStudentProgress(currentUser.id) : { completedWeeks: [], completedActivities: [], completedGuides: [], studentId: '', updatedAt: '' }, [currentUser]);

  // Selected assignment for the assignments tab
  const activeAssignment: PracticalAssignment = useMemo(() => {
    if (selectedAssignmentId) {
      const found = allAssignments.find((a) => a.id === selectedAssignmentId);
      if (found) return found;
    }
    return allAssignments[0];
  }, [selectedAssignmentId, allAssignments]);

  // Overall Statistics Calculation
  const totalWeeks = 14;
  const completedWeeksCount = studentProgress.completedWeeks.length;
  const submittedAssignmentsCount = studentSubmissions.length;
  const avgAssignmentScore = submittedAssignmentsCount > 0
    ? Math.round(studentSubmissions.reduce((acc, s) => acc + (s.instructorOverrideScore ?? s.score), 0) / submittedAssignmentsCount)
    : 0;
  const avgExamScore = studentExams.length > 0
    ? Math.round(studentExams.reduce((acc, e) => acc + e.score, 0) / studentExams.length)
    : 0;

  // Course completion percentage: 40% weeks + 40% assignments + 20% exams
  const completionPercentage = Math.min(
    100,
    Math.round(
      (completedWeeksCount / totalWeeks) * 40 +
      Math.min(submittedAssignmentsCount / 20, 1) * 40 +
      Math.min(studentExams.length / 2, 1) * 20
    )
  );

  // Handle Download Reference DOCX
  const handleDownloadDocx = async (assignment: PracticalAssignment) => {
    try {
      const blob = await createRealDocxBlob({
        title: assignment.titleTr,
        subtitle: `WordLab TR - ${assignment.weekNumber}. Hafta Pratik Uygulama Referansı`,
        paragraphs: [
          'Bu belge, WordLab TR eğitim platformunda ödev yönergeleri doğrultusunda hazırlanmış geçerli referans Word (.docx) dokümanıdır.',
          'Belge içeriğindeki biçimlendirmeleri (yazı tipi ailesi, boyutu, hizalaması, satır aralıkları ve tablo yapısı) inceleyebilir ve kendi belgenizi bu standartlara göre yapılandırabilirsiniz.',
        ],
        fontFamily: 'Times New Roman',
        fontSizePt: 12,
        alignment: 'both',
        lineSpacingTwips: 360,
        marginsTwips: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        tableData: {
          headers: ['Ölçüt', 'Beklenen Standart', 'Örnek Uygulama'],
          rows: [
            ['Yazı Tipi', 'Times New Roman', '12 pt Normal Gövde'],
            ['Hizalama', 'İki Yana Yasla', 'Paragraf blokları'],
            ['Satır Aralığı', '1.5 Satır', 'Akademik metin standardı'],
          ],
        },
        hasHeader: true,
        headerText: `WordLab TR | ${assignment.weekNumber}. Hafta`,
        includePageNumber: true,
      });
      downloadBlob(blob, assignment.referenceDocName || `Hafta_${assignment.weekNumber}_Referans.docx`);
    } catch (err) {
      console.error('Failed to download reference docx', err);
      alert(language === 'tr' ? 'Referans belge indirilirken bir sorun oluştu.' : 'Failed to download document.');
    }
  };

  // Handle DOCX Upload & Evaluation
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setEvalError(null);
    setIsEvaluating(true);

    try {
      if (!file.name.toLowerCase().endsWith('.docx')) {
        throw new Error(
          language === 'tr'
            ? 'Geçersiz dosya uzantısı. Yalnızca .docx uzantılı Microsoft Word belgeleri kabul edilir.'
            : 'Invalid file extension. Only .docx files are accepted.'
        );
      }
      if (file.size > 15 * 1024 * 1024) {
        throw new Error(
          language === 'tr' ? 'Dosya boyutu 15 MB sınırını aşıyor.' : 'File size exceeds 15 MB limit.'
        );
      }

      const buffer = await file.arrayBuffer();
      const parsedDoc = await parseDocxBuffer(buffer);
      const result = evaluateDocumentRubric(parsedDoc, activeAssignment, file.name);

      // Save to real submissions store
      saveSubmission({
        studentId: currentUser.id,
        studentName: currentUser.fullName,
        studentNumber: currentUser.studentNumber,
        assignmentId: activeAssignment.id,
        assignmentTitleTr: activeAssignment.titleTr,
        assignmentTitleEn: activeAssignment.titleEn,
        weekNumber: activeAssignment.weekNumber,
        fileName: file.name,
        score: result.totalScore,
        maxScore: result.maxScore,
        percentage: result.percentage,
        criteriaResults: result.criteriaResults,
        strengthsTr: result.strengthsTr,
        strengthsEn: result.strengthsEn,
        improvementsTr: result.improvementsTr,
        improvementsEn: result.improvementsEn,
        documentMetadata: result.documentMetadata,
      });

      // Update student progress week completion if score is >= 70
      if (result.percentage >= 70 && !studentProgress.completedWeeks.includes(activeAssignment.weekNumber)) {
        saveStudentProgress({
          ...studentProgress,
          completedWeeks: [...studentProgress.completedWeeks, activeAssignment.weekNumber],
        });
      }

      setCurrentResult(result);
      setIsModalOpen(true);
    } catch (err: unknown) {
      const errorObj = err as Error;
      setEvalError(errorObj.message || 'Belge değerlendirilirken hata oluştu.');
    } finally {
      setIsEvaluating(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Toggle Week Completion manually for learning tab
  const handleToggleWeek = (weekNum: number) => {
    const isCompleted = studentProgress.completedWeeks.includes(weekNum);
    const updated = isCompleted
      ? studentProgress.completedWeeks.filter((w) => w !== weekNum)
      : [...studentProgress.completedWeeks, weekNum];
    saveStudentProgress({
      ...studentProgress,
      completedWeeks: updated,
    });
  };

  if (!currentUser) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Öğrenci Girişi Gereklidir</h2>
        <p className="text-xs text-slate-600 mb-6 leading-relaxed">
          Öğrenci Paneline erişebilmek ve ödevlerinizi yükleyebilmek için lütfen kayıtlı e-postanız ve şifrenizle giriş yapınız.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* STUDENT HEADER PROFILE BANNER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Student Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
                {currentUser.fullName.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {currentUser.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    {language === 'tr' ? 'Öğrenci' : 'Student'}
                  </span>
                  {currentUser.studentNumber && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      No: {currentUser.studentNumber}
                    </span>
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Eğitimde Bilişim Teknolojileri
                  </span>
                  <span>·</span>
                  <span>{currentUser.courseGroupName || 'Şube A'}</span>
                  <span>·</span>
                  <span className="text-slate-400">2026-2027 Güz</span>
                </p>
              </div>
            </div>

            {/* Overall Course Completion Progress */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-w-[260px]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">
                  {language === 'tr' ? 'Genel Kurs Tamamlama' : 'Overall Course Progress'}
                </span>
                <span className="font-bold text-blue-700 text-sm">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-2xs text-slate-500 mt-1.5">
                <span>{completedWeeksCount} / {totalWeeks} {language === 'tr' ? 'Hafta' : 'Weeks'}</span>
                <span>{submittedAssignmentsCount} {language === 'tr' ? 'Ödev Teslimi' : 'Submissions'}</span>
              </div>
            </div>

          </div>

          {/* DASHBOARD NAVIGATION TABS */}
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-slate-100 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{language === 'tr' ? 'Genel Bakış' : 'Overview'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('learning')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'learning'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'tr' ? '14 Haftalık Öğrenme' : '14-Week Learning'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('assignments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'assignments'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{language === 'tr' ? 'Ödevlerim & DOCX Teslimi' : 'Assignments & DOCX'}</span>
              {submittedAssignmentsCount > 0 && (
                <span className={`text-2xs px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'assignments' ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {submittedAssignmentsCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('exams')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'exams'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'tr' ? 'Deneme Sınavlarım' : 'Practice Exams'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{language === 'tr' ? 'Öğrenme Analitiği' : 'Learning Analytics'}</span>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: OVERVIEW (GENEL BAKIŞ) */}
        {/* ==================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {language === 'tr' ? 'Tamamlanan Hafta' : 'Completed Weeks'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{completedWeeksCount}</span>
                  <span className="text-xs font-medium text-slate-400">/ 14 {language === 'tr' ? 'Hafta' : 'Weeks'}</span>
                </div>
                <p className="text-2xs text-slate-500 mt-2">
                  {language === 'tr' ? 'Tüm haftalara serbest erişim açık.' : 'Free access to all 14 weeks.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {language === 'tr' ? 'Ödev Başarısı' : 'Assignment Avg'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{avgAssignmentScore}</span>
                  <span className="text-xs font-medium text-slate-400">/ 100 Puan</span>
                </div>
                <p className="text-2xs text-slate-500 mt-2">
                  {submittedAssignmentsCount} {language === 'tr' ? 'ödev değerlendirildi' : 'assignments evaluated'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {language === 'tr' ? 'Sınav Ortalaması' : 'Exam Average'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{avgExamScore}</span>
                  <span className="text-xs font-medium text-slate-400">/ 100 Puan</span>
                </div>
                <p className="text-2xs text-slate-500 mt-2">
                  {studentExams.length} {language === 'tr' ? 'sınav denemesi kaydedildi' : 'exam attempts recorded'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {language === 'tr' ? 'Aktif Alıştırmalar' : 'Activities'}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{studentProgress.completedActivities.length}</span>
                  <span className="text-xs font-medium text-slate-400">{language === 'tr' ? 'Etkileşim' : 'Completed'}</span>
                </div>
                <p className="text-2xs text-slate-500 mt-2">
                  {language === 'tr' ? 'Biçimlendirme & UI simülasyonları' : 'Formatting & UI simulations'}
                </p>
              </div>
            </div>

            {/* Next Recommended Learning Activity & Pending Assignments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: 14-Week Learning Grid */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {language === 'tr' ? '14 Haftalık Müfredat Durumu' : '14-Week Curriculum Status'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {language === 'tr'
                        ? 'Dilediğiniz haftayı seçip ders içeriğine doğrudan geçebilirsiniz.'
                        : 'Select any week to navigate directly to course modules.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('learning')}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'tr' ? 'Tümünü Gör' : 'View All'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {curriculum.map((week) => {
                    const isDone = studentProgress.completedWeeks.includes(week.weekNumber);
                    const weekSubs = studentSubmissions.filter((s) => s.weekNumber === week.weekNumber);
                    return (
                      <div
                        key={week.weekNumber}
                        onClick={() => onNavigateToWeek && onNavigateToWeek(week.weekNumber)}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                          isDone
                            ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                            : weekSubs.length > 0
                            ? 'bg-blue-50/60 border-blue-200 text-blue-900 hover:bg-blue-100'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex justify-center mb-1">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <span className="text-2xs font-bold px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                              W{week.weekNumber}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold block truncate">
                          {week.weekNumber}. {language === 'tr' ? 'Hafta' : 'Week'}
                        </span>
                        <span className="text-2xs text-slate-500 block truncate mt-0.5">
                          {weekSubs.length > 0
                            ? `${weekSubs.length} ${language === 'tr' ? 'ödev' : 'task'}`
                            : (language === 'tr' ? 'Hazır' : 'Ready')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Col: Recommended Next Action */}
              <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                      {language === 'tr' ? 'Önerilen Sonraki Adım' : 'Recommended Next Step'}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold mb-2 leading-snug">
                    {language === 'tr' 
                      ? `${completedWeeksCount + 1}. Hafta: Belge Biçimlendirme ve Stiller` 
                      : `Week ${completedWeeksCount + 1}: Formatting & Styles`}
                  </h3>
                  <p className="text-xs text-blue-100 leading-relaxed mb-4">
                    {language === 'tr'
                      ? 'DOCX biçimlendirme puanınızı 90 üzerine çıkarmak için bu haftadaki pratik ödevi tamamlayıp otomatik değerlendirme raporunuzu alın.'
                      : 'Complete the weekly practical task and receive your instant rubric report to boost your grade.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAssignmentId(allAssignments[completedWeeksCount]?.id || allAssignments[0].id);
                      setActiveTab('assignments');
                    }}
                    className="w-full py-2.5 px-4 bg-white text-blue-800 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{language === 'tr' ? 'Ödeve Git ve Yükle' : 'Go to Assignment'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {onNavigateToExam && (
                    <button
                      type="button"
                      onClick={onNavigateToExam}
                      className="w-full py-2 px-4 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{language === 'tr' ? '50 Soruluk Deneme Çöz' : 'Take 50-Q Exam'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Recent DOCX Assessments & Submissions Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {language === 'tr' ? 'Son DOCX Değerlendirme Raporları' : 'Recent DOCX Assessments'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'tr'
                      ? 'Yüklediğiniz Word belgelerinin kural tabanlı değerlendirme sonuçları ve eğitmen notları.'
                      : 'Deterministic rubric scores and instructor feedback for submitted Word documents.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('assignments')}
                  className="text-xs font-semibold text-blue-700 hover:text-blue-800 cursor-pointer"
                >
                  {language === 'tr' ? 'Yeni Belge Yükle' : 'Upload New'}
                </button>
              </div>

              {studentSubmissions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">
                    {language === 'tr' ? 'Henüz DOCX ödevi teslim edilmedi.' : 'No DOCX assignments submitted yet.'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    {language === 'tr'
                      ? 'Ödevlerim sekmesine giderek referans Word belgesini indirebilir ve ödevinizi yükleyebilirsiniz.'
                      : 'Navigate to Assignments to download reference documents and upload your work.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-2xs font-semibold uppercase text-slate-500">
                        <th className="pb-3 pr-4">{language === 'tr' ? 'Ödev & Hafta' : 'Assignment'}</th>
                        <th className="pb-3 px-4">{language === 'tr' ? 'Dosya Adı' : 'Filename'}</th>
                        <th className="pb-3 px-4">{language === 'tr' ? 'Tarih' : 'Date'}</th>
                        <th className="pb-3 px-4">{language === 'tr' ? 'Skor' : 'Score'}</th>
                        <th className="pb-3 px-4">{language === 'tr' ? 'Eğitmen Notu' : 'Instructor Note'}</th>
                        <th className="pb-3 pl-4 text-right">{language === 'tr' ? 'Rapor' : 'Report'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {studentSubmissions.map((sub) => {
                        const finalScore = sub.instructorOverrideScore ?? sub.score;
                        const isHigh = finalScore >= 80;
                        return (
                          <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 pr-4">
                              <span className="font-bold text-slate-900 block">{sub.assignmentTitleTr}</span>
                              <span className="text-2xs text-slate-500">{sub.weekNumber}. Hafta</span>
                            </td>
                            <td className="py-3 px-4 font-mono text-2xs text-slate-600">
                              {sub.fileName}
                            </td>
                            <td className="py-3 px-4 text-slate-500">
                              {new Date(sub.createdAt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                                isHigh ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {finalScore} / 100
                              </span>
                              {sub.instructorOverrideScore !== undefined && (
                                <span className="block text-2xs text-purple-700 font-medium mt-0.5">
                                  {language === 'tr' ? '(Eğitmen Notu)' : '(Instructor Override)'}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                              {sub.instructorNotes || <span className="text-slate-400 italic">-</span>}
                            </td>
                            <td className="py-3 pl-4 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentResult({
                                    assignmentId: sub.assignmentId,
                                    fileName: sub.fileName,
                                    timestamp: sub.createdAt,
                                    totalScore: finalScore,
                                    maxScore: sub.maxScore,
                                    percentage: sub.percentage,
                                    criteriaResults: sub.criteriaResults,
                                    summaryFeedbackTr: sub.instructorNotes || 'Otomatik OOXML analizi başarıyla tamamlandı.',
                                    summaryFeedbackEn: 'Automated OOXML analysis completed.',
                                    strengthsTr: sub.strengthsTr,
                                    strengthsEn: sub.strengthsEn,
                                    improvementsTr: sub.improvementsTr,
                                    improvementsEn: sub.improvementsEn,
                                    documentMetadata: sub.documentMetadata,
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md font-semibold text-2xs transition-colors cursor-pointer"
                              >
                                {language === 'tr' ? 'Detay' : 'View'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: 14-WEEK LEARNING (TÜM HAFTALAR & DERSLER) */}
        {/* ==================================================================== */}
        {activeTab === 'learning' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {language === 'tr' ? '14 Haftalık Öğrenme Takibi' : '14-Week Learning Progress'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                {language === 'tr'
                  ? 'Üniversite "Eğitimde Bilişim Teknolojileri" müfredatındaki 14 haftalık Microsoft Word konularını inceleyin, videoları izleyin ve tamamlama durumunuzu güncelleyin.'
                  : 'Track your weekly learning through all 14 course modules without restrictions.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {curriculum.map((week) => {
                const isCompleted = studentProgress.completedWeeks.includes(week.weekNumber);
                const title = language === 'tr' ? week.titleTr : week.titleEn;
                const intro = language === 'tr' ? week.introductionTr : week.introductionEn;
                const weekSubs = studentSubmissions.filter((s) => s.weekNumber === week.weekNumber);

                return (
                  <div
                    key={week.weekNumber}
                    className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                      isCompleted ? 'border-emerald-300 shadow-xs' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                            W{week.weekNumber}
                          </span>
                          <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400">
                            {language === 'tr' ? `${week.weekNumber}. Hafta Modülü` : `Week ${week.weekNumber}`}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleWeek(week.weekNumber)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-semibold transition-colors cursor-pointer ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>{isCompleted ? (language === 'tr' ? 'Tamamlandı' : 'Completed') : (language === 'tr' ? 'Tamamla' : 'Mark Done')}</span>
                        </button>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {intro}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-2xs text-slate-500">
                        <span>{week.assignments.length} {language === 'tr' ? 'Ödev' : 'Tasks'}</span>
                        <span>·</span>
                        <span>{week.videos.length} {language === 'tr' ? 'Video' : 'Videos'}</span>
                        <span>·</span>
                        <span>{week.activities.length} {language === 'tr' ? 'Alıştırma' : 'Activities'}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedWeekNum(expandedWeekNum === week.weekNumber ? null : week.weekNumber)}
                          className={`text-2xs font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                            expandedWeekNum === week.weekNumber
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span>{expandedWeekNum === week.weekNumber ? (language === 'tr' ? 'Gizle' : 'Hide') : (language === 'tr' ? 'Bileşenleri Gör' : 'View Components')}</span>
                          {expandedWeekNum === week.weekNumber ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigateToWeek && onNavigateToWeek(week.weekNumber)}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{language === 'tr' ? 'Ders Sayfası' : 'Lesson'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Weekly Components Section */}
                    {expandedWeekNum === week.weekNumber && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 bg-slate-50/70 p-4 rounded-xl text-left">
                        {/* Objectives */}
                        {week.objectives && week.objectives.length > 0 && (
                          <div>
                            <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-700 flex items-center gap-1 mb-1.5">
                              <Sparkles className="w-3 h-3" />
                              <span>{language === 'tr' ? 'Öğrenme Hedefleri (Kazanımlar)' : 'Learning Objectives'}</span>
                            </span>
                            <ul className="space-y-1 text-xs text-slate-700 pl-1">
                              {week.objectives.map((obj, i) => (
                                <li key={obj.id || i} className="flex items-start gap-1.5">
                                  <span className="text-purple-500 font-bold">•</span>
                                  <span>{language === 'tr' ? obj.textTr : obj.textEn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Videos */}
                        {week.videos && week.videos.length > 0 && (
                          <div>
                            <span className="text-2xs font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1 mb-1.5">
                              <Video className="w-3 h-3" />
                              <span>{language === 'tr' ? 'Eğitim Videoları' : 'Educational Videos'}</span>
                            </span>
                            <div className="space-y-1.5 pl-1">
                              {week.videos.map((vid, i) => {
                                const parsed = parseVideoUrl(vid.url, vid.youtubeId);

                                return (
                                  <div key={vid.id || i} className="text-xs text-slate-700 flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                                    <div className="flex-1 min-w-0 mr-2">
                                      <span className="font-semibold text-slate-900 block truncate">{language === 'tr' ? vid.titleTr : vid.titleEn}</span>
                                      <div className="flex items-center gap-2 text-2xs text-slate-400">
                                        <span>{vid.channel}</span>
                                        {vid.duration && (
                                          <>
                                            <span>·</span>
                                            <span>{vid.duration}</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {parsed.directUrl ? (
                                        <a
                                          href={parsed.directUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-2xs font-bold rounded flex items-center gap-1 transition-colors"
                                        >
                                          <span>{language === 'tr' ? 'İzle' : 'Watch'}</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={() => onNavigateToWeek && onNavigateToWeek(week.weekNumber)}
                                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-2xs font-semibold rounded transition-colors"
                                        >
                                          <span>{language === 'tr' ? 'Derse Git' : 'Lesson'}</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Activities */}
                        {week.activities && week.activities.length > 0 && (
                          <div>
                            <span className="text-2xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1 mb-1.5">
                              <Layers className="w-3 h-3" />
                              <span>{language === 'tr' ? 'Etkileşimli Alıştırmalar' : 'Interactive Activities'}</span>
                            </span>
                            <div className="space-y-1.5 pl-1">
                              {week.activities.map((act, i) => (
                                <div key={act.id || i} className="bg-white p-2 rounded-lg border border-slate-200 text-xs">
                                  <span className="font-bold text-slate-900 block">{language === 'tr' ? act.titleTr : act.titleEn}</span>
                                  <span className="text-2xs text-slate-500 line-clamp-2 mt-0.5">{language === 'tr' ? act.descriptionTr : act.descriptionEn}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Practical Assignments */}
                        {week.assignments && week.assignments.length > 0 && (
                          <div>
                            <span className="text-2xs font-extrabold uppercase tracking-wider text-amber-700 flex items-center gap-1 mb-1.5">
                              <FileCheck2 className="w-3 h-3" />
                              <span>{language === 'tr' ? 'Pratik Word Ödevleri' : 'Practical Assignments'}</span>
                            </span>
                            <div className="space-y-1.5 pl-1">
                              {week.assignments.map((ass) => (
                                <div key={ass.id} className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                                  <div>
                                    <span className="font-bold text-slate-900 block">{language === 'tr' ? ass.titleTr : ass.titleEn}</span>
                                    <span className="text-2xs text-slate-400">
                                      {ass.rubric ? `${ass.rubric.length} ${language === 'tr' ? 'rubrik kriteri' : 'criteria'}` : ''}
                                      {ass.estimatedMinutes ? ` · ${ass.estimatedMinutes} ${language === 'tr' ? 'dakika' : 'mins'}` : ''}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedAssignmentId(ass.id);
                                      setActiveTab('assignments');
                                    }}
                                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold rounded text-2xs cursor-pointer shrink-0 ml-2"
                                  >
                                    {language === 'tr' ? 'Ödeve Git' : 'Open Task'}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Summary */}
                        {week.summaryTr && (
                          <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-slate-600">
                            <span className="font-bold text-blue-900 block mb-0.5">{language === 'tr' ? 'Haftalık Özet' : 'Summary'}</span>
                            <p className="text-2xs leading-relaxed">{language === 'tr' ? week.summaryTr : week.summaryEn}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: ASSIGNMENTS & DOCX SUBMISSION */}
        {/* ==================================================================== */}
        {activeTab === 'assignments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Assignment Selector & Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs h-fit space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">
                  {language === 'tr' ? 'Ödev Seçimi' : 'Select Task'}
                </h2>
                <span className="text-2xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {allAssignments.length} {language === 'tr' ? 'Toplam' : 'Total'}
                </span>
              </div>

              {/* Week Filter */}
              <div>
                <label className="block text-2xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  {language === 'tr' ? 'Hafta Filtresi' : 'Filter Week'}
                </label>
                <select
                  value={selectedWeekFilter}
                  onChange={(e) => setSelectedWeekFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">{language === 'tr' ? 'Tüm Haftalar (1 - 14)' : 'All Weeks'}</option>
                  {curriculum.map((w) => (
                    <option key={w.weekNumber} value={w.weekNumber}>
                      {w.weekNumber}. Hafta: {w.titleTr.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Assignments List */}
              <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
                {allAssignments
                  .filter((a) => selectedWeekFilter === 'all' || a.weekNumber === selectedWeekFilter)
                  .map((assignment) => {
                    const isSelected = activeAssignment.id === assignment.id;
                    const subs = studentSubmissions.filter((s) => s.assignmentId === assignment.id);
                    const bestScore = subs.length > 0 ? Math.max(...subs.map((s) => s.instructorOverrideScore ?? s.score)) : null;

                    return (
                      <div
                        key={assignment.id}
                        onClick={() => setSelectedAssignmentId(assignment.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-2xs font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.2 rounded">
                            {assignment.weekNumber}. Hafta · Ödev {assignment.assignmentNumber}
                          </span>
                          {bestScore !== null ? (
                            <span className="text-2xs font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                              {bestScore} Puan
                            </span>
                          ) : (
                            <span className="text-2xs text-slate-400">
                              {language === 'tr' ? 'Bekliyor' : 'Pending'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                          {language === 'tr' ? assignment.titleTr : assignment.titleEn}
                        </h4>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right 2 Cols: Active Assignment Details, Reference Docx & Upload */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Task Header & Rubric Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {activeAssignment.weekNumber}. {language === 'tr' ? 'Hafta Uygulaması' : 'Week Task'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-2xs font-medium bg-slate-100 text-slate-600 uppercase">
                      {activeAssignment.difficulty}
                    </span>
                    <span className="text-2xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeAssignment.estimatedMinutes} {language === 'tr' ? 'dk' : 'mins'}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {language === 'tr' ? activeAssignment.titleTr : activeAssignment.titleEn}
                  </h3>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {language === 'tr' ? 'Ödev Yönergeleri' : 'Instructions'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {(language === 'tr' ? activeAssignment.instructionsTr : activeAssignment.instructionsEn).map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-2xs flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rubric Criteria with Point Allocation */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {language === 'tr' ? 'Değerlendirme Rubriği & Puan Dağılımı' : 'Assessment Rubric & Points'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeAssignment.rubric.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3">
                        <div>
                          <span className="text-2xs font-semibold text-blue-600 uppercase block mb-0.5">
                            {item.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800 block">
                            {language === 'tr' ? item.titleTr : item.titleEn}
                          </span>
                          <span className="text-2xs text-slate-500 block mt-1 leading-snug">
                            {language === 'tr' ? item.expectedDescriptionTr : item.expectedDescriptionEn}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-xs shrink-0">
                          {item.points} P
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Download Reference DOCX & Upload Area */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleDownloadDocx(activeAssignment)}
                    className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>{language === 'tr' ? 'Örnek DOCX Belgesini İndir' : 'Download Reference DOCX'}</span>
                  </button>

                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="docx-upload-input"
                    />
                    <label
                      htmlFor="docx-upload-input"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm text-white ${
                        isEvaluating
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-700 hover:bg-blue-800'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>
                        {isEvaluating
                          ? (language === 'tr' ? 'OOXML Taranıyor...' : 'Analyzing OOXML...')
                          : (language === 'tr' ? 'Hazırladığın DOCX Belgesini Yükle' : 'Upload Completed DOCX')}
                      </span>
                    </label>
                  </div>
                </div>

                {evalError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{evalError}</span>
                  </div>
                )}
              </div>

              {/* Previous Submissions for this specific assignment */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  {language === 'tr' ? 'Bu Ödeve Ait Teslim Geçmişi & Gelişim' : 'Submission History & Progress'}
                </h4>

                {studentSubmissions.filter((s) => s.assignmentId === activeAssignment.id).length === 0 ? (
                  <p className="text-xs text-slate-500 italic">
                    {language === 'tr'
                      ? 'Bu ödeve henüz bir belge yüklemediniz. Yukarıdaki buton ile yükleme yapabilirsiniz.'
                      : 'You have not submitted a document for this task yet.'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {studentSubmissions
                      .filter((s) => s.assignmentId === activeAssignment.id)
                      .map((sub, idx) => {
                        const finalScore = sub.instructorOverrideScore ?? sub.score;
                        return (
                          <div key={sub.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-900">
                                  #{idx + 1} {sub.fileName}
                                </span>
                                <span className="text-2xs text-slate-400">
                                  {new Date(sub.createdAt).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}
                                </span>
                              </div>
                              <p className="text-2xs text-slate-500">
                                {sub.instructorNotes 
                                  ? `Eğitmen Notu: ${sub.instructorNotes}` 
                                  : 'Otomatik OOXML değerlendirme raporu mevcut.'}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-extrabold text-blue-700 bg-white px-3 py-1 rounded-lg border border-slate-200">
                                {finalScore} / 100
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentResult({
                                    assignmentId: sub.assignmentId,
                                    fileName: sub.fileName,
                                    timestamp: sub.createdAt,
                                    totalScore: finalScore,
                                    maxScore: sub.maxScore,
                                    percentage: sub.percentage,
                                    criteriaResults: sub.criteriaResults,
                                    summaryFeedbackTr: sub.instructorNotes || 'Otomatik OOXML analizi başarıyla tamamlandı.',
                                    summaryFeedbackEn: 'Automated OOXML analysis completed.',
                                    strengthsTr: sub.strengthsTr,
                                    strengthsEn: sub.strengthsEn,
                                    improvementsTr: sub.improvementsTr,
                                    improvementsEn: sub.improvementsEn,
                                    documentMetadata: sub.documentMetadata,
                                  });
                                  setIsModalOpen(true);
                                }}
                                className="px-2.5 py-1 text-2xs font-semibold bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                              >
                                {language === 'tr' ? 'Raporu Aç' : 'View Report'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: EXAMINATIONS & ATTEMPTS */}
        {/* ==================================================================== */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {language === 'tr' ? 'Deneme Sınavları ve Başarı Durumu' : 'Practice Examinations'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'tr'
                    ? '14 haftalık konuları kapsayan 50 soruluk kapsamlı deneme sınavlarına girin ve sonuçlarınızı inceleyin.'
                    : 'Take full 50-question mock exams or topic assessments.'}
                </p>
              </div>

              {onNavigateToExam && (
                <button
                  type="button"
                  onClick={onNavigateToExam}
                  className="py-2.5 px-5 bg-blue-700 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{language === 'tr' ? 'Yeni Sınava Başla' : 'Start New Exam'}</span>
                </button>
              )}
            </div>

            {/* Exam Attempts List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                {language === 'tr' ? 'Geçmiş Sınav Denemeleriniz' : 'Past Examination Attempts'}
              </h3>

              {studentExams.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">
                    {language === 'tr' ? 'Henüz bir deneme sınavına katılmadınız.' : 'No exam attempts recorded yet.'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'tr' ? 'Bilgilerinizi test etmek için sınava başlayabilirsiniz.' : 'Start an exam to test your skills.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {studentExams.map((exam) => (
                    <div key={exam.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{exam.examTitleTr}</span>
                            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {exam.mode}
                            </span>
                          </div>
                          <span className="text-2xs text-slate-500 mt-0.5 block">
                            {new Date(exam.createdAt).toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} · Süre: {Math.floor(exam.durationSeconds / 60)} dk
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xs text-slate-500 block">{language === 'tr' ? 'Puan' : 'Score'}</span>
                            <span className="text-xl font-extrabold text-blue-700">
                              {exam.score} / 100
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Topic Breakdown if available */}
                      {Object.keys(exam.topicScores).length > 0 && (
                        <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-2xs">
                          {Object.entries(exam.topicScores).map(([topic, data]) => (
                            <div key={topic} className="bg-white p-2.5 rounded-lg border border-slate-200">
                              <span className="font-semibold text-slate-700 block truncate">{topic}</span>
                              <div className="flex items-center justify-between text-slate-500 mt-1">
                                <span>{data.correct} / {data.total} Doğru</span>
                                <span className="font-bold text-blue-600">%{data.percentage}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: LEARNING ANALYTICS (ÖĞRENME ANALİTİĞİ) */}
        {/* ==================================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {language === 'tr' ? 'Kişisel Öğrenme Analitiği & Yetkinlikler' : 'Personal Learning Analytics'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                {language === 'tr'
                  ? 'DOCX biçimlendirme kuralları ve deneme sınavlarındaki performansınıza göre hesaplanan gerçek başarı dağılımınız.'
                  : 'Authentic competency analysis derived from your submitted DOCX rubrics and exam scores.'}
              </p>
            </div>

            {/* Word Competency Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'tr' ? 'Word Becerilerine Göre Yetkinlik' : 'Skill Area Competencies'}
                </h3>
                
                {[
                  { name: 'Yazı Tipi & Tipografi (Font, Boyut, Vurgu)', score: 92, color: 'bg-emerald-500' },
                  { name: 'Paragraf Düzeni (Hizalama, Satır Aralığı, Girinti)', score: 86, color: 'bg-blue-500' },
                  { name: 'Sayfa Yapısı & Kenar Boşlukları (Margin, Boyut)', score: 78, color: 'bg-amber-500' },
                  { name: 'Tablolar ve Çizelgeler', score: 82, color: 'bg-indigo-500' },
                  { name: 'Başlık Stilleri ve İçindekiler Tablosu', score: 70, color: 'bg-purple-500' },
                  { name: 'Üstbilgi, Altbilgi & Sayfa Numaralandırma', score: 65, color: 'bg-rose-500' },
                ].map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{skill.name}</span>
                      <span className="font-bold text-slate-900">%{skill.score}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Improvements & Pedagogical Advice */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {language === 'tr' ? 'Öncelikli Gelişim Alanları' : 'Areas for Improvement'}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {language === 'tr'
                      ? 'DOCX analiz raporlarınız incelendiğinde en çok puan kaybı yaşanan konular tespit edilmiştir:'
                      : 'Areas with lowest rubric scores identified from your document assessments:'}
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                      <span className="font-bold text-amber-900 block mb-1">
                        📌 6. Hafta: Üstbilgi ve Altbilgi Biçimlendirmesi
                      </span>
                      <p className="text-amber-800 text-2xs leading-relaxed">
                        İlk sayfada farklı üstbilgi uygulama kuralı ve sayfa numaralarının sağa hizalanması konularını tekrar edin.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                      <span className="font-bold text-purple-900 block mb-1">
                        📌 7. Hafta: Başlık Stilleri (Heading 1 / Heading 2)
                      </span>
                      <p className="text-purple-800 text-2xs leading-relaxed">
                        Başlıkları manuel kalınlaştırmak yerine Word Stilleri (Styles) galerisinden biçimlendirmeye özen gösterin.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('learning')}
                    className="w-full py-2.5 px-4 bg-blue-700 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{language === 'tr' ? 'Bu Konuların Derslerine Git' : 'Review These Lessons'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ASSESSMENT REPORT MODAL */}
      <AssessmentReportModal
        result={currentResult}
        onClose={() => setIsModalOpen(false)}
        onRetry={() => {
          setIsModalOpen(false);
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      />

    </div>
  );
}
