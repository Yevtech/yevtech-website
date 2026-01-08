-- Add video_url column to course_modules
ALTER TABLE public.course_modules 
ADD COLUMN video_url TEXT;

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- Array of option strings
    correct_answer INTEGER NOT NULL, -- Index of correct option (0-based)
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quiz_attempts table
CREATE TABLE public.quiz_attempts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    score INTEGER NOT NULL, -- Number of correct answers
    total_questions INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    answers JSONB NOT NULL, -- Array of user's selected answers
    attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, module_id) -- Only keep latest attempt per user per module
);

-- Enable RLS
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Quiz questions are publicly readable
CREATE POLICY "Anyone can view quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (true);

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" 
ON public.quiz_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create quiz attempts" 
ON public.quiz_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz attempts" 
ON public.quiz_attempts 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create storage bucket for course videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-videos', 'course-videos', true);

-- Storage policies for course videos (public read)
CREATE POLICY "Course videos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'course-videos');

-- Insert sample quiz questions for existing modules
INSERT INTO public.quiz_questions (module_id, question, options, correct_answer, order_index)
SELECT 
    cm.id,
    'What is the primary goal of ' || cm.title || '?',
    '["Understanding concepts", "Memorizing facts", "Skipping content", "Avoiding practice"]'::jsonb,
    0,
    1
FROM public.course_modules cm
WHERE cm.order_index = 1;

INSERT INTO public.quiz_questions (module_id, question, options, correct_answer, order_index)
SELECT 
    cm.id,
    'Which approach is best for learning in this module?',
    '["Hands-on practice", "Only reading", "Skipping exercises", "No engagement"]'::jsonb,
    0,
    2
FROM public.course_modules cm
WHERE cm.order_index = 1;