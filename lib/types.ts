export type Language = 'tr' | 'en';

export interface LearningObjective {
  id: string;
  textTr: string;
  textEn: string;
}

export interface VideoResource {
  id: string;
  titleTr: string;
  titleEn: string;
  channel: string;
  youtubeId?: string; // verified embed ID if available
  url?: string;
  duration?: string;
  isVerified: boolean;
  notesTr?: string;
  notesEn?: string;
}

export interface InteractiveActivity {
  id: string;
  type: 'identify_command' | 'match_commands' | 'formatting_choice' | 'reorder_steps' | 'find_mistake' | 'ui_simulation';
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  hintTr: string;
  hintEn: string;
  explanationTr: string;
  explanationEn: string;
  // Specific data depending on activity type
  options?: {
    id: string;
    textTr: string;
    textEn: string;
    isCorrect: boolean;
    feedbackTr?: string;
    feedbackEn?: string;
  }[];
  pairs?: {
    id: string;
    leftTr: string;
    leftEn: string;
    rightTr: string;
    rightEn: string;
  }[];
  steps?: {
    id: string;
    textTr: string;
    textEn: string;
    correctOrder: number;
  }[];
  simulationScenario?: {
    scenarioTextTr: string;
    scenarioTextEn: string;
    targetAction: string; // e.g. 'home_tab' | 'bold_btn' | 'center_btn'
  };
}

export interface AssignmentRubricItem {
  id: string;
  category: 'font' | 'paragraph' | 'layout' | 'table' | 'styles' | 'header_footer' | 'references' | 'elements';
  titleTr: string;
  titleEn: string;
  points: number;
  expectedDescriptionTr: string;
  expectedDescriptionEn: string;
  checkFn: string; // Key corresponding to deterministic checker rule
  params?: Record<string, unknown>;
}

export interface PracticalAssignment {
  id: string;
  weekNumber: number;
  assignmentNumber: number;
  titleTr: string;
  titleEn: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  objectivesTr: string[];
  objectivesEn: string[];
  instructionsTr: string[];
  instructionsEn: string[];
  rubric: AssignmentRubricItem[];
  referenceDocName: string;
  starterDocName?: string;
  starterContentGenerator?: {
    title: string;
    paragraphs: string[];
    hasTable?: boolean;
    hasHeading?: boolean;
  };
}

export interface FormativeQuizQuestion {
  id: string;
  questionTr: string;
  questionEn: string;
  options: {
    id: string;
    textTr: string;
    textEn: string;
    isCorrect?: boolean;
    feedbackTr?: string;
    feedbackEn?: string;
  }[];
  correctOptionId: string;
  explanationTr: string;
  explanationEn: string;
}

export interface WeekCurriculum {
  weekNumber: number;
  titleTr: string;
  titleEn: string;
  taglineTr: string;
  taglineEn: string;
  introductionTr: string;
  introductionEn: string;
  prerequisitesTr: string[];
  prerequisitesEn: string[];
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
      ribbonPathTr?: string; // e.g. "Giriş > Yazı Tipi > Kalın (Ctrl+K)"
      ribbonPathEn?: string; // e.g. "Home > Font > Bold (Ctrl+B)"
      keyboardShortcut?: string;
      calloutTipTr?: string;
      calloutTipEn?: string;
    }[];
  }[];
  activities: InteractiveActivity[];
  preparationQuestionsTr: string[];
  preparationQuestionsEn: string[];
  assignments: PracticalAssignment[];
  formativeQuiz: FormativeQuizQuestion[];
  summaryTr: string;
  summaryEn: string;
}

export interface ExamQuestion {
  id: string;
  weekNumber: number;
  topicTr: string;
  topicEn: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cognitiveLevel: 'knowledge' | 'comprehension' | 'application' | 'analysis';
  questionTr: string;
  questionEn: string;
  options: {
    id: string;
    textTr: string;
    textEn: string;
  }[];
  correctOptionId: string;
  explanationTr: string;
  explanationEn: string;
  isCustom?: boolean;
}

export interface RubricCheckResult {
  rubricItemId: string;
  category: string;
  titleTr: string;
  titleEn: string;
  maxPoints: number;
  awardedPoints: number;
  passed: boolean;
  feedbackTr: string;
  feedbackEn: string;
  detectedValue?: string;
  expectedValue?: string;
}

export interface AssessmentResult {
  assignmentId: string;
  fileName: string;
  timestamp: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  criteriaResults: RubricCheckResult[];
  summaryFeedbackTr: string;
  summaryFeedbackEn: string;
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
}

export interface UserProgress {
  completedWeeks: number[];
  completedGuides: string[];
  completedActivities: string[];
  assignmentSubmissions: Record<string, {
    score: number;
    submittedAt: string;
    fileName: string;
  }>;
  examAttempts: {
    id: string;
    date: string;
    score: number;
    totalQuestions: number;
    durationSeconds: number;
    mode: 'comprehensive' | 'topic' | 'quick';
  }[];
}
