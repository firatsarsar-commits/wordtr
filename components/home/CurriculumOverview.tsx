'use client';

import React from 'react';
import { useLanguage } from '../common/LanguageContext';
import { useCurriculum } from '@/hooks/useCurriculum';
import { BookOpen, ArrowRight, Video, FileCheck, CheckCircle } from 'lucide-react';

interface CurriculumOverviewProps {
  onSelectWeek: (weekNum: number) => void;
}

export function CurriculumOverview({ onSelectWeek }: CurriculumOverviewProps) {
  const { language } = useLanguage();
  const { curriculum } = useCurriculum();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block mb-1">
              {language === 'tr' ? '14 Haftalık Öğrenme Haritası' : '14-Week Learning Roadmap'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {language === 'tr' ? 'Haftalık Ders Müfredatı' : 'Weekly Curriculum'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {language === 'tr' 
                ? 'Tüm haftalar kilit olmaksızın en baştan itibaren erişilebilir durumdadır.'
                : 'All weekly modules are fully unlocked and accessible from day one.'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-xs text-slate-500 flex items-center gap-3">
            <span>14 Modül</span>
            <span aria-hidden="true">·</span>
            <span>56+ Uygulama</span>
            <span aria-hidden="true">·</span>
            <span>%100 Kural Tabanlı Değerlendirme</span>
          </div>
        </div>

        {/* 14 Weeks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {curriculum.map((week) => {
            const title = language === 'tr' ? week.titleTr : week.titleEn;
            const tagline = language === 'tr' ? week.taglineTr : week.taglineEn;
            const videoCount = week.videos.length;
            const assignmentCount = week.assignments.length;

            return (
              <div
                key={week.weekNumber}
                onClick={() => onSelectWeek(week.weekNumber)}
                className="group p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top editorial numbering */}
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-medium">
                    <span className="font-semibold text-blue-700">
                      {language === 'tr' ? `${week.weekNumber}. Hafta` : `Week ${week.weekNumber}`}
                    </span>
                    <span className="text-2xs text-slate-400">
                      {assignmentCount} {language === 'tr' ? 'Ödev' : 'Tasks'}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                    {tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3 text-2xs">
                    <span className="flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-slate-400" />
                      <span>{videoCount} Video</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{assignmentCount} DOCX</span>
                    </span>
                  </div>

                  <span className="text-blue-700 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                    {language === 'tr' ? 'İncele' : 'Explore'}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
