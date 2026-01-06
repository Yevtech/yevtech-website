-- Change course_id from UUID to TEXT to match frontend course IDs
ALTER TABLE public.course_modules 
ALTER COLUMN course_id TYPE TEXT;

ALTER TABLE public.certificates 
ALTER COLUMN course_id TYPE TEXT;