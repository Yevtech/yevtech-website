
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

interface Enrollment {
  id: string;
  course_id: string;
  status: string;
  progress: number;
  created_at: string;
  courses: {
    id: string;
    title: string;
    image_url: string | null;
    level: string;
    duration: string;
  };
}

const EnrollmentList = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          id,
          course_id,
          status,
          progress,
          created_at,
          courses (
            id,
            title,
            image_url,
            level,
            duration
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error: any) {
      console.error('Error fetching enrollments:', error);
      toast({
        title: "Failed to Load Enrollments",
        description: error.message || "Your enrolled courses could not be loaded.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (enrollmentId: string, newProgress: number) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ 
          progress: newProgress, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Update local state
      setEnrollments(prev => 
        prev.map(enrollment => 
          enrollment.id === enrollmentId 
            ? { ...enrollment, progress: newProgress } 
            : enrollment
        )
      );

      toast({
        title: "Progress Updated",
        description: `Your progress has been updated to ${newProgress}%`,
      });
    } catch (error: any) {
      console.error('Error updating progress:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update progress.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-6">Loading your courses...</div>;
  }

  if (enrollments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <p className="text-lg font-medium mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Courses</h2>
      
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4">
              {enrollment.courses.image_url ? (
                <img 
                  src={enrollment.courses.image_url} 
                  alt={enrollment.courses.title} 
                  className="w-full h-40 md:h-full object-cover"
                />
              ) : (
                <div className="w-full h-40 md:h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-3/4 p-4">
              <h3 className="text-xl font-semibold">{enrollment.courses.title}</h3>
              
              <div className="flex flex-wrap gap-2 my-2">
                <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                  {enrollment.courses.level?.charAt(0).toUpperCase() + enrollment.courses.level?.slice(1) || 'Beginner'}
                </span>
                {enrollment.courses.duration && (
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                    {enrollment.courses.duration}
                  </span>
                )}
                <span className={`text-sm px-2 py-1 rounded-full ${
                  enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  enrollment.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                </span>
              </div>
              
              <div className="my-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{enrollment.progress}%</span>
                </div>
                <Progress value={enrollment.progress} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Link to={`/course/${enrollment.course_id}`}>
                  <Button variant="outline">Continue Learning</Button>
                </Link>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => updateProgress(enrollment.id, Math.min(100, enrollment.progress + 25))}
                    disabled={enrollment.progress >= 100}
                  >
                    Mark Progress +25%
                  </Button>
                  
                  {enrollment.progress < 100 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => updateProgress(enrollment.id, 100)}
                    >
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EnrollmentList;
