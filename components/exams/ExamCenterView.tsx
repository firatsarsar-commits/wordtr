'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { initialQuestionBank } from '@/lib/question-bank';
import { ExamQuestion } from '@/lib/types';
import { recordExamAttempt } from '@/lib/progress-store';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Award,
  Play,
  Pause,
  Filter,
  Check
} from 'lucide-react';

export function ExamCenterView() {
  const { language, t } = useLanguage();

  // Load custom questions or fallback to initial question bank
  const questions: ExamQuestion[] = useMemo(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('wordlab_custom_question_bank');
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return initialQuestionBank;
  }, []);

  // Exam phase: 'intro' | 'running' | 'results'
  const [phase, setPhase] = useState<'intro' | 'running' | 'results'>('intro');
  const [examMode, setExamMode] = useState<'comprehensive' | 'topic' | 'quick'>('comprehensive');
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number>(1);
  const [enableTimer, setEnableTimer] = useState<boolean>(true);

  // Active exam questions
  const [activeQuestions, setActiveQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Timer: 60 minutes = 3600 seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const handleSubmitExam = () => {
    // Record to local storage
    let correctCount = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) correctCount++;
    });

    const score = activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0;

    recordExamAttempt({
      score,
      totalQuestions: activeQuestions.length,
      durationSeconds: elapsedSeconds,
      mode: examMode,
    });

    setPhase('results');
  };

  const handleSubmitExamRef = useRef(handleSubmitExam);
  useEffect(() => {
    handleSubmitExamRef.current = handleSubmitExam;
  });

  // Timer interval
  useEffect(() => {
    if (phase !== 'running' || !enableTimer || isTimerPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExamRef.current();
          return 0;
        }
        return prev - 1;
      });
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, enableTimer, isTimerPaused]);

  // Start exam handler
  const handleStartExam = () => {
    let pool = [...questions];

    if (examMode === 'topic') {
      pool = pool.filter((q) => q.weekNumber === selectedWeekFilter);
      if (pool.length === 0) pool = [...questions];
    } else if (examMode === 'quick') {
      // Shuffle and pick 15
      pool = pool.sort(() => Math.random() - 0.5).slice(0, 15);
    } else {
      // Comprehensive 50 questions
      pool = pool.sort(() => Math.random() - 0.5);
    }

    setActiveQuestions(pool);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(examMode === 'quick' ? 1200 : 3600); // 20m or 60m
    setElapsedSeconds(0);
    setIsTimerPaused(false);
    setPhase('running');
  };

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Results calculation
  const scoreStats = useMemo(() => {
    if (phase !== 'results' || activeQuestions.length === 0) return null;

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    const topicStats: Record<string, { total: number; correct: number }> = {};

    activeQuestions.forEach((q) => {
      const topic = language === 'tr' ? q.topicTr : q.topicEn;
      if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0 };
      topicStats[topic].total++;

      const chosen = userAnswers[q.id];
      if (!chosen) {
        unattempted++;
      } else if (chosen === q.correctOptionId) {
        correct++;
        topicStats[topic].correct++;
      } else {
        incorrect++;
      }
    });

    const percentage = Math.round((correct / activeQuestions.length) * 100);

    return {
      total: activeQuestions.length,
      correct,
      incorrect,
      unattempted,
      percentage,
      topicStats,
    };
  }, [phase, activeQuestions, userAnswers, language]);

  const currentQ = activeQuestions[currentIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 1. INTRO / SETUP SCREEN ================= */}
        {phase === 'intro' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>

              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
                {t('examTitle')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === 'tr' ? 'Bilişim Teknolojileri Deneme Sınavı' : 'Information Tech Practice Exam'}
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
                {language === 'tr'
                  ? 'Tüm 14 haftalık müfredatı kapsayan 50 özgün soru ile vize ve final sınavlarına eksiksiz hazırlanın. Sınav sonunda ayrıntılı konu analizi ve soru açıklamaları sunulur.'
                  : 'Master your exams with 50 curriculum-aligned questions covering all 14 weeks with topic-level diagnostic feedback.'}
              </p>
            </div>

            {/* Exam Mode Selection Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'tr' ? 'Sınav Modunu Seçin:' : 'Select Examination Mode:'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setExamMode('comprehensive')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    examMode === 'comprehensive'
                      ? 'border-blue-700 bg-blue-50/70 shadow-xs ring-1 ring-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-slate-900 text-sm block mb-1">
                    {language === 'tr' ? 'Kapsamlı Sınav' : 'Comprehensive'}
                  </span>
                  <span className="text-xs text-slate-500 block leading-normal">
                    {language === 'tr' ? '50 Soru · 60 Dakika · Tüm Müfredat' : '50 Questions · 60 Mins · Full Course'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setExamMode('quick')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    examMode === 'quick'
                      ? 'border-blue-700 bg-blue-50/70 shadow-xs ring-1 ring-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-slate-900 text-sm block mb-1">
                    {language === 'tr' ? 'Hızlı Test' : 'Quick Quiz'}
                  </span>
                  <span className="text-xs text-slate-500 block leading-normal">
                    {language === 'tr' ? '15 Soru · 20 Dakika · Rastgele' : '15 Questions · 20 Mins · Random'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setExamMode('topic')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    examMode === 'topic'
                      ? 'border-blue-700 bg-blue-50/70 shadow-xs ring-1 ring-blue-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-slate-900 text-sm block mb-1">
                    {language === 'tr' ? 'Haftalık Alıştırma' : 'Weekly Practice'}
                  </span>
                  <span className="text-xs text-slate-500 block leading-normal">
                    {language === 'tr' ? 'Belirli bir haftanın soruları' : 'Specific week questions'}
                  </span>
                </button>
              </div>

              {/* Week filter if topic mode */}
              {examMode === 'topic' && (
                <div className="pt-3 border-t border-slate-100 flex items-center gap-3 text-xs">
                  <span className="font-semibold text-slate-700">{language === 'tr' ? 'Hafta Seç:' : 'Select Week:'}</span>
                  <select
                    value={selectedWeekFilter}
                    onChange={(e) => setSelectedWeekFilter(Number(e.target.value))}
                    className="p-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 font-medium"
                  >
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>{language === 'tr' ? `${w}. Hafta` : `Week ${w}`}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Timer Toggle */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{language === 'tr' ? 'Sınav Sayacı (Geri Sayım)' : 'Exam Timer (Countdown)'}</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableTimer}
                  onChange={(e) => setEnableTimer(e.target.checked)}
                  className="rounded text-blue-700 cursor-pointer w-4 h-4"
                />
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleStartExam}
                className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{language === 'tr' ? 'Sınavı Başlat' : 'Begin Examination'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= 2. RUNNING EXAM SCREEN ================= */}
        {phase === 'running' && currentQ && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 Cols: Current Question */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700">
                    {language === 'tr' ? `Soru ${currentIndex + 1} / ${activeQuestions.length}` : `Question ${currentIndex + 1} of ${activeQuestions.length}`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'tr' ? `${currentQ.weekNumber}. Hafta` : `W${currentQ.weekNumber}`}</span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'tr' ? currentQ.topicTr : currentQ.topicEn}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQ.id] ? (language === 'tr' ? 'İşaretli' : 'Flagged') : (language === 'tr' ? 'İşaretle' : 'Flag')}</span>
                </button>
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {language === 'tr' ? currentQ.questionTr : currentQ.questionEn}
              </h2>

              {/* 4 Answer Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIndex) => {
                  const letter = String.fromCharCode(65 + optIndex);
                  const isSelected = userAnswers[currentQ.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQ.id, opt.id)}
                      className={`w-full p-4 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-blue-700 bg-blue-50/70 text-blue-950 font-semibold ring-1 ring-blue-700 shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {letter}
                      </span>
                      <span className="leading-relaxed">
                        {language === 'tr' ? opt.textTr : opt.textEn}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Question Navigation Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t('btnPrev')}</span>
                </button>

                {currentIndex < activeQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1 px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs cursor-pointer transition-colors"
                  >
                    <span>{t('btnNext')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(t('examSubmitConfirm'))) {
                        handleSubmitExam();
                      }
                    }}
                    className="inline-flex items-center gap-1 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-2xs cursor-pointer transition-colors"
                  >
                    <span>{language === 'tr' ? 'Sınavı Tamamla' : 'Finish Exam'}</span>
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Navigator Grid & Timer Card */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Timer Card */}
              {enableTimer && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className={`w-5 h-5 ${secondsRemaining < 300 ? 'text-rose-600 animate-pulse' : 'text-blue-700'}`} />
                    <div>
                      <span className="text-2xs uppercase text-slate-400 font-semibold block">{t('examTimeRemaining')}</span>
                      <span className={`text-xl font-mono font-bold ${secondsRemaining < 300 ? 'text-rose-600' : 'text-slate-900'}`}>
                        {formatTime(secondsRemaining)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsTimerPaused(!isTimerPaused)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                    title={isTimerPaused ? 'Devam Et' : 'Duraklat'}
                  >
                    {isTimerPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                  </button>
                </div>
              )}

              {/* Question Grid Navigator */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{t('examQuestionNav')}</span>
                  <span className="text-slate-500 font-normal">
                    {Object.keys(userAnswers).length} / {activeQuestions.length}
                  </span>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-5 gap-1.5 max-h-[300px] overflow-y-auto p-1">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isFlagged = !!flaggedQuestions[q.id];
                    const isCurrent = idx === currentIndex;

                    let btnCls = 'bg-slate-50 text-slate-700 border-slate-200';
                    if (isCurrent) {
                      btnCls = 'bg-blue-700 text-white border-blue-700 ring-2 ring-blue-300';
                    } else if (isFlagged) {
                      btnCls = 'bg-amber-100 text-amber-900 border-amber-300';
                    } else if (isAnswered) {
                      btnCls = 'bg-blue-100 text-blue-900 border-blue-200 font-semibold';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-8 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center ${btnCls}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1 text-2xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></div>
                    <span>{language === 'tr' ? 'Yanıtlanmış Soru' : 'Answered'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></div>
                    <span>{language === 'tr' ? 'İşaretlenmiş Soru' : 'Flagged for Review'}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(t('examSubmitConfirm'))) {
                      handleSubmitExam();
                    }
                  }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
                >
                  {language === 'tr' ? 'Sınavı Bitir ve Puanla' : 'Finish & Grade Exam'}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ================= 3. RESULTS SCREEN ================= */}
        {phase === 'results' && scoreStats && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Top Score Banner */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                {t('examResultsTitle')}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t('examCongratulations')}
              </p>

              {/* Big Score Callout */}
              <div className="my-6">
                <div className="text-5xl font-black text-blue-700 tracking-tight">
                  %{scoreStats.percentage}
                </div>
                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                  {scoreStats.correct} / {scoreStats.total} {language === 'tr' ? 'Doğru Yanıt' : 'Correct'}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-emerald-700 font-bold text-lg block">{scoreStats.correct}</span>
                  <span className="text-emerald-800 text-2xs">{language === 'tr' ? 'Doğru' : 'Correct'}</span>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <span className="text-rose-700 font-bold text-lg block">{scoreStats.incorrect}</span>
                  <span className="text-rose-800 text-2xs">{language === 'tr' ? 'Yanlış' : 'Incorrect'}</span>
                </div>
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl">
                  <span className="text-slate-700 font-bold text-lg block">{scoreStats.unattempted}</span>
                  <span className="text-slate-600 text-2xs">{language === 'tr' ? 'Boş' : 'Unattempted'}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPhase('intro')}
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'tr' ? 'Yeni Sınav Başlat' : 'Retake Exam'}</span>
                </button>
              </div>
            </div>

            {/* Topic Performance Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'tr' ? 'Konu Bazlı Performans Dağılımı' : 'Topic-Based Performance Breakdown'}
              </h3>

              <div className="space-y-3">
                {Object.entries(scoreStats.topicStats).map(([topic, stat]) => {
                  const percent = Math.round((stat.correct / stat.total) * 100);
                  return (
                    <div key={topic} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="font-semibold">{topic}</span>
                        <span className="font-mono text-2xs">{stat.correct} / {stat.total} (%{percent})</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${percent >= 70 ? 'bg-emerald-500' : percent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Question Review */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                {t('examReviewQuestions')}
              </h3>

              <div className="space-y-6">
                {activeQuestions.map((q, qIndex) => {
                  const userChoice = userAnswers[q.id];
                  const isCorrect = userChoice === q.correctOptionId;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border text-xs space-y-3 ${
                        isCorrect ? 'bg-emerald-50/30 border-emerald-200' : 'bg-rose-50/30 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-2xs text-slate-500">
                        <span className="font-bold text-slate-700">
                          {language === 'tr' ? `Soru ${qIndex + 1}` : `Question ${qIndex + 1}`} ({language === 'tr' ? `${q.weekNumber}. Hafta` : `W${q.weekNumber}`})
                        </span>
                        <span className={`font-bold px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {isCorrect ? (language === 'tr' ? 'DOĞRU' : 'CORRECT') : (language === 'tr' ? 'YANLIŞ' : 'INCORRECT')}
                        </span>
                      </div>

                      <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                        {language === 'tr' ? q.questionTr : q.questionEn}
                      </h4>

                      {/* Options listing */}
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt) => {
                          const isOptCorrect = opt.id === q.correctOptionId;
                          const isOptChosen = userChoice === opt.id;

                          let style = 'bg-white text-slate-700 border-slate-200';
                          if (isOptCorrect) {
                            style = 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold';
                          } else if (isOptChosen && !isOptCorrect) {
                            style = 'bg-rose-100 border-rose-300 text-rose-950 line-through';
                          }

                          return (
                            <div key={opt.id} className={`p-2.5 rounded-lg border flex items-center justify-between ${style}`}>
                              <span>{language === 'tr' ? opt.textTr : opt.textEn}</span>
                              {isOptCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                              {isOptChosen && !isOptCorrect && <XCircle className="w-4 h-4 text-rose-700" />}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div className="p-3 bg-white rounded-lg border border-slate-200 leading-relaxed text-slate-700">
                        <span className="font-bold text-slate-900 block mb-0.5">
                          {language === 'tr' ? 'Açıklama:' : 'Explanation:'}
                        </span>
                        <span>{language === 'tr' ? q.explanationTr : q.explanationEn}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
