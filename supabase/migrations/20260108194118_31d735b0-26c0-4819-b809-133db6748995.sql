-- Create a secure view that hides correct answers from students
CREATE OR REPLACE VIEW public.quiz_questions_public AS
SELECT 
    id,
    module_id,
    question,
    options,
    order_index,
    created_at
FROM public.quiz_questions;

-- Grant access to the view
GRANT SELECT ON public.quiz_questions_public TO anon;
GRANT SELECT ON public.quiz_questions_public TO authenticated;

-- Drop the existing permissive policy that exposes correct answers
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;

-- Create a restrictive policy that only allows service_role to access the full table
-- (used by edge functions for answer verification)
CREATE POLICY "Only service role can access quiz questions"
ON public.quiz_questions
FOR SELECT
TO service_role
USING (true);