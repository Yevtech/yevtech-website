-- Fix: Use SECURITY INVOKER to respect RLS policies of the querying user
DROP VIEW IF EXISTS public.quiz_questions_public;

CREATE VIEW public.quiz_questions_public 
WITH (security_invoker = true) AS
SELECT 
    id,
    module_id,
    question,
    options,
    order_index,
    created_at
FROM public.quiz_questions;

-- Re-grant access to the view
GRANT SELECT ON public.quiz_questions_public TO anon;
GRANT SELECT ON public.quiz_questions_public TO authenticated;