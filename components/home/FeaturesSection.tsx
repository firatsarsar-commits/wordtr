'use client';

import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { 
  BookOpen, 
  FileCheck2, 
  GraduationCap, 
  Cpu, 
  Sparkles, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface FeaturesSectionProps {
  onGoToCurriculum: () => void;
  onGoToPractice: () => void;
  onGoToExams: () => void;
}

export function FeaturesSection({
  onGoToCurriculum,
  onGoToPractice,
  onGoToExams,
}: FeaturesSectionProps) {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t('featureCurriculumTitle'),
      desc: t('featureCurriculumDesc'),
      action: onGoToCurriculum,
      actionLabel: language === 'tr' ? 'Müfredatı Gör' : 'View Curriculum',
    },
    {
      icon: FileCheck2,
      title: t('featureDocxTitle'),
      desc: t('featureDocxDesc'),
      action: onGoToPractice,
      actionLabel: language === 'tr' ? 'Laboratuvara Git' : 'Go to Practice Lab',
    },
    {
      icon: GraduationCap,
      title: t('featureExamTitle'),
      desc: t('featureExamDesc'),
      action: onGoToExams,
      actionLabel: language === 'tr' ? 'Sınava Başla' : 'Start Exam',
    },
    {
      icon: Sparkles,
      title: t('featureAiTitle'),
      desc: t('featureAiDesc'),
      action: undefined,
      actionLabel: language === 'tr' ? 'Sağ Altta Aktif' : 'Active in Bottom-Right',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-2">
            {language === 'tr' ? 'Pedagojik ve Teknik Yetkinlikler' : 'Pedagogical & Technical Capabilities'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'tr' 
              ? 'Neden WordLab TR İle Öğrenmelisiniz?' 
              : 'Why Learn with WordLab TR?'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {language === 'tr'
              ? 'Pasif video izlemenin ötesinde; yaparak öğrenme, anlık kural tabanlı dönüt ve adım adım akademik rehberlik.'
              : 'Beyond passive video watching: active learning, instant deterministic feedback, and scaffolded academic guidance.'}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {feat.action && (
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={feat.action}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      {feat.actionLabel} →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
