'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../common/LanguageContext';
import { initialQuestionBank } from '@/lib/question-bank';
import { ExamQuestion } from '@/lib/types';
import { 
  FolderEdit, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  RotateCcw, 
  AlertCircle, 
  Check, 
  X,
  FileQuestion
} from 'lucide-react';

export function QuestionBankManager() {
  const { language, t } = useLanguage();
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('wordlab_custom_question_bank');
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    return initialQuestionBank;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWeek, setFilterWeek] = useState<number | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  // Modal for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<ExamQuestion | null>(null);

  // Form state
  const [formWeek, setFormWeek] = useState<number>(1);
  const [formTopicTr, setFormTopicTr] = useState('');
  const [formTopicEn, setFormTopicEn] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [formQuestionTr, setFormQuestionTr] = useState('');
  const [formQuestionEn, setFormQuestionEn] = useState('');
  const [formOptA_Tr, setFormOptA_Tr] = useState('');
  const [formOptA_En, setFormOptA_En] = useState('');
  const [formOptB_Tr, setFormOptB_Tr] = useState('');
  const [formOptB_En, setFormOptB_En] = useState('');
  const [formOptC_Tr, setFormOptC_Tr] = useState('');
  const [formOptC_En, setFormOptC_En] = useState('');
  const [formOptD_Tr, setFormOptD_Tr] = useState('');
  const [formOptD_En, setFormOptD_En] = useState('');
  const [formCorrectOpt, setFormCorrectOpt] = useState<'o1' | 'o2' | 'o3' | 'o4'>('o1');
  const [formExplanationTr, setFormExplanationTr] = useState('');
  const [formExplanationEn, setFormExplanationEn] = useState('');

  // Save changes
  const saveToStorage = (updated: ExamQuestion[]) => {
    setQuestions(updated);
    try {
      localStorage.setItem('wordlab_custom_question_bank', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetToDefault = () => {
    if (confirm(language === 'tr' ? 'Tüm özel değişiklikler silinip varsayılan 50 soruya dönülecektir. Onaylıyor musunuz?' : 'Reset all changes to default 50 questions?')) {
      saveToStorage(initialQuestionBank);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm(language === 'tr' ? 'Bu soruyu silmek istediğinize emin misiniz?' : 'Delete this question?')) {
      const updated = questions.filter((q) => q.id !== id);
      saveToStorage(updated);
    }
  };

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormWeek(1);
    setFormTopicTr('');
    setFormTopicEn('');
    setFormDifficulty('medium');
    setFormQuestionTr('');
    setFormQuestionEn('');
    setFormOptA_Tr('');
    setFormOptA_En('');
    setFormOptB_Tr('');
    setFormOptB_En('');
    setFormOptC_Tr('');
    setFormOptC_En('');
    setFormOptD_Tr('');
    setFormOptD_En('');
    setFormCorrectOpt('o1');
    setFormExplanationTr('');
    setFormExplanationEn('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q: ExamQuestion) => {
    setEditingQuestion(q);
    setFormWeek(q.weekNumber);
    setFormTopicTr(q.topicTr);
    setFormTopicEn(q.topicEn);
    setFormDifficulty(q.difficulty);
    setFormQuestionTr(q.questionTr);
    setFormQuestionEn(q.questionEn);
    setFormOptA_Tr(q.options[0]?.textTr || '');
    setFormOptA_En(q.options[0]?.textEn || '');
    setFormOptB_Tr(q.options[1]?.textTr || '');
    setFormOptB_En(q.options[1]?.textEn || '');
    setFormOptC_Tr(q.options[2]?.textTr || '');
    setFormOptC_En(q.options[2]?.textEn || '');
    setFormOptD_Tr(q.options[3]?.textTr || '');
    setFormOptD_En(q.options[3]?.textEn || '');
    setFormCorrectOpt((q.correctOptionId as any) || 'o1');
    setFormExplanationTr(q.explanationTr);
    setFormExplanationEn(q.explanationEn);
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formQuestionTr.trim() || !formOptA_Tr.trim() || !formOptB_Tr.trim()) {
      alert(language === 'tr' ? 'Lütfen en az soru metnini ve ilk iki seçeneği doldurun.' : 'Please fill required fields.');
      return;
    }

    const questionItem: ExamQuestion = {
      id: editingQuestion ? editingQuestion.id : `custom-q-${Date.now()}`,
      weekNumber: formWeek,
      topicTr: formTopicTr || 'Genel Konu',
      topicEn: formTopicEn || formTopicTr || 'General Topic',
      difficulty: formDifficulty,
      cognitiveLevel: 'application',
      questionTr: formQuestionTr,
      questionEn: formQuestionEn || formQuestionTr,
      options: [
        { id: 'o1', textTr: formOptA_Tr, textEn: formOptA_En || formOptA_Tr },
        { id: 'o2', textTr: formOptB_Tr, textEn: formOptB_En || formOptB_Tr },
        { id: 'o3', textTr: formOptC_Tr, textEn: formOptC_En || formOptC_Tr },
        { id: 'o4', textTr: formOptD_Tr, textEn: formOptD_En || formOptD_Tr },
      ],
      correctOptionId: formCorrectOpt,
      explanationTr: formExplanationTr || 'Soru açıklaması.',
      explanationEn: formExplanationEn || formExplanationTr || 'Question explanation.',
      isCustom: true,
    };

    let updated: ExamQuestion[];
    if (editingQuestion) {
      updated = questions.map((q) => (q.id === editingQuestion.id ? questionItem : q));
    } else {
      updated = [questionItem, ...questions];
    }

    saveToStorage(updated);
    setIsModalOpen(false);
  };

  // Filtered
  const filtered = questions.filter((q) => {
    if (filterWeek !== 'all' && q.weekNumber !== filterWeek) return false;
    if (filterDifficulty !== 'all' && q.difficulty !== filterDifficulty) return false;
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      const matchTr = q.questionTr.toLowerCase().includes(s) || q.topicTr.toLowerCase().includes(s);
      const matchEn = q.questionEn.toLowerCase().includes(s) || q.topicEn.toLowerCase().includes(s);
      if (!matchTr && !matchEn) return false;
    }
    return true;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
                {language === 'tr' ? 'Sınav Hazırlık Yönetimi' : 'Exam Content Management'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t('bankTitle')}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                {t('bankSubtitle')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('bankResetDefault')}</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t('bankAddQuestion')}</span>
              </button>
            </div>
          </div>

          {/* Mandatory Antigravity Architecture Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-2xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{t('bankNotice')}</span>
          </div>

          {/* Filter Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('bankSearchPlaceholder')}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Week Filter */}
            <select
              value={filterWeek}
              onChange={(e) => setFilterWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
            >
              <option value="all">{t('bankAllWeeks')}</option>
              {Array.from({ length: 14 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>{language === 'tr' ? `${w}. Hafta` : `Week ${w}`}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
            >
              <option value="all">{t('bankAllDifficulties')}</option>
              <option value="easy">{language === 'tr' ? 'Kolay' : 'Easy'}</option>
              <option value="medium">{language === 'tr' ? 'Orta' : 'Medium'}</option>
              <option value="hard">{language === 'tr' ? 'Zor' : 'Hard'}</option>
            </select>
          </div>
        </div>

        {/* Questions Table / List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{filtered.length} {language === 'tr' ? 'Soru Bulundu' : 'Questions Found'}</span>
            <span>{questions.length} {language === 'tr' ? 'Toplam Soru Bankası Hacmi' : 'Total Bank Capacity'}</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.map((q, idx) => (
              <div key={q.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-2xs text-slate-500">
                      <span className="font-bold text-blue-700">
                        {language === 'tr' ? `${q.weekNumber}. Hafta` : `W${q.weekNumber}`}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-600">
                        {language === 'tr' ? q.topicTr : q.topicEn}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 font-semibold uppercase">
                        {q.difficulty}
                      </span>
                      {q.isCustom && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                          {language === 'tr' ? 'Özel Eklenen' : 'Custom'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {idx + 1}. {language === 'tr' ? q.questionTr : q.questionEn}
                    </h4>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(q)}
                      className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                      title={language === 'tr' ? 'Düzenle' : 'Edit'}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      title={language === 'tr' ? 'Sil' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 4 Options Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 mt-3">
                  {q.options.map((opt) => {
                    const isCorrect = opt.id === q.correctOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-2 rounded-md border flex items-center justify-between ${
                          isCorrect ? 'bg-emerald-50/70 border-emerald-200 font-semibold text-emerald-950' : 'bg-white border-slate-100'
                        }`}
                      >
                        <span>{language === 'tr' ? opt.textTr : opt.textEn}</span>
                        {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-12 text-center text-slate-500 text-xs">
                {language === 'tr' ? 'Aramanıza uygun soru bulunamadı.' : 'No questions matching criteria.'}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Add / Edit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingQuestion
                  ? (language === 'tr' ? 'Soruyu Düzenle' : 'Edit Question')
                  : (language === 'tr' ? 'Yeni Soru Ekle' : 'Add Question')}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'tr' ? 'Hafta' : 'Week'}
                  </label>
                  <select
                    value={formWeek}
                    onChange={(e) => setFormWeek(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>{language === 'tr' ? `${w}. Hafta` : `Week ${w}`}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'tr' ? 'Zorluk' : 'Difficulty'}
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as any)}
                    className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50"
                  >
                    <option value="easy">{language === 'tr' ? 'Kolay' : 'Easy'}</option>
                    <option value="medium">{language === 'tr' ? 'Orta' : 'Medium'}</option>
                    <option value="hard">{language === 'tr' ? 'Zor' : 'Hard'}</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'tr' ? 'Konu Başlığı' : 'Topic Title'}
                  </label>
                  <input
                    type="text"
                    value={formTopicTr}
                    onChange={(e) => setFormTopicTr(e.target.value)}
                    placeholder="Örn: Paragraf Hizalama"
                    className="w-full p-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Question Text (TR) */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'tr' ? 'Soru Metni (Türkçe)' : 'Question Text (Turkish)'} *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formQuestionTr}
                  onChange={(e) => setFormQuestionTr(e.target.value)}
                  placeholder="Soru kökünü buraya yazın..."
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="font-semibold text-slate-700 block">
                  {language === 'tr' ? 'Şıklar ve Doğru Cevap:' : 'Options & Correct Answer:'}
                </label>

                {[
                  { id: 'o1', label: 'A Şıkkı', val: formOptA_Tr, setVal: setFormOptA_Tr },
                  { id: 'o2', label: 'B Şıkkı', val: formOptB_Tr, setVal: setFormOptB_Tr },
                  { id: 'o3', label: 'C Şıkkı', val: formOptC_Tr, setVal: setFormOptC_Tr },
                  { id: 'o4', label: 'D Şıkkı', val: formOptD_Tr, setVal: setFormOptD_Tr },
                ].map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={formCorrectOpt === opt.id}
                      onChange={() => setFormCorrectOpt(opt.id as any)}
                      className="text-blue-700 cursor-pointer"
                      title={language === 'tr' ? 'Bu şıkkı doğru cevap olarak işaretle' : 'Mark as correct'}
                    />
                    <input
                      type="text"
                      required
                      value={opt.val}
                      onChange={(e) => opt.setVal(e.target.value)}
                      placeholder={`${opt.label} metni...`}
                      className="flex-1 p-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Explanation */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'tr' ? 'Çözüm Açıklaması' : 'Explanation'}
                </label>
                <textarea
                  rows={2}
                  value={formExplanationTr}
                  onChange={(e) => setFormExplanationTr(e.target.value)}
                  placeholder="Doğru cevabın pedagojik açıklaması..."
                  className="w-full p-2 border border-slate-200 rounded-lg"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
                >
                  {t('btnClose')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-2xs"
                >
                  {language === 'tr' ? 'Kaydet' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
