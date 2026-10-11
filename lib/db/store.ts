import { 
  UserProfile, 
  CourseGroup, 
  SubmissionRecord, 
  ExamAttemptRecord, 
  StudentProgressRecord, 
  CurriculumWeekOverride, 
  CustomExamConfig 
} from './types';
import { curriculumData } from '../curriculum-data';
import { initialQuestionBank } from '../question-bank';
import { ExamQuestion, WeekCurriculum, PracticalAssignment } from '../types';
import { getSupabase, isSupabaseConfigured } from './supabase-client';

// LocalStorage Keys
const KEYS = {
  CURRENT_USER: 'wordlab_current_user_v2',
  PROFILES: 'wordlab_profiles_v2',
  COURSE_GROUPS: 'wordlab_course_groups_v2',
  SUBMISSIONS: 'wordlab_submissions_v2',
  EXAM_ATTEMPTS: 'wordlab_exam_attempts_v2',
  PROGRESS: 'wordlab_progress_records_v2',
  CURRICULUM_OVERRIDES: 'wordlab_curriculum_overrides_v2',
  QUESTION_BANK: 'wordlab_question_bank_v2',
  EXAMINATIONS: 'wordlab_examinations_v2',
};

// Initial Seed Data
export const INITIAL_COURSE_GROUPS: CourseGroup[] = [
  {
    id: 'group-1',
    name: 'Şube A (Pazartesi 09:00 - 12:00)',
    code: 'EBT-2026-A',
    academicYear: '2026-2027',
    semester: 'Güz',
    studentCount: 24,
  },
  {
    id: 'group-2',
    name: 'Şube B (Salı 13:00 - 16:00)',
    code: 'EBT-2026-B',
    academicYear: '2026-2027',
    semester: 'Güz',
    studentCount: 21,
  },
];

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'admin-1',
    email: 'admin@wordlabtr.edu.tr',
    fullName: 'Dr. Öğr. Üyesi Deniz Kaya',
    role: 'admin',
    isMainAdmin: true,
    password: 'Admin123!',
    courseGroupName: 'Tüm Şubeler (Bölüm Koordinatörü)',
    createdAt: '2026-09-01T08:00:00Z',
  },
  {
    id: 'student-1',
    email: 'ogrenci@wordlabtr.edu.tr',
    fullName: 'Ahmet Yılmaz',
    studentNumber: '230104015',
    role: 'student',
    isMainAdmin: false,
    password: 'Ogrenci123!',
    courseGroupId: 'group-1',
    courseGroupName: 'Şube A (Pazartesi 09:00 - 12:00)',
    createdAt: '2026-09-15T08:00:00Z',
  },
  {
    id: 'student-2',
    email: 'zeynep.demir@wordlabtr.edu.tr',
    fullName: 'Zeynep Demir',
    studentNumber: '230104022',
    role: 'student',
    isMainAdmin: false,
    password: 'Zeynep123!',
    courseGroupId: 'group-1',
    courseGroupName: 'Şube A (Pazartesi 09:00 - 12:00)',
    createdAt: '2026-09-15T08:10:00Z',
  },
  {
    id: 'student-3',
    email: 'can.ozturk@wordlabtr.edu.tr',
    fullName: 'Can Öztürk',
    studentNumber: '230104038',
    role: 'student',
    isMainAdmin: false,
    password: 'Can123!',
    courseGroupId: 'group-2',
    courseGroupName: 'Şube B (Salı 13:00 - 16:00)',
    createdAt: '2026-09-16T10:00:00Z',
  },
];

