'use client';

import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { AssessmentResult } from '@/lib/types';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Award, 
  RotateCcw, 
  X, 
  FileText,
  ThumbsUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AssessmentReportModalProps {
  result: AssessmentResult | null;
  onClose: () => void;
  onRetry: () => void;
}

export function AssessmentReportModal({
  result,
  onClose,
  onRetry,
}: AssessmentReportModalProps) {
  const { language, t } = useLanguage();

  if (!result) return null;

  const isSuccess = result.percentage >= 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-start justify-between ${isSuccess ? 'bg-emerald-50/70 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-xs ${
              isSuccess ? 'bg-emerald-600 text-white' : 'bg-blue-700 text-white'
            }`}>
              {result.percentage}%
            </div>
            <div>
              <span className="text-2xs font-semibold uppercase tracking-wider text-slate-500">
                {t('assessmentTitle')}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {result.fileName}
              </h3>
              <span className="text-xs text-slate-500">
                {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {result.totalScore} / {result.maxScore} {t('points')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Summary Feedback Callout */}
          <div className={`p-4 rounded-xl border leading-relaxed ${
            isSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <span className="font-bold block mb-1">
              {language === 'tr' ? 'Değerlendirme Özeti' : 'Evaluation Summary'}
            </span>
            <p>
              {language === 'tr' ? result.summaryFeedbackTr : result.summaryFeedbackEn}
            </p>
          </div>

          {/* Document Technical Metadata Snapshot */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div>
              <span className="text-2xs text-slate-400 block">{language === 'tr' ? 'Kelime Sayısı' : 'Word Count'}</span>
              <span className="font-bold text-slate-800 text-sm">{result.documentMetadata.wordCount}</span>
            </div>
            <div>
              <span className="text-2xs text-slate-400 block">{language === 'tr' ? 'Paragraf Sayısı' : 'Paragraphs'}</span>
              <span className="font-bold text-slate-800 text-sm">{result.documentMetadata.paragraphCount}</span>
            </div>
            <div>
              <span className="text-2xs text-slate-400 block">{language === 'tr' ? 'Tablo Sayısı' : 'Tables'}</span>
              <span className="font-bold text-slate-800 text-sm">{result.documentMetadata.tableCount}</span>
            </div>
            <div>
              <span className="text-2xs text-slate-400 block">{language === 'tr' ? 'Yazı Tipleri' : 'Fonts'}</span>
              <span className="font-bold text-slate-800 text-2xs truncate block" title={result.documentMetadata.primaryFonts.join(', ')}>
                {result.documentMetadata.primaryFonts.join(', ') || 'Varsayılan'}
              </span>
            </div>
          </div>

          {/* Detailed Criteria Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>{t('assessmentScoreBreakdown')}</span>
              <span className="text-xs font-medium text-slate-500">
                {result.criteriaResults.filter(c => c.passed).length} / {result.criteriaResults.length} {language === 'tr' ? 'Kriter Sağlandı' : 'Passed'}
              </span>
            </h4>

            <div className="space-y-2.5">
              {result.criteriaResults.map((crit) => {
                const passed = crit.passed;
                return (
                  <div
                    key={crit.rubricItemId}
                    className={`p-3.5 rounded-xl border transition-all ${
                      passed ? 'bg-white border-slate-200' : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        {passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span className="font-bold text-slate-900">
                          {language === 'tr' ? crit.titleTr : crit.titleEn}
                        </span>
                      </div>
                      
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-2xs ${
                        passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {crit.awardedPoints} / {crit.maxPoints} p
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed ml-6">
                      {language === 'tr' ? crit.feedbackTr : crit.feedbackEn}
                    </p>

                    {crit.detectedValue && (
                      <div className="mt-2 ml-6 text-2xs text-slate-500 flex items-center gap-2">
                        <span>{language === 'tr' ? 'Tespit edilen:' : 'Detected:'} <strong className="text-slate-700">{crit.detectedValue}</strong></span>
                        {crit.expectedValue && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{language === 'tr' ? 'Beklenen:' : 'Expected:'} <strong className="text-slate-700">{crit.expectedValue}</strong></span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actionable Improvement Suggestions */}
          {result.improvementsTr.length > 0 && (
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-2">
              <h5 className="font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>{t('assessmentSuggestions')}</span>
              </h5>
              <ul className="space-y-1.5 text-amber-900">
                {(language === 'tr' ? result.improvementsTr : result.improvementsEn).map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="font-bold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {t('btnClose')}
          </button>

          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('btnReassess')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
