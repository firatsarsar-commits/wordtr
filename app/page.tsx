'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/components/common/LanguageContext';
import { AuthProvider, useAuth } from '@/components/auth/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { CurriculumOverview } from '@/components/home/CurriculumOverview';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { WeeklyCurriculumView } from '@/components/lessons/WeeklyCurriculumView';
import { PracticeLabView } from '@/components/practice/PracticeLabView';
import { ExamCenterView } from '@/components/exams/ExamCenterView';
import { QuestionBankManager } from '@/components/exams/QuestionBankManager';
import { ResourcesView } from '@/components/resources/ResourcesView';
import { AboutView } from '@/components/about/AboutView';
import { StudentDashboardView } from '@/components/dashboard/student/StudentDashboardView';
import { AdminDashboardView } from '@/components/dashboard/admin/AdminDashboardView';
import { useCurriculum } from '@/hooks/useCurriculum';

function MainAppContent() {
  const { language } = useLanguage();
  const { role } = useAuth();
  const { curriculum } = useCurriculum();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

  const currentWeek = curriculum.find((w) => w.weekNumber === selectedWeekNum) || curriculum[0];
  const currentTopic = language === 'tr' ? currentWeek.titleTr : currentWeek.titleEn;

  const handleStartLearning = () => {
    setActiveTab('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTakeExam = () => {
    setActiveTab('exams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWeek = (weekNum: number) => {
    setSelectedWeekNum(weekNum);
    setActiveTab('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAssignment = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSelectWeek={handleSelectWeek}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onStartLearning={handleStartLearning}
              onTakeExam={handleTakeExam}
            />
            <CurriculumOverview onSelectWeek={handleSelectWeek} />
            <FeaturesSection
              onGoToCurriculum={() => {
                setActiveTab('curriculum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToPractice={() => {
                setActiveTab('practice');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToExams={() => {
                setActiveTab('exams');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* NEW: Student Dashboard */}
        {activeTab === 'student-dashboard' && (
          <StudentDashboardView 
            onNavigateToWeek={handleSelectWeek}
            onNavigateToExam={handleTakeExam}
          />
        )}

        {/* NEW: Administration Dashboard */}
        {activeTab === 'admin-dashboard' && (
          <AdminDashboardView />
        )}

        {activeTab === 'curriculum' && (
          <WeeklyCurriculumView
            selectedWeekNum={selectedWeekNum}
            onSelectWeek={setSelectedWeekNum}
            onNavigateToAssignment={handleNavigateToAssignment}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeLabView initialAssignmentId={selectedAssignmentId} />
        )}

        {activeTab === 'exams' && (
          <ExamCenterView />
        )}

        {activeTab === 'question-bank' && (
          <QuestionBankManager />
        )}

        {activeTab === 'resources' && (
          <ResourcesView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
