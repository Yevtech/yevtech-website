-- The view needs authenticated users to be able to read from the underlying table
-- But we want to hide the correct_answer column through the view

-- Add policy for authenticated users to read quiz questions through the view
CREATE POLICY "Authenticated users can view quiz questions"
ON public.quiz_questions
FOR SELECT
TO authenticated
USING (true);