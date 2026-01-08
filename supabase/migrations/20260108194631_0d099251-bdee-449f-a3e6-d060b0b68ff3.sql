-- Remove all SELECT policies from quiz_questions
-- Access is controlled through SECURITY DEFINER functions only
DROP POLICY IF EXISTS "Authenticated users can view quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Only service role can access quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;