-- Drop the view since it's not the right solution
DROP VIEW IF EXISTS public.quiz_questions_public;

-- Revoke grants if they exist
REVOKE ALL ON public.quiz_questions FROM anon;
REVOKE ALL ON public.quiz_questions FROM authenticated;

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Only service role can access quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;

-- Create a SECURITY DEFINER function to get quiz questions WITHOUT correct answers
CREATE OR REPLACE FUNCTION public.get_quiz_questions(p_module_id uuid)
RETURNS TABLE (
    id uuid,
    module_id uuid,
    question text,
    options jsonb,
    order_index integer,
    created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        qq.id,
        qq.module_id,
        qq.question,
        qq.options,
        qq.order_index,
        qq.created_at
    FROM public.quiz_questions qq
    WHERE qq.module_id = p_module_id
    ORDER BY qq.order_index;
$$;

-- Create a SECURITY DEFINER function to verify quiz answers server-side
CREATE OR REPLACE FUNCTION public.verify_quiz_answers(
    p_user_id uuid,
    p_module_id uuid,
    p_answers jsonb
)
RETURNS TABLE (
    score integer,
    total_questions integer,
    passed boolean,
    results jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_correct_count integer := 0;
    v_total integer := 0;
    v_results jsonb := '[]'::jsonb;
    v_question record;
    v_user_answer integer;
    v_is_correct boolean;
BEGIN
    -- Verify user is authenticated (must match provided user_id)
    IF auth.uid() IS NULL OR auth.uid() != p_user_id THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    -- Process each question
    FOR v_question IN 
        SELECT qq.id, qq.question, qq.options, qq.correct_answer, qq.order_index
        FROM public.quiz_questions qq
        WHERE qq.module_id = p_module_id
        ORDER BY qq.order_index
    LOOP
        v_total := v_total + 1;
        
        -- Get user's answer for this question (answers are indexed by order_index)
        v_user_answer := (p_answers->(v_question.order_index)::text)::integer;
        v_is_correct := v_user_answer = v_question.correct_answer;
        
        IF v_is_correct THEN
            v_correct_count := v_correct_count + 1;
        END IF;
        
        -- Build results with correct answer revealed (for feedback)
        v_results := v_results || jsonb_build_object(
            'question_id', v_question.id,
            'question', v_question.question,
            'options', v_question.options,
            'user_answer', v_user_answer,
            'correct_answer', v_question.correct_answer,
            'is_correct', v_is_correct
        );
    END LOOP;

    -- Calculate pass/fail (70% threshold)
    RETURN QUERY SELECT 
        v_correct_count,
        v_total,
        (v_total > 0 AND (v_correct_count::float / v_total::float) >= 0.7),
        v_results;
END;
$$;

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION public.get_quiz_questions(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_quiz_answers(uuid, uuid, jsonb) TO authenticated;