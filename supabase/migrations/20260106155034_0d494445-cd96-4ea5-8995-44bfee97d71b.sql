-- Create course_modules table
CREATE TABLE public.course_modules (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL DEFAULT 0,
    duration_minutes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create module_completions table to track user progress
CREATE TABLE public.module_completions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, module_id)
);

-- Create certificates table
CREATE TABLE public.certificates (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    certificate_number TEXT NOT NULL UNIQUE,
    issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for course_modules (public read)
CREATE POLICY "Anyone can view course modules"
ON public.course_modules FOR SELECT
USING (true);

-- RLS Policies for module_completions
CREATE POLICY "Users can view their own completions"
ON public.module_completions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can mark modules complete"
ON public.module_completions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own completions"
ON public.module_completions FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for certificates
CREATE POLICY "Users can view their own certificates"
ON public.certificates FOR SELECT
USING (auth.uid() = user_id);

-- Function to generate certificate number
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    cert_number TEXT;
BEGIN
    cert_number := 'CERT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 8));
    RETURN cert_number;
END;
$$;

-- Function to check and award certificate
CREATE OR REPLACE FUNCTION public.check_and_award_certificate()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_course_id UUID;
    total_modules INTEGER;
    completed_modules INTEGER;
BEGIN
    -- Get the course_id for this module
    SELECT course_id INTO v_course_id
    FROM public.course_modules
    WHERE id = NEW.module_id;

    -- Count total modules for the course
    SELECT COUNT(*) INTO total_modules
    FROM public.course_modules
    WHERE course_id = v_course_id;

    -- Count completed modules by this user for this course
    SELECT COUNT(*) INTO completed_modules
    FROM public.module_completions mc
    JOIN public.course_modules cm ON mc.module_id = cm.id
    WHERE mc.user_id = NEW.user_id
    AND cm.course_id = v_course_id;

    -- If all modules completed, award certificate
    IF completed_modules = total_modules AND total_modules > 0 THEN
        INSERT INTO public.certificates (user_id, course_id, certificate_number)
        VALUES (NEW.user_id, v_course_id, public.generate_certificate_number())
        ON CONFLICT (user_id, course_id) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger to auto-award certificates
CREATE TRIGGER on_module_completion
AFTER INSERT ON public.module_completions
FOR EACH ROW
EXECUTE FUNCTION public.check_and_award_certificate();

-- Add trigger for updated_at on course_modules
CREATE TRIGGER update_course_modules_updated_at
BEFORE UPDATE ON public.course_modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();