export const INITIAL_EXAMINATIONS: CustomExamConfig[] = [
  {
    id: 'exam-comprehensive-50',
    titleTr: '50 Soruluk Kapsamlı Word Final Deneme Sınavı',
    titleEn: '50-Question Comprehensive Word Final Practice Exam',
    mode: 'comprehensive',
    questionCount: 50,
    timeLimitMinutes: 60,
    passingScore: 60,
    randomizeOrder: true,
    isActive: true,
    createdAt: '2026-09-15T00:00:00Z',
  },
  {
    id: 'exam-midterm-prep',
    titleTr: '1-7. Hafta Vize Hazırlık Deneme Sınavı',
    titleEn: 'Weeks 1-7 Midterm Preparation Exam',
    mode: 'custom',
    selectedWeeks: [1, 2, 3, 4, 5, 6, 7],
    questionCount: 25,
    timeLimitMinutes: 30,
    passingScore: 60,
    randomizeOrder: true,
    isActive: true,
    createdAt: '2026-09-20T00:00:00Z',
  },
  {
    id: 'exam-typography-layout',
    titleTr: 'Tipografi ve Sayfa Düzeni Modül Sınavı',
    titleEn: 'Typography & Page Layout Module Exam',
    mode: 'topic',
    selectedWeeks: [2, 3, 4],
    questionCount: 15,
    timeLimitMinutes: 20,
    passingScore: 70,
    randomizeOrder: true,
    isActive: true,
    createdAt: '2026-09-25T00:00:00Z',
  },
];

