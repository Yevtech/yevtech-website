
export interface Course {
  id: string;
  title: string;
  image_url: string | null;
  level: string;
  duration: string;
}

export interface Enrollment {
  id: string;
  course_id: string;
  status: string;
  progress: number;
  created_at: string;
  courses: Course;
}
