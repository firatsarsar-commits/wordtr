import { UserProgress } from './types';

const STORAGE_KEY = 'wordlab_tr_user_progress_v1';

const defaultProgress: UserProgress = {
  completedWeeks: [],
  completedGuides: [],
  completedActivities: [],
  assignmentSubmissions: {},
  examAttempts: [],
};

export function getLocalProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return JSON.parse(raw);
  } catch {
    return defaultProgress;
  }
}

export function saveLocalProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function markWeekCompleted(weekNumber: number): UserProgress {
  const current = getLocalProgress();
  if (!current.completedWeeks.includes(weekNumber)) {
    current.completedWeeks.push(weekNumber);
    saveLocalProgress(current);
  }
  return current;
}

export function markActivityCompleted(activityId: string): UserProgress {
  const current = getLocalProgress();
  if (!current.completedActivities.includes(activityId)) {
    current.completedActivities.push(activityId);
    saveLocalProgress(current);
  }
  return current;
}

export function recordAssignmentScore(
  assignmentId: string,
  score: number,
  fileName: string
): UserProgress {
  const current = getLocalProgress();
  const existing = current.assignmentSubmissions[assignmentId];
  if (!existing || score > existing.score) {
    current.assignmentSubmissions[assignmentId] = {
      score,
      submittedAt: new Date().toISOString(),
      fileName,
    };
    saveLocalProgress(current);
  }
  return current;
}

export function recordExamAttempt(attempt: {
  score: number;
  totalQuestions: number;
  durationSeconds: number;
  mode: 'comprehensive' | 'topic' | 'quick';
}): UserProgress {
  const current = getLocalProgress();
  current.examAttempts.unshift({
    id: `attempt-${Date.now()}`,
    date: new Date().toISOString(),
    ...attempt,
  });
  saveLocalProgress(current);
  return current;
}

export function calculateOverallProgress(progress: UserProgress): {
  percentage: number;
  completedWeeksCount: number;
  completedActivitiesCount: number;
  submittedAssignmentsCount: number;
  averageAssignmentScore: number;
} {
  const totalWeeks = 14;
  const completedWeeksCount = progress.completedWeeks.length;
  const completedActivitiesCount = progress.completedActivities.length;
  const submissions = Object.values(progress.assignmentSubmissions);
  const submittedAssignmentsCount = submissions.length;
  
  const totalScore = submissions.reduce((acc, sub) => acc + sub.score, 0);
  const averageAssignmentScore = submittedAssignmentsCount > 0 ? Math.round(totalScore / submittedAssignmentsCount) : 0;

  // Weighted calculation: weeks (40%) + assignments (40%) + exams (20%)
  const weekRatio = Math.min(completedWeeksCount / totalWeeks, 1);
  const assignmentRatio = Math.min(submittedAssignmentsCount / 20, 1); // 20 target assignments
  const examRatio = progress.examAttempts.length > 0 ? 1 : 0;

  const percentage = Math.round((weekRatio * 0.4 + assignmentRatio * 0.4 + examRatio * 0.2) * 100);

  return {
    percentage,
    completedWeeksCount,
    completedActivitiesCount,
    submittedAssignmentsCount,
    averageAssignmentScore,
  };
}