// Helper for safe localStorage access
function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save to localStorage [${key}]:`, err);
  }
}

// ==============================================================================
// 1. AUTHENTICATION & PROFILES
// ==============================================================================

export function getCurrentUser(): UserProfile | null {
  return getStorage<UserProfile | null>(KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user: UserProfile | null): void {
  setStorage(KEYS.CURRENT_USER, user);
}

export function getAllProfiles(): UserProfile[] {
  return getStorage<UserProfile[]>(KEYS.PROFILES, INITIAL_PROFILES);
}

export function authenticateUser(email: string, password: string): UserProfile | null {
  const profiles = getAllProfiles();
  const found = profiles.find(
    (p) => p.email.toLowerCase().trim() === email.toLowerCase().trim()
  );
  if (!found) return null;
  if (found.password && found.password !== password) {
    return null;
  }
  return found;
}

export function findUserByEmail(email: string): UserProfile | null {
  const profiles = getAllProfiles();
  return profiles.find(
    (p) => p.email.toLowerCase().trim() === email.toLowerCase().trim()
  ) || null;
}

export function resetUserPassword(
  email: string, 
  newPassword: string
): { success: boolean; error?: string } {
  const profiles = getAllProfiles();
  const user = profiles.find(
    (p) => p.email.toLowerCase().trim() === email.toLowerCase().trim()
  );
  if (!user) {
    return { success: false, error: 'Bu e-posta adresine ait kayıtlı kullanıcı bulunamadı.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Yeni şifre en az 6 karakter olmalıdır.' };
  }
  user.password = newPassword;
  setStorage(KEYS.PROFILES, profiles);
  const current = getCurrentUser();
  if (current && current.id === user.id) {
    setCurrentUser(user);
  }
  return { success: true };
}

export function saveProfile(profile: UserProfile): void {
  const profiles = getAllProfiles();
  const index = profiles.findIndex((p) => p.id === profile.id);
  if (index >= 0) {
    profiles[index] = profile;
  } else {
    profiles.push(profile);
  }
  setStorage(KEYS.PROFILES, profiles);
  
  // If current user is modified, update current user
  const current = getCurrentUser();
  if (current && current.id === profile.id) {
    setCurrentUser(profile);
  }
}

export function updateUserRole(
  adminUserId: string, 
  targetUserId: string, 
  newRole: 'student' | 'admin'
): { success: boolean; error?: string } {
  const profiles = getAllProfiles();
  const caller = profiles.find((p) => p.id === adminUserId);
  if (!caller || (caller.role !== 'admin' && !caller.isMainAdmin)) {
    return { success: false, error: 'Bu işlemi yapmaya yetkiniz yok. Yalnızca ana yönetici rol atayabilir.' };
  }

  const target = profiles.find((p) => p.id === targetUserId);
  if (!target) {
    return { success: false, error: 'Hedef kullanıcı bulunamadı.' };
  }

  if (target.isMainAdmin && newRole !== 'admin') {
    return { success: false, error: 'Ana yönetici hesabı öğrenci rolüne düşürülemez.' };
  }

  target.role = newRole;
  setStorage(KEYS.PROFILES, profiles);

  const current = getCurrentUser();
  if (current && current.id === target.id) {
    setCurrentUser(target);
  }

  return { success: true };
}

export function removeStudentProfile(studentId: string): void {
  const profiles = getAllProfiles().filter((p) => p.id !== studentId);
  setStorage(KEYS.PROFILES, profiles);
}

// ==============================================================================
// 2. COURSE GROUPS
// ==============================================================================

export function getCourseGroups(): CourseGroup[] {
  return getStorage<CourseGroup[]>(KEYS.COURSE_GROUPS, INITIAL_COURSE_GROUPS);
}

export function addCourseGroup(group: Omit<CourseGroup, 'id'>): CourseGroup {
  const groups = getCourseGroups();
  const newGroup: CourseGroup = {
    ...group,
    id: `group-${Date.now()}`,
    studentCount: 0,
  };
  groups.push(newGroup);
  setStorage(KEYS.COURSE_GROUPS, groups);
  return newGroup;
}

// ==============================================================================
// 3. SUBMISSIONS & DOCX ASSESSMENTS
// ==============================================================================

const INITIAL_SUBMISSIONS: SubmissionRecord[] = [
  {
    id: 'sub-1',
    studentId: 'student-1',
    studentName: 'Ahmet Yılmaz',
    studentNumber: '230104015',
    assignmentId: 'w1-a1',
    assignmentTitleTr: 'Temel Arayüz Gezintisi ve Belge Kaydetme',
    assignmentTitleEn: 'Basic Interface Navigation & Document Saving',
    weekNumber: 1,
    fileName: 'Hafta1_AhmetYilmaz_Odev.docx',
    score: 95,
    maxScore: 100,
    percentage: 95,
    criteriaResults: [
      {
        rubricItemId: 'r1',
        category: 'layout',
        titleTr: 'Doğru Belge Adlandırma ve Format',
        titleEn: 'Valid File Naming & Format',
        maxPoints: 20,
        awardedPoints: 20,
        passed: true,
        feedbackTr: 'Belge geçerli .docx biçiminde ve doğru yapılandırılmış.',
        feedbackEn: 'Document is valid .docx and well-structured.',
      },
      {
        rubricItemId: 'r2',
        category: 'font',
        titleTr: 'Yazı Tipi ve Boyut Tutarlılığı',
        titleEn: 'Font Family & Size Consistency',
        maxPoints: 40,
        awardedPoints: 38,
        passed: true,
        feedbackTr: 'Calibri 11 pt standardına büyük oranda uyulmuş.',
        feedbackEn: 'Calibri 11 pt standard largely maintained.',
      },
      {
        rubricItemId: 'r3',
        category: 'paragraph',
        titleTr: 'Paragraf Hizalaması ve Satır Aralığı',
        titleEn: 'Paragraph Alignment & Line Spacing',
        maxPoints: 40,
        awardedPoints: 37,
        passed: true,
        feedbackTr: 'Satır aralıkları kurala uygun.',
        feedbackEn: 'Line spacings match the criteria.',
      },
    ],
    strengthsTr: ['Dosya formatı eksiksiz', 'Tipografi hiyerarşisi başarılı'],
    strengthsEn: ['Complete file format', 'Good typographic hierarchy'],
    improvementsTr: ['2. paragrafta satır sonu boşluğuna dikkat edin.'],
    improvementsEn: ['Notice line break spacing in 2nd paragraph.'],
    documentMetadata: {
      paragraphCount: 6,
      wordCount: 284,
      tableCount: 0,
      hasStyles: true,
      primaryFonts: ['Calibri', 'Calibri Light'],
      marginsSummary: '2.5 cm Standart',
    },
    createdAt: '2026-09-22T14:30:00Z',
  },
  {
    id: 'sub-2',
    studentId: 'student-1',
    studentName: 'Ahmet Yılmaz',
    studentNumber: '230104015',
    assignmentId: 'w2-a1',
    assignmentTitleTr: 'Akademik Tipografi ve Metin Biçimlendirme',
    assignmentTitleEn: 'Academic Typography & Text Formatting',
    weekNumber: 2,
    fileName: 'Hafta2_Tipografi_Ahmet.docx',
    score: 88,
    maxScore: 100,
    percentage: 88,
    criteriaResults: [
      {
        rubricItemId: 'r1',
        category: 'font',
        titleTr: 'Times New Roman 12 pt Kuralı',
        titleEn: 'Times New Roman 12 pt Rule',
        maxPoints: 50,
        awardedPoints: 44,
        passed: true,
        feedbackTr: 'Başlıklar haricinde gövde metni Times New Roman 12 pt olarak ayarlanmış.',
        feedbackEn: 'Body text is Times New Roman 12 pt except headings.',
      },
      {
        rubricItemId: 'r2',
        category: 'paragraph',
        titleTr: 'İki Yana Yaslama (Justify)',
        titleEn: 'Justified Text Alignment',
        maxPoints: 50,
        awardedPoints: 44,
        passed: true,
        feedbackTr: 'Tüm gövde paragrafları iki yana yaslanmış.',
        feedbackEn: 'All body paragraphs are justified.',
      },
    ],
    strengthsTr: ['Akademik kurallara tam uyum', 'Doğru iki yana yaslama'],
    strengthsEn: ['Academic rule compliance', 'Correct justification'],
    improvementsTr: ['Metin içi vurgularda italik yerine altçizgi kullanılmamalı.'],
    improvementsEn: ['Avoid underlines for in-text emphasis; use italics.'],
    documentMetadata: {
      paragraphCount: 8,
      wordCount: 420,
      tableCount: 0,
      hasStyles: true,
      primaryFonts: ['Times New Roman'],
      marginsSummary: '2.5 cm Standart',
    },
    createdAt: '2026-09-29T16:15:00Z',
  },
  {
    id: 'sub-3',
    studentId: 'student-2',
    studentName: 'Zeynep Demir',
    studentNumber: '230104022',
    assignmentId: 'w1-a1',
    assignmentTitleTr: 'Temel Arayüz Gezintisi ve Belge Kaydetme',
    assignmentTitleEn: 'Basic Interface Navigation & Document Saving',
    weekNumber: 1,
    fileName: 'ZeynepDemir_Hafta1.docx',
    score: 92,
    maxScore: 100,
    percentage: 92,
    criteriaResults: [],
    strengthsTr: ['Düzgün yapılandırılmış belge'],
    strengthsEn: ['Well-structured document'],
    improvementsTr: ['Satır aralıklarını gözden geçirin.'],
    improvementsEn: ['Review line spacings.'],
    documentMetadata: {
      paragraphCount: 5,
      wordCount: 250,
      tableCount: 0,
      hasStyles: true,
      primaryFonts: ['Calibri'],
    },
    createdAt: '2026-09-23T11:00:00Z',
  },
];

export function getAllSubmissions(): SubmissionRecord[] {
  return getStorage<SubmissionRecord[]>(KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
}

export function getSubmissionsByStudent(studentId: string): SubmissionRecord[] {
  return getAllSubmissions().filter((s) => s.studentId === studentId);
}

export function saveSubmission(submission: Omit<SubmissionRecord, 'id' | 'createdAt'>): SubmissionRecord {
  const all = getAllSubmissions();
  const newRecord: SubmissionRecord = {
    ...submission,
    id: `sub-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  all.unshift(newRecord);
  setStorage(KEYS.SUBMISSIONS, all);
  return newRecord;
}

