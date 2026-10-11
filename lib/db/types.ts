import { 
  RubricCheckResult, 
  LearningObjective, 
  VideoResource, 
  InteractiveActivity, 
  PracticalAssignment, 
  FormativeQuizQuestion 
} from '../types';

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  studentNumber?: string;
  role: UserRole;
  isMainAdmin?: boolean;
  password?: string;
  courseGroupId?: string;
  courseGroupName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface CourseGroup {
  id: string;
  name: string; // e.g. "Şube A"
  code: string; // e.g. "EBT-2026-A"
  academicYear: string;
  semester: string;
  studentCount?: number;
}

export interface SubmissionRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber?: string;
  assignmentId: string;
  assignmentTitleTr: string;
  assignmentTitleEn: string;
  weekNumber: number;
  fileName: string;
  fileUrl?: string;
  score: number;
  maxScore: number;
  percentage: number;
  criteriaResults: RubricCheckResult[];
  strengthsTr: string[];
  strengthsEn: string[];
  improvementsTr: string[];
  improvementsEn: string[];
  documentMetadata: {
    paragraphCount: number;
    wordCount: number;
    tableCount: number;
    hasStyles: boolean;
    primaryFonts: string[];
    marginsSummary?: string;
  };
  instructorOverrideScore?: number;
  instructorNotes?: string;
  createdAt: string;
}

export interface ExamAttemptRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentNumber?: string;
  examId?: string;
  examTitleTr: string;
  examTitleEn: string;
  score: number;
  totalQuestions: number;
  durationSeconds: number;
  mode: 'comprehensive' | 'topic' | 'quick' | 'custom';
  answers: {
    questionId: string;
    questionTr?: string;
    questionEn?: string;
    selectedOptionId: string;
    correctOptionId: string;
    isCorrect: boolean;
    explanationTr?: string;
    explanationEn?: string;
    topicTr?: string;
    topicEn?: string;
  }[];
  topicScores: Record<string, {
    total: number;
    correct: number;
    percentage: number;
  }>;
  createdAt: string;
}

export interface StudentProgressRecord {
  studentId: string;
  completedWeeks: number[];
  completedActivities: string[];
  completedGuides: string[];
  updatedAt: string;
}

export interface CurriculumWeekOverride {
  weekNumber: number;
  titleTr: string;
  titleEn: string;
  taglineTr: string;
  taglineEn: string;
  introductionTr: string;
  introductionEn: string;
  summaryTr: string;
  summaryEn: string;
  objectives: LearningObjective[];
  videos: VideoResource[];
  writtenGuides: {
    id: string;
    headingTr: string;
    headingEn: string;
    sections: {
      subheadingTr: string;
      subheadingEn: string;
      contentTr: string;
      contentEn: string;
      ribbonPathTr?: string;
      ribbonPathEn?: string;
      keyboardShortcut?: string;
      calloutTipTr?: string;
      calloutTipEn?: string;
    }[];
  }[];
  activities: InteractiveActivity[];
  preparationQuestionsTr: string[];
  preparationQuestionsEn: string[];
  assignments: PracticalAssignment[];
  formativeQuiz?: FormativeQuizQuestion[];
  updatedAt: string;
}

export interface CustomExamConfig {
  id: string;
  titleTr: string;
  titleEn: string;
  mode: 'comprehensive' | 'topic' | 'custom';
  selectedWeeks?: number[];
  questionCount: number;
  timeLimitMinutes: number;
  passingScore: number;
  randomizeOrder: boolean;
  isActive: boolean;
  createdAt: string;
}
