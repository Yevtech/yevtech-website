
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';
import { Enrollment } from './types';

export const useEnrollments = () => {
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
      
      // Type assertion to ensure correct type
      setEnrollments(data as unknown as Enrollment[]);
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

  return {
    enrollments,
    isLoading,
    updateProgress
  };
};