export function overrideSubmissionScore(
  submissionId: string, 
  overrideScore: number, 
  notes: string
): boolean {
  const all = getAllSubmissions();
  const sub = all.find((s) => s.id === submissionId);
  if (!sub) return false;
  
  sub.instructorOverrideScore = overrideScore;
  sub.instructorNotes = notes;
  setStorage(KEYS.SUBMISSIONS, all);
  return true;
}

// ==============================================================================
// 4. EXAM ATTEMPTS
// ==============================================================================

const INITIAL_EXAM_ATTEMPTS: ExamAttemptRecord[] = [
  {
    id: 'attempt-1',
    studentId: 'student-1',
    studentName: 'Ahmet Yılmaz',
    studentNumber: '230104015',
    examTitleTr: '50 Soruluk Kapsamlı Word Final Deneme Sınavı',
    examTitleEn: '50-Question Comprehensive Word Final Practice Exam',
    score: 84,
    totalQuestions: 50,
    durationSeconds: 2150,
    mode: 'comprehensive',
    answers: [],
    topicScores: {
      'Word Arayüzü ve Kısayollar': { total: 10, correct: 9, percentage: 90 },
      'Tipografi ve Metin Biçimlendirme': { total: 10, correct: 9, percentage: 90 },
      'Paragraf ve Sayfa Düzeni': { total: 10, correct: 8, percentage: 80 },
      'Tablolar ve Çizelgeler': { total: 10, correct: 8, percentage: 80 },
      'Başlık Stilleri ve İçindekiler': { total: 10, correct: 7, percentage: 70 },
    },
    createdAt: '2026-10-02T19:30:00Z',
  },
  {
    id: 'attempt-2',
    studentId: 'student-2',
    studentName: 'Zeynep Demir',
    studentNumber: '230104022',
    examTitleTr: '50 Soruluk Kapsamlı Word Final Deneme Sınavı',
    examTitleEn: '50-Question Comprehensive Word Final Practice Exam',
    score: 78,
    totalQuestions: 50,
    durationSeconds: 2400,
    mode: 'comprehensive',
    answers: [],
    topicScores: {},
    createdAt: '2026-10-03T14:20:00Z',
  },
];

