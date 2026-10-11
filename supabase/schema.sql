-- ==============================================================================
-- WORDLAB TR - SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- Relational database architecture for Student & Administration Dashboards
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE assignment_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE question_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE cognitive_level AS ENUM ('knowledge', 'comprehension', 'application', 'analysis');
CREATE TYPE exam_mode AS ENUM ('comprehensive', 'topic', 'quick', 'custom');

-- 3. COURSE GROUPS (Şubeler / Sınıflar)
CREATE TABLE IF NOT EXISTS public.course_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL, -- e.g. "Şube A", "Şube B"
    code VARCHAR(50) NOT NULL UNIQUE, -- e.g. "EBT-2026-A"
    academic_year VARCHAR(20) NOT NULL DEFAULT '2026-2027',
    semester VARCHAR(20) NOT NULL DEFAULT 'Güz',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PROFILES (Kullanıcı Profilleri)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    student_number VARCHAR(50), -- e.g. "230104015"
    role user_role NOT NULL DEFAULT 'student',
    course_group_id UUID REFERENCES public.course_groups(id) ON DELETE SET NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CURRICULUM WEEKS (14 Haftalık Müfredat Düzenleme)
CREATE TABLE IF NOT EXISTS public.curriculum_weeks (
    week_number INTEGER PRIMARY KEY CHECK (week_number BETWEEN 1 AND 14),
    title_tr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    tagline_tr TEXT,
    tagline_en TEXT,
    introduction_tr TEXT,
    introduction_en TEXT,
    summary_tr TEXT,
    summary_en TEXT,
    objectives_json JSONB DEFAULT '[]'::jsonb,
    written_guides_json JSONB DEFAULT '[]'::jsonb,
    videos_json JSONB DEFAULT '[]'::jsonb,
    activities_json JSONB DEFAULT '[]'::jsonb,
    preparation_questions_json JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ASSIGNMENTS (Pratik Word Ödevleri ve Özel Rubrikler)
CREATE TABLE IF NOT EXISTS public.assignments (
    id VARCHAR(50) PRIMARY KEY, -- e.g. "w1-a1"
    week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 14),
    assignment_number INTEGER NOT NULL,
    title_tr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    difficulty assignment_difficulty NOT NULL DEFAULT 'beginner',
    estimated_minutes INTEGER NOT NULL DEFAULT 30,
    objectives_tr TEXT[] DEFAULT '{}',
    objectives_en TEXT[] DEFAULT '{}',
    instructions_tr TEXT[] DEFAULT '{}',
    instructions_en TEXT[] DEFAULT '{}',
    rubric_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    reference_doc_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SUBMISSIONS (DOCX Ödev Yüklemeleri ve OOXML Değerlendirme Sonuçları)
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    assignment_id VARCHAR(50) NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT,
    score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
    max_score INTEGER NOT NULL DEFAULT 100,
    percentage INTEGER NOT NULL CHECK (percentage BETWEEN 0 AND 100),
    criteria_results JSONB NOT NULL DEFAULT '[]'::jsonb,
    strengths_tr TEXT[] DEFAULT '{}',
    strengths_en TEXT[] DEFAULT '{}',
    improvements_tr TEXT[] DEFAULT '{}',
    improvements_en TEXT[] DEFAULT '{}',
    document_metadata JSONB DEFAULT '{}'::jsonb,
    instructor_override_score INTEGER CHECK (instructor_override_score BETWEEN 0 AND 100),
    instructor_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. QUESTION BANK (Sınav Soru Bankası)
CREATE TABLE IF NOT EXISTS public.question_bank (
    id VARCHAR(50) PRIMARY KEY,
    week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 14),
    topic_tr VARCHAR(255) NOT NULL,
    topic_en VARCHAR(255) NOT NULL,
    difficulty question_difficulty NOT NULL DEFAULT 'medium',
    cognitive_level cognitive_level NOT NULL DEFAULT 'application',
    question_tr TEXT NOT NULL,
    question_en TEXT NOT NULL,
    options_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_option_id VARCHAR(20) NOT NULL,
    explanation_tr TEXT NOT NULL,
    explanation_en TEXT NOT NULL,
    is_custom BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. EXAMINATIONS (Oluşturulan Deneme Sınavları)
CREATE TABLE IF NOT EXISTS public.examinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_tr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    mode exam_mode NOT NULL DEFAULT 'comprehensive',
    question_count INTEGER NOT NULL DEFAULT 50,
    time_limit_minutes INTEGER NOT NULL DEFAULT 60,
    passing_score INTEGER NOT NULL DEFAULT 60,
    randomize_order BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. EXAM ATTEMPTS (Öğrenci Sınav Denemeleri ve Sonuçları)
CREATE TABLE IF NOT EXISTS public.exam_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_id UUID REFERENCES public.examinations(id) ON DELETE SET NULL,
    score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
    total_questions INTEGER NOT NULL,
    duration_seconds INTEGER NOT NULL,
    mode VARCHAR(50) NOT NULL DEFAULT 'comprehensive',
    answers_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    topic_scores_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. STUDENT PROGRESS (Öğrencinin 14 Haftalık Öğrenme Durumu)
CREATE TABLE IF NOT EXISTS public.student_progress (
    student_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    completed_weeks INTEGER[] DEFAULT '{}',
    completed_activities TEXT[] DEFAULT '{}',
    completed_guides TEXT[] DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Helper function: Is current user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users see own profile; Admins see all profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile (excluding role)"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Admins have full access to profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- Course Groups: Everyone authenticated can view; Admins can manage
CREATE POLICY "Everyone can read course groups"
  ON public.course_groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins manage course groups"
  ON public.course_groups FOR ALL
  USING (public.is_admin());

-- Curriculum: Read by all authenticated; Edited only by Admin
CREATE POLICY "Everyone can read curriculum"
  ON public.curriculum_weeks FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins manage curriculum"
  ON public.curriculum_weeks FOR ALL
  USING (public.is_admin());

-- Assignments: Read by all; Managed by Admin
CREATE POLICY "Everyone can read assignments"
  ON public.assignments FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins manage assignments"
  ON public.assignments FOR ALL
  USING (public.is_admin());

-- Submissions: Students view/insert own; Admins view/update all
CREATE POLICY "Students view own submissions"
  ON public.submissions FOR SELECT
  USING (student_id = auth.uid() OR public.is_admin());

CREATE POLICY "Students create own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins manage submissions"
  ON public.submissions FOR ALL
  USING (public.is_admin());

-- Question Bank: Read by authenticated; Managed by Admin
CREATE POLICY "Authenticated users read question bank"
  ON public.question_bank FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins manage question bank"
  ON public.question_bank FOR ALL
  USING (public.is_admin());

-- Examinations: Read by authenticated; Managed by Admin
CREATE POLICY "Authenticated users read examinations"
  ON public.examinations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins manage examinations"
  ON public.examinations FOR ALL
  USING (public.is_admin());

-- Exam Attempts: Students view/insert own; Admins view all
CREATE POLICY "Students view own exam attempts"
  ON public.exam_attempts FOR SELECT
  USING (student_id = auth.uid() OR public.is_admin());

CREATE POLICY "Students insert own exam attempts"
  ON public.exam_attempts FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins view all exam attempts"
  ON public.exam_attempts FOR ALL
  USING (public.is_admin());

-- Student Progress: Students view/update own; Admins view all
CREATE POLICY "Students view own progress"
  ON public.student_progress FOR SELECT
  USING (student_id = auth.uid() OR public.is_admin());

CREATE POLICY "Students update own progress"
  ON public.student_progress FOR ALL
  USING (student_id = auth.uid() OR public.is_admin());

-- Trigger to automatically create a profile after Supabase Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'student' -- Default role is always student (prevents privilege escalation)
  );
  
  INSERT INTO public.student_progress (student_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
