'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { useCurriculum } from '@/hooks/useCurriculum';
import { PracticalAssignment, AssessmentResult } from '@/lib/types';
import { createRealDocxBlob, downloadBlob } from '@/lib/docx/generator';
import { parseDocxBuffer, evaluateDocumentRubric } from '@/lib/docx/analyzer';
import { recordAssignmentScore, getLocalProgress } from '@/lib/progress-store';
import { AssessmentReportModal } from './AssessmentReportModal';
import { 
  FileCheck2, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Filter, 
  Sparkles,
  FileText,
  RotateCcw,
  Check,
  ChevronRight,
  Loader2
} from 'lucide-react';

interface PracticeLabViewProps {
  initialAssignmentId?: string | null;
}

export function PracticeLabView({ initialAssignmentId }: PracticeLabViewProps) {
  const { language, t } = useLanguage();
  
  const { curriculum } = useCurriculum();
  
  // Flatten all assignments across all weeks (dynamically reactive to curriculum overrides)
  const allAssignments: PracticalAssignment[] = curriculum.flatMap((w) => w.assignments);

  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | 'all'>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  // Selected assignment
  const initial = initialAssignmentId 
    ? allAssignments.find((a) => a.id === initialAssignmentId) 
    : allAssignments[0];
  const [selectedAssignment, setSelectedAssignment] = useState<PracticalAssignment>(initial || allAssignments[0]);

  // Assessment & upload states
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [assessmentError, setAssessmentError] = useState<string | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered assignments
  const filteredAssignments = allAssignments.filter((a) => {
    if (selectedWeekFilter !== 'all' && a.weekNumber !== selectedWeekFilter) return false;
    if (selectedDifficultyFilter !== 'all' && a.difficulty !== selectedDifficultyFilter) return false;
    return true;
  });

  // Track completed submissions from local progress store
  const userProgress = getLocalProgress();

  // Generate and download real .docx sample file
  const handleDownloadReferenceDocx = async (assignment: PracticalAssignment) => {
    try {
      const generatorConfig = assignment.starterContentGenerator || {
        title: assignment.titleTr,
        paragraphs: [
          'Bu belge, WordLab TR etkileşimli eğitim platformu için hazırlanmış referans Microsoft Word (.docx) dokümanıdır.',
          'Ödev yönergelerine göre biçimlendirme kurallarını (yazı tipi, boyut, hizalama, kenar boşlukları ve tablo) inceleyebilir ve belgenizi bu doğrultuda yapılandırabilirsiniz.',
        ],
      };

      const blob = await createRealDocxBlob({
        title: generatorConfig.title,
        subtitle: `WordLab TR - ${assignment.weekNumber}. Hafta Pratik Uygulaması`,
        paragraphs: generatorConfig.paragraphs,
        fontFamily: 'Times New Roman',
        fontSizePt: 12,
        alignment: 'both',
        lineSpacingTwips: 360, // 1.5 spacing
        marginsTwips: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // Normal margins
        tableData: {
          headers: ['Parametre', 'Standart Değer', 'Açıklama'],
          rows: [
            ['Yazı Tipi', 'Times New Roman', 'Akademik tipografi'],
            ['Gövde Boyutu', '12 pt', 'Okunabilir gövde metni'],
            ['Satır Aralığı', '1.5 Satır', 'Tez ve rapor standartları'],
          ],
        },
        hasHeader: true,
        headerText: `WordLab TR | ${assignment.weekNumber}. Hafta`,
        includePageNumber: true,
      });

      downloadBlob(blob, assignment.referenceDocName || `Hafta${assignment.weekNumber}_Referans.docx`);
    } catch (err) {
      console.error('Failed to create reference docx', err);
      alert('Referans belge oluşturulurken bir sorun çıktı.');
    }
  };

  // Upload and evaluate DOCX
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous states
    setAssessmentError(null);
    setIsEvaluating(true);

    try {
      // Validate file extension
      if (!file.name.toLowerCase().endsWith('.docx')) {
        throw new Error(
          language === 'tr' 
            ? 'Geçersiz dosya uzantısı. Yalnızca .docx uzantılı Microsoft Word belgeleri kabul edilir.'
            : 'Invalid file format. Only .docx Microsoft Word files are accepted.'
        );
      }

      // Validate file size (15 MB max)
      if (file.size > 15 * 1024 * 1024) {
        throw new Error(
          language === 'tr'
            ? 'Dosya boyutu çok büyük (maksimum 15 MB).'
            : 'File size exceeds maximum limit of 15 MB.'
        );
      }

      // Read buffer and parse real OOXML structure deterministically
      const buffer = await file.arrayBuffer();
      const parsedDoc = await parseDocxBuffer(buffer);

      // Evaluate against assignment rubric
      const result = evaluateDocumentRubric(parsedDoc, selectedAssignment, file.name);

      // Record to user local storage
      recordAssignmentScore(selectedAssignment.id, result.totalScore, file.name);

      setAssessmentResult(result);
      setIsReportModalOpen(true);
    } catch (err: unknown) {
      const errorObj = err as Error;
      setAssessmentError(errorObj.message || 'Belge incelenirken bir hata oluştu.');
    } finally {
      setIsEvaluating(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const currentSubmission = userProgress.assignmentSubmissions[selectedAssignment.id];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lab Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
                {language === 'tr' ? 'Etkileşimli Belge Değerlendirme' : 'Interactive Document Assessment'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t('navPracticeLab')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {language === 'tr'
                  ? 'Müfredattaki 56+ pratik Word ödevini seçin, örnek belgeyi indirin, Word\'de hazırlayıp yükleyin ve anında kural tabanlı değerlendirme raporu alın.'
                  : 'Select an assignment from 56+ tasks, download the reference doc, prepare in Word, upload, and receive deterministic rubric scores.'}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">{allAssignments.length} {language === 'tr' ? 'Toplam Ödev' : 'Total Tasks'}</span>
              <span aria-hidden="true">·</span>
              <span>{Object.keys(userProgress.assignmentSubmissions).length} {language === 'tr' ? 'Tamamlanan' : 'Submitted'}</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
            {/* Week Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">{language === 'tr' ? 'Hafta:' : 'Week:'}</span>
              <select
                value={selectedWeekFilter}
                onChange={(e) => setSelectedWeekFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium cursor-pointer"
              >
                <option value="all">{language === 'tr' ? 'Tüm Haftalar (1-14)' : 'All Weeks (1-14)'}</option>
                {Array.from({ length: 14 }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w}>{language === 'tr' ? `${w}. Hafta` : `Week ${w}`}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">{language === 'tr' ? 'Zorluk:' : 'Difficulty:'}</span>
              <select
                value={selectedDifficultyFilter}
                onChange={(e) => setSelectedDifficultyFilter(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium cursor-pointer"
              >
                <option value="all">{language === 'tr' ? 'Tüm Zorluklar' : 'All Difficulties'}</option>
                <option value="beginner">{language === 'tr' ? 'Başlangıç' : 'Beginner'}</option>
                <option value="intermediate">{language === 'tr' ? 'Orta Düzey' : 'Intermediate'}</option>
                <option value="advanced">{language === 'tr' ? 'İleri Düzey' : 'Advanced'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Practice Lab Main Grid: Left Assignment List, Right Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Filtered Assignments List */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-2xs p-3 max-h-[750px] overflow-y-auto space-y-2">
            <div className="px-2 py-1 text-xs font-semibold text-slate-500">
              {filteredAssignments.length} {language === 'tr' ? 'Ödev Listeleniyor' : 'Assignments Found'}
            </div>

            {filteredAssignments.map((assignment) => {
              const isSelected = selectedAssignment.id === assignment.id;
              const submission = userProgress.assignmentSubmissions[assignment.id];

              return (
                <div
                  key={assignment.id}
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setAssessmentError(null);
                  }}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-2xs text-slate-500 mb-1">
                    <span className="font-semibold text-blue-700">
                      {language === 'tr' ? `${assignment.weekNumber}. Hafta` : `W${assignment.weekNumber}`}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 font-medium">
                      {assignment.difficulty === 'beginner' && (language === 'tr' ? 'Başlangıç' : 'Beginner')}
                      {assignment.difficulty === 'intermediate' && (language === 'tr' ? 'Orta' : 'Intermediate')}
                      {assignment.difficulty === 'advanced' && (language === 'tr' ? 'İleri' : 'Advanced')}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 leading-snug mb-1.5">
                    {language === 'tr' ? assignment.titleTr : assignment.titleEn}
                  </h4>

                  <div className="flex items-center justify-between text-2xs text-slate-500 pt-1 border-t border-slate-100/60">
                    <span>{assignment.estimatedMinutes} {language === 'tr' ? 'dk' : 'min'}</span>
                    {submission ? (
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {submission.score}p
                      </span>
                    ) : (
                      <span className="text-slate-400">{language === 'tr' ? 'Teslim edilmedi' : 'Not submitted'}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Assignment Workspace & Upload Engine */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Assignment Details Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-2xs font-semibold uppercase tracking-wider text-blue-700">
                    {language === 'tr' ? `${selectedAssignment.weekNumber}. Hafta Pratik Görevi` : `Week ${selectedAssignment.weekNumber} Practice Task`}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {language === 'tr' ? selectedAssignment.titleTr : selectedAssignment.titleEn}
                  </h2>
                </div>

                {/* Download Reference DOCX Button */}
                <button
                  type="button"
                  onClick={() => handleDownloadReferenceDocx(selectedAssignment)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('btnDownloadReference')}</span>
                </button>
              </div>

              {/* Objectives */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-800 block mb-1.5">
                  {language === 'tr' ? 'Öğrenme Amaçları:' : 'Learning Goals:'}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  {(language === 'tr' ? selectedAssignment.objectivesTr : selectedAssignment.objectivesEn).map((obj, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block mb-1">
                  {language === 'tr' ? 'Adım Adım Yönergeler:' : 'Step-by-Step Instructions:'}
                </span>
                {(language === 'tr' ? selectedAssignment.instructionsTr : selectedAssignment.instructionsEn).map((inst, i) => (
                  <p key={i} className="leading-relaxed">{inst}</p>
                ))}
              </div>

              {/* Rubric Breakdown (Machine-Readable Criteria) */}
              <div className="mb-6">
                <span className="text-xs font-bold text-slate-900 block mb-2">
                  {language === 'tr' ? 'Otomatik Değerlendirme Kriterleri (100 Puan):' : 'Automated Evaluation Criteria (100 pts):'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                  {selectedAssignment.rubric.map((r) => (
                    <div key={r.id} className="p-3 bg-blue-50/40 border border-blue-100 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-slate-900">{language === 'tr' ? r.titleTr : r.titleEn}</span>
                        <span className="font-mono font-bold text-blue-700 text-2xs">{r.points}p</span>
                      </div>
                      <p className="text-2xs text-slate-500 leading-normal">
                        {language === 'tr' ? r.expectedDescriptionTr : r.expectedDescriptionEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real DOCX Upload & Automated Assessment Engine Box */}
              <div className="p-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="docx-upload-input"
                />

                {isEvaluating ? (
                  <div className="py-6 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="w-8 h-8 text-blue-700 animate-spin" />
                    <span className="text-sm font-semibold text-slate-800">
                      {t('assessmentUploading')}
                    </span>
                    <span className="text-xs text-slate-500">
                      OOXML ZIP arşivi açılıyor ve etiketler denetleniyor...
                    </span>
                  </div>
                ) : (
                  <label htmlFor="docx-upload-input" className="cursor-pointer block py-4 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block">
                        {t('assessmentDropPrompt')}
                      </span>
                      <span className="text-xs text-slate-500 block mt-1">
                        {t('assessmentUploadNotice')}
                      </span>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t('btnUploadDocx')}</span>
                      </span>
                    </div>
                  </label>
                )}

                {/* Error Banner */}
                {assessmentError && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2 text-left">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{assessmentError}</span>
                  </div>
                )}
              </div>

              {/* Best previous score banner */}
              {currentSubmission && (
                <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      {language === 'tr' ? 'Bu ödevdeki en iyi skorunuz:' : 'Your best score on this assignment:'} <strong>{currentSubmission.score} / 100</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (assessmentResult) {
                        setIsReportModalOpen(true);
                      } else {
                        // Re-trigger upload prompt
                        fileInputRef.current?.click();
                      }
                    }}
                    className="font-bold underline cursor-pointer"
                  >
                    {language === 'tr' ? 'Yeniden Değerlendir' : 'Re-assess'}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Assessment Report Modal */}
      <AssessmentReportModal
        result={assessmentResult}
        onClose={() => setIsReportModalOpen(false)}
        onRetry={() => {
          setIsReportModalOpen(false);
          fileInputRef.current?.click();
        }}
      />
    </div>
  );
}
