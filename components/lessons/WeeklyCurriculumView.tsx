'use client';

import React, { useState } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { useCurriculum } from '@/hooks/useCurriculum';
import { parseVideoUrl } from '@/lib/video-utils';
import { WeekCurriculum, InteractiveActivity } from '@/lib/types';
import { markActivityCompleted, markWeekCompleted } from '@/lib/progress-store';
import { 
  Video, 
  BookOpen, 
  Compass, 
  FileCheck2, 
  HelpCircle, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ChevronRight, 
  ExternalLink, 
  ArrowRight,
  Download,
  Upload,
  Check,
  RotateCcw
} from 'lucide-react';

interface WeeklyCurriculumViewProps {
  selectedWeekNum: number;
  onSelectWeek: (weekNum: number) => void;
  onNavigateToAssignment?: (assignmentId: string) => void;
}

export function WeeklyCurriculumView({
  selectedWeekNum,
  onSelectWeek,
  onNavigateToAssignment,
}: WeeklyCurriculumViewProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'watch' | 'learn' | 'explore' | 'practice' | 'assess' | 'reflect'>('watch');
  
  // Interactive activity states
  const [activityAnswers, setActivityAnswers] = useState<Record<string, string>>({});
  const [activityResults, setActivityResults] = useState<Record<string, boolean | null>>({});
  const [shownHints, setShownHints] = useState<Record<string, boolean>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<string, Record<string, string>>>({});
  
  // Formative quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const { curriculum } = useCurriculum();
  const currentWeek: WeekCurriculum = curriculum.find((w) => w.weekNumber === selectedWeekNum) || curriculum[0];

  const handleSelectOption = (activityId: string, optionId: string, isCorrect: boolean) => {
    setActivityAnswers((prev) => ({ ...prev, [activityId]: optionId }));
    setActivityResults((prev) => ({ ...prev, [activityId]: isCorrect }));
    if (isCorrect) {
      markActivityCompleted(activityId);
    }
  };

  const toggleHint = (activityId: string) => {
    setShownHints((prev) => ({ ...prev, [activityId]: !prev[activityId] }));
  };

  const handleQuizAnswer = (questionId: string, optionId: string) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Week Selector Bar (All 14 Weeks Accessible) */}
        <div className="mb-6 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'tr' ? '14 Haftalık Müfredat Gezgini' : '14-Week Curriculum Navigator'}
            </span>
            <span className="text-xs text-slate-500">
              {language === 'tr' ? `Seçili: ${currentWeek.weekNumber}. Hafta` : `Selected: Week ${currentWeek.weekNumber}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {curriculum.map((week) => {
              const isSelected = week.weekNumber === selectedWeekNum;
              return (
                <button
                  key={week.weekNumber}
                  type="button"
                  onClick={() => {
                    onSelectWeek(week.weekNumber);
                    setActiveTab('watch');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {language === 'tr' ? `${week.weekNumber}. Hafta` : `W${week.weekNumber}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Week Header Banner */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                <span>{language === 'tr' ? `${currentWeek.weekNumber}. Hafta` : `Week ${currentWeek.weekNumber}`}</span>
                <span aria-hidden="true">·</span>
                <span>{language === 'tr' ? currentWeek.taglineTr : currentWeek.taglineEn}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === 'tr' ? currentWeek.titleTr : currentWeek.titleEn}
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {language === 'tr' ? currentWeek.introductionTr : currentWeek.introductionEn}
              </p>
            </div>

            {/* Quick stats unboxed */}
            <div className="flex md:flex-col items-center md:items-end gap-3 text-xs text-slate-500 shrink-0">
              <span>{currentWeek.objectives.length} {language === 'tr' ? 'Öğrenme Hedefi' : 'Objectives'}</span>
              <span>{currentWeek.assignments.length} {language === 'tr' ? 'Pratik Ödev' : 'Assignments'}</span>
              <span>{currentWeek.formativeQuiz.length} {language === 'tr' ? 'Quiz Sorusu' : 'Quiz Items'}</span>
            </div>
          </div>

          {/* Objectives and Prerequisites Dropdown/Collapsible Box */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Learning Objectives */}
            <div className="bg-blue-50/50 p-3.5 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <span>{language === 'tr' ? 'Öğrenme Hedefleri' : 'Learning Objectives'}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-700">
                {currentWeek.objectives.map((obj) => (
                  <li key={obj.id} className="flex items-start gap-1.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{language === 'tr' ? obj.textTr : obj.textEn}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-slate-600" />
                <span>{language === 'tr' ? 'Ön Koşul Bilgileri' : 'Prerequisites'}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                {(language === 'tr' ? currentWeek.prerequisitesTr : currentWeek.prerequisitesEn).map((prereq, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-slate-400">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 6 Stage Navigation Tabs: WATCH, LEARN, EXPLORE, PRACTICE, ASSESS, REFLECT */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs mb-6 overflow-x-auto">
          {[
            { id: 'watch', label: t('tabWatch'), icon: Video, count: currentWeek.videos.length },
            { id: 'learn', label: t('tabLearn'), icon: BookOpen, count: currentWeek.writtenGuides.length },
            { id: 'explore', label: t('tabExplore'), icon: Compass, count: currentWeek.activities.length },
            { id: 'practice', label: t('tabPractice'), icon: FileCheck2, count: currentWeek.assignments.length },
            { id: 'assess', label: t('tabAssess'), icon: HelpCircle, count: currentWeek.formativeQuiz.length },
            { id: 'reflect', label: t('tabReflect'), icon: Bookmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-2xs px-1.5 py-0.2 rounded font-medium ${isActive ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: WATCH (İzle) ================= */}
        {activeTab === 'watch' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {language === 'tr' ? 'Eğitim Videoları' : 'Educational Videos'}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {language === 'tr' 
                  ? 'Konuyu pekiştiren doğrulanmış eğitim videoları. Doğrulanmamış kaynaklar için fake oynatıcı gösterilmez.'
                  : 'Verified educational videos. Non-verified topics display clean placeholders without fake players.'}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentWeek.videos.map((vid) => {
                  const videoInfo = parseVideoUrl(vid.url, vid.youtubeId);

                  return (
                    <div key={vid.id} className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col">
                      {/* Video Embed or Clean Placeholder */}
                      {videoInfo.embedUrl ? (
                        <div className="relative aspect-video w-full bg-slate-900">
                          <iframe
                            src={videoInfo.embedUrl}
                            title={language === 'tr' ? vid.titleTr : vid.titleEn}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      ) : videoInfo.directUrl ? (
                        <div className="aspect-video w-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center text-white border-b border-slate-200">
                          <div className="w-12 h-12 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center mb-3">
                            <Video className="w-6 h-6" />
                          </div>
                          <h4 className="text-sm font-semibold mb-2">{language === 'tr' ? vid.titleTr : vid.titleEn}</h4>
                          <a
                            href={videoInfo.directUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <span>{language === 'tr' ? 'Videoyu Yeni Sekmede İzle' : 'Watch Video in New Tab'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-slate-100 flex flex-col items-center justify-center p-6 text-center border-b border-slate-200">
                          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-3">
                            <Video className="w-6 h-6" />
                          </div>
                          <h4 className="text-sm font-semibold text-slate-800 mb-1">
                            {language === 'tr' ? 'Bu konu için video eklenecek.' : 'Video will be added for this topic.'}
                          </h4>
                          <p className="text-xs text-slate-500 max-w-xs">
                            {language === 'tr' ? vid.notesTr || 'Video bağlantısı henüz tanımlanmamış.' : vid.notesEn || 'Video link not configured yet.'}
                          </p>
                        </div>
                      )}

                      <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              {language === 'tr' ? vid.titleTr : vid.titleEn}
                            </h4>
                            {videoInfo.directUrl && (
                              <a
                                href={videoInfo.directUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xs font-semibold text-blue-600 hover:text-blue-800 shrink-0 inline-flex items-center gap-1"
                                title="Yeni sekmede aç"
                              >
                                <span>{videoInfo.type === 'youtube' ? 'YouTube' : 'Bağlantı'}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>{vid.channel}</span>
                            {vid.duration && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{vid.duration}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {vid.notesTr && (
                          <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                            {language === 'tr' ? vid.notesTr : vid.notesEn}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LEARN (Öğren) ================= */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {currentWeek.writtenGuides.map((guide) => (
              <div key={guide.id} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs">
                <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                  {language === 'tr' ? guide.headingTr : guide.headingEn}
                </h3>

                <div className="space-y-8">
                  {guide.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-base font-semibold text-slate-800">
                        {language === 'tr' ? sec.subheadingTr : sec.subheadingEn}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {language === 'tr' ? sec.contentTr : sec.contentEn}
                      </p>

                      {/* Ribbon Path Guide */}
                      {sec.ribbonPathTr && (
                        <div className="bg-blue-50/60 border border-blue-200/80 rounded-lg p-3 text-xs text-blue-900 flex items-center gap-2">
                          <span className="font-semibold uppercase tracking-wider text-2xs bg-blue-200/60 px-1.5 py-0.5 rounded">
                            {language === 'tr' ? 'Şerit Yolu' : 'Ribbon Path'}
                          </span>
                          <span className="font-medium">
                            {language === 'tr' ? sec.ribbonPathTr : sec.ribbonPathEn}
                          </span>
                        </div>
                      )}

                      {/* Keyboard shortcut */}
                      {sec.keyboardShortcut && (
                        <div className="text-xs text-slate-500 font-mono bg-slate-50 border border-slate-200 rounded-md p-2">
                          {sec.keyboardShortcut}
                        </div>
                      )}

                      {/* Callout Tip */}
                      {sec.calloutTipTr && (
                        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>{language === 'tr' ? sec.calloutTipTr : sec.calloutTipEn}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TAB 3: EXPLORE (Keşfet - Etkileşimli Etkinlikler) ================= */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {language === 'tr' ? 'Etkileşimli Öğrenme Etkinlikleri' : 'Interactive Learning Activities'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'tr'
                  ? 'Komutları tanıyın, adımları sıralayın ve anlık dönütlerle bilgilerinizi pekiştirin.'
                  : 'Identify commands, sequence steps, and reinforce learning with instant feedback.'}
              </p>
            </div>

            {currentWeek.activities.map((act) => {
              const selectedOption = activityAnswers[act.id];
              const result = activityResults[act.id];
              const isHintShown = shownHints[act.id];

              return (
                <div key={act.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      {act.type === 'identify_command' && (language === 'tr' ? 'Komut Tanıma' : 'Command ID')}
                      {act.type === 'match_commands' && (language === 'tr' ? 'Eşleştirme' : 'Matching')}
                      {act.type === 'formatting_choice' && (language === 'tr' ? 'Biçimlendirme Kararı' : 'Formatting Choice')}
                      {act.type === 'reorder_steps' && (language === 'tr' ? 'İşlem Sıralama' : 'Reorder Steps')}
                      {act.type === 'find_mistake' && (language === 'tr' ? 'Biçimlendirme Hatası Bulma' : 'Find Mistake')}
                    </span>
                    
                    <button
                      type="button"
                      onClick={() => toggleHint(act.id)}
                      className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-medium cursor-pointer"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{isHintShown ? t('btnHideHint') : t('btnShowHint')}</span>
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {language === 'tr' ? act.titleTr : act.titleEn}
                  </h4>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {language === 'tr' ? act.descriptionTr : act.descriptionEn}
                  </p>

                  {/* Hint Box */}
                  {isHintShown && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{language === 'tr' ? act.hintTr : act.hintEn}</span>
                    </div>
                  )}

                  {/* Multiple Choice Activity Rendering */}
                  {act.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {act.options.map((opt) => {
                        const isSelected = selectedOption === opt.id;
                        let btnStyle = 'border-slate-200 hover:border-blue-400 bg-white text-slate-800';
                        if (isSelected) {
                          btnStyle = opt.isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                            : 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500';
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(act.id, opt.id, opt.isCorrect)}
                            className={`p-3.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{language === 'tr' ? opt.textTr : opt.textEn}</span>
                            {isSelected && (
                              opt.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Matching Activity Rendering */}
                  {act.pairs && (
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-slate-500 mb-2 font-medium">
                        {language === 'tr' ? 'Kısayollar ve İşlevleri:' : 'Shortcuts and Functions:'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {act.pairs.map((pair) => (
                          <div key={pair.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
                            <span className="font-mono font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                              {pair.leftTr}
                            </span>
                            <span className="text-slate-700 font-medium">
                              {language === 'tr' ? pair.rightTr : pair.rightEn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reorder Steps Activity Rendering */}
                  {act.steps && (
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-slate-500 mb-2 font-medium">
                        {language === 'tr' ? 'Doğru İş Akışı Sırası:' : 'Correct Workflow Sequence:'}
                      </div>
                      <div className="space-y-1.5">
                        {act.steps
                          .sort((a, b) => a.correctOrder - b.correctOrder)
                          .map((step) => (
                            <div key={step.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center shrink-0">
                                {step.correctOrder}
                              </span>
                              <span className="text-slate-700 font-medium">
                                {language === 'tr' ? step.textTr : step.textEn}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation feedback */}
                  {selectedOption && (
                    <div className={`p-4 rounded-lg text-xs leading-relaxed ${result ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                      <span className="font-bold block mb-1">
                        {result ? (language === 'tr' ? 'Doğru Cevap!' : 'Correct Answer!') : (language === 'tr' ? 'Tekrar Deneyin:' : 'Incorrect, try again:')}
                      </span>
                      <span>{language === 'tr' ? act.explanationTr : act.explanationEn}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 4: PRACTICE (Pratik Yap - 4-5 Ödev) ================= */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {language === 'tr' ? `${currentWeek.weekNumber}. Hafta Pratik Uygulama Ödevleri` : `Week ${currentWeek.weekNumber} Practice Assignments`}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'tr'
                  ? 'Her ödev için örnek DOCX dosyasını indirin, Microsoft Word\'de tamamlayın ve sisteme yükleyip kural tabanlı değerlendirme alın.'
                  : 'Download the reference DOCX, complete the task in Microsoft Word, and upload for automated OOXML assessment.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {currentWeek.assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                        <span>{language === 'tr' ? assignment.titleTr : assignment.titleEn}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {language === 'tr' ? assignment.titleTr : assignment.titleEn}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                        {assignment.difficulty === 'beginner' && (language === 'tr' ? 'Başlangıç' : 'Beginner')}
                        {assignment.difficulty === 'intermediate' && (language === 'tr' ? 'Orta' : 'Intermediate')}
                        {assignment.difficulty === 'advanced' && (language === 'tr' ? 'İleri' : 'Advanced')}
                      </span>
                      <span>{assignment.estimatedMinutes} {language === 'tr' ? 'dk' : 'mins'}</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="my-3 space-y-1 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-900 block mb-1">
                      {language === 'tr' ? 'Yönergeler:' : 'Instructions:'}
                    </span>
                    {(language === 'tr' ? assignment.instructionsTr : assignment.instructionsEn).map((inst, i) => (
                      <p key={i} className="leading-relaxed">{inst}</p>
                    ))}
                  </div>

                  {/* Rubric criteria breakdown */}
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-700 block mb-2">
                      {language === 'tr' ? 'Değerlendirme Ölçütleri (100 Puan):' : 'Assessment Rubric (100 pts):'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {assignment.rubric.map((r) => (
                        <div key={r.id} className="p-2 bg-blue-50/40 border border-blue-100 rounded text-slate-700 flex justify-between items-center">
                          <span>{language === 'tr' ? r.titleTr : r.titleEn}</span>
                          <span className="font-bold text-blue-800">{r.points}p</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to Practice Lab */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => onNavigateToAssignment?.(assignment.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>{language === 'tr' ? 'Bu Ödevi Laboratuvarda Çöz ve Yükle' : 'Solve & Upload in Practice Lab'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: ASSESS (Değerlendir - Biçimlendirici Quiz) ================= */}
        {activeTab === 'assess' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs mb-6">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {language === 'tr' ? `${currentWeek.weekNumber}. Hafta Biçimlendirici Değerlendirme` : `Week ${currentWeek.weekNumber} Formative Assessment`}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'tr'
                  ? 'Haftalık kazanımları ölçen kısa değerlendirme testi. Cevaplarınızı işaretleyip kontrol edin.'
                  : 'Short formative quiz to evaluate your weekly competencies.'}
              </p>
            </div>

            <div className="space-y-6">
              {currentWeek.formativeQuiz.map((q, qIndex) => {
                const selectedOpt = quizAnswers[q.id];
                const isAnswered = !!selectedOpt;

                return (
                  <div key={q.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        {language === 'tr' ? `Soru ${qIndex + 1}` : `Question ${qIndex + 1}`}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 mb-4 leading-snug">
                      {language === 'tr' ? q.questionTr : q.questionEn}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {q.options.map((opt) => {
                        const isChosen = selectedOpt === opt.id;
                        let optStyle = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300';

                        if (quizSubmitted) {
                          if (opt.id === q.correctOptionId) {
                            optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                          } else if (isChosen) {
                            optStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500';
                          }
                        } else if (isChosen) {
                          optStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-600';
                        }

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleQuizAnswer(q.id, opt.id)}
                            className={`p-3.5 rounded-lg border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${optStyle}`}
                          >
                            <span>{language === 'tr' ? opt.textTr : opt.textEn}</span>
                            {quizSubmitted && opt.id === q.correctOptionId && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                            {quizSubmitted && isChosen && opt.id !== q.correctOptionId && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                        <span className="font-semibold block mb-1 text-slate-900">
                          {language === 'tr' ? 'Pedagojik Açıklama:' : 'Pedagogical Explanation:'}
                        </span>
                        <span>{language === 'tr' ? q.explanationTr : q.explanationEn}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit Quiz Actions */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {Object.keys(quizAnswers).length} / {currentWeek.formativeQuiz.length} {language === 'tr' ? 'Soru yanıtlandı' : 'Questions answered'}
                </span>

                <div className="flex items-center gap-2">
                  {quizSubmitted ? (
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                      <span>{t('btnTryAgain')}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(quizAnswers).length === 0}
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t('btnCheck')}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: REFLECT (Özet) ================= */}
        {activeTab === 'reflect' && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
              {language === 'tr' ? `${currentWeek.weekNumber}. Hafta Özeti ve Kazanımlar` : `Week ${currentWeek.weekNumber} Summary & Takeaways`}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
              {language === 'tr' ? currentWeek.summaryTr : currentWeek.summaryEn}
            </p>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">
                  {language === 'tr' ? 'Bu Haftayı Tamamladınız mı?' : 'Completed this Week?'}
                </h4>
                <p className="text-xs text-blue-700">
                  {language === 'tr' 
                    ? 'İlerlemenizi yerel profilinize kaydetmek için haftayı tamamlandı olarak işaretleyebilirsiniz.'
                    : 'Mark this module as complete to record your self-paced progress.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  markWeekCompleted(currentWeek.weekNumber);
                  alert(language === 'tr' ? `${currentWeek.weekNumber}. Hafta tamamlandı olarak kaydedildi!` : `Week ${currentWeek.weekNumber} marked as complete!`);
                }}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg cursor-pointer shrink-0 shadow-2xs"
              >
                {language === 'tr' ? 'Tamamlandı Olarak İşaretle' : 'Mark as Completed'}
              </button>
            </div>

            {/* Next Week CTA */}
            {currentWeek.weekNumber < 14 && (
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onSelectWeek(currentWeek.weekNumber + 1);
                    setActiveTab('watch');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  <span>{language === 'tr' ? `Sonraki Hafta (${currentWeek.weekNumber + 1}. Hafta)` : `Next Week (${currentWeek.weekNumber + 1})`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
