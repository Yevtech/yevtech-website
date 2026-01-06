export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  duration_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface ModuleCompletion {
  id: string;
  user_id: string;
  module_id: string;
  completed_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
}