export function getAllExamAttempts(): ExamAttemptRecord[] {
  return getStorage<ExamAttemptRecord[]>(KEYS.EXAM_ATTEMPTS, INITIAL_EXAM_ATTEMPTS);
}

export function getExamAttemptsByStudent(studentId: string): ExamAttemptRecord[] {
  return getAllExamAttempts().filter((a) => a.studentId === studentId);
}

export function saveExamAttemptRecord(
  attempt: Omit<ExamAttemptRecord, 'id' | 'createdAt'>
): ExamAttemptRecord {
  const all = getAllExamAttempts();
  const newRecord: ExamAttemptRecord = {
    ...attempt,
    id: `attempt-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  all.unshift(newRecord);
  setStorage(KEYS.EXAM_ATTEMPTS, all);
  return newRecord;
}

// ==============================================================================
// 5. STUDENT PROGRESS
// ==============================================================================

const INITIAL_PROGRESS_RECORDS: Record<string, StudentProgressRecord> = {
  'student-1': {
    studentId: 'student-1',
    completedWeeks: [1, 2, 3],
    completedActivities: ['act-1-1', 'act-1-2', 'act-2-1', 'act-3-1'],
    completedGuides: ['g-1-1', 'g-1-2', 'g-2-1', 'g-3-1'],
    updatedAt: '2026-10-05T12:00:00Z',
  },
  'student-2': {
    studentId: 'student-2',
    completedWeeks: [1, 2],
    completedActivities: ['act-1-1', 'act-2-1'],
    completedGuides: ['g-1-1', 'g-2-1'],
    updatedAt: '2026-10-04T10:00:00Z',
  },
};

export function getStudentProgress(studentId: string): StudentProgressRecord {
  const all = getStorage<Record<string, StudentProgressRecord>>(
    KEYS.PROGRESS,
    INITIAL_PROGRESS_RECORDS
  );
  return (
    all[studentId] || {
      studentId,
      completedWeeks: [],
      completedActivities: [],
      completedGuides: [],
      updatedAt: new Date().toISOString(),
    }
  );
}

export function saveStudentProgress(record: StudentProgressRecord): void {
  const all = getStorage<Record<string, StudentProgressRecord>>(
    KEYS.PROGRESS,
    INITIAL_PROGRESS_RECORDS
  );
  all[record.studentId] = {
    ...record,
    updatedAt: new Date().toISOString(),
  };
  setStorage(KEYS.PROGRESS, all);
}

// ==============================================================================
// 6. CURRICULUM OVERRIDES & VISUAL EDITOR
// ==============================================================================

export function getCurriculumOverrides(): Record<number, CurriculumWeekOverride> {
  return getStorage<Record<number, CurriculumWeekOverride>>(KEYS.CURRICULUM_OVERRIDES, {});
}

export function saveCurriculumWeekOverride(override: CurriculumWeekOverride): void {
  const all = getCurriculumOverrides();
  all[override.weekNumber] = {
    ...override,
    updatedAt: new Date().toISOString(),
  };
  setStorage(KEYS.CURRICULUM_OVERRIDES, all);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wordlab_curriculum_updated', { detail: override }));
  }
}

export function resetCurriculumWeekOverride(weekNumber: number): void {
  const all = getCurriculumOverrides();
  delete all[weekNumber];
  setStorage(KEYS.CURRICULUM_OVERRIDES, all);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wordlab_curriculum_updated', { detail: { weekNumber, reset: true } }));
  }
}

export function getEffectiveCurriculum(): WeekCurriculum[] {
  const overrides = getCurriculumOverrides();
  return curriculumData.map((original) => {
    const override = overrides[original.weekNumber];
    if (!override) return original;
    return {
      ...original,
      titleTr: override.titleTr !== undefined ? override.titleTr : original.titleTr,
      titleEn: override.titleEn !== undefined ? override.titleEn : original.titleEn,
      taglineTr: override.taglineTr !== undefined ? override.taglineTr : original.taglineTr,
      taglineEn: override.taglineEn !== undefined ? override.taglineEn : original.taglineEn,
      introductionTr: override.introductionTr !== undefined ? override.introductionTr : original.introductionTr,
      introductionEn: override.introductionEn !== undefined ? override.introductionEn : original.introductionEn,
      summaryTr: override.summaryTr !== undefined ? override.summaryTr : original.summaryTr,
      summaryEn: override.summaryEn !== undefined ? override.summaryEn : original.summaryEn,
      objectives: override.objectives !== undefined ? override.objectives : original.objectives,
      videos: override.videos !== undefined ? override.videos : original.videos,
      writtenGuides: override.writtenGuides !== undefined ? override.writtenGuides : original.writtenGuides,
      activities: override.activities !== undefined ? override.activities : original.activities,
      preparationQuestionsTr: override.preparationQuestionsTr !== undefined ? override.preparationQuestionsTr : original.preparationQuestionsTr,
      preparationQuestionsEn: override.preparationQuestionsEn !== undefined ? override.preparationQuestionsEn : original.preparationQuestionsEn,
      assignments: override.assignments !== undefined ? override.assignments : original.assignments,
    };
  });
}

// ==============================================================================
// 7. QUESTION BANK
// ==============================================================================

export function getAllQuestions(): ExamQuestion[] {
  return getStorage<ExamQuestion[]>(KEYS.QUESTION_BANK, initialQuestionBank);
}

export function saveQuestion(question: ExamQuestion): void {
  const all = getAllQuestions();
  const index = all.findIndex((q) => q.id === question.id);
  if (index >= 0) {
    all[index] = question;
  } else {
    all.push(question);
  }
  setStorage(KEYS.QUESTION_BANK, all);
}

export function deleteQuestion(questionId: string): void {
  const all = getAllQuestions().filter((q) => q.id !== questionId);
  setStorage(KEYS.QUESTION_BANK, all);
}

// ==============================================================================
// 8. EXAMINATIONS CONFIGURATION
// ==============================================================================

export function getAllExaminations(): CustomExamConfig[] {
  return getStorage<CustomExamConfig[]>(KEYS.EXAMINATIONS, INITIAL_EXAMINATIONS);
}

export function saveExamination(exam: Omit<CustomExamConfig, 'id' | 'createdAt'>): CustomExamConfig {
  const all = getAllExaminations();
  const newExam: CustomExamConfig = {
    ...exam,
    id: `exam-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  all.push(newExam);
  setStorage(KEYS.EXAMINATIONS, all);
  return newExam;
}

export function toggleExamStatus(examId: string): void {
  const all = getAllExaminations();
  const target = all.find((e) => e.id === examId);
  if (target) {
    target.isActive = !target.isActive;
    setStorage(KEYS.EXAMINATIONS, all);
  }
}
