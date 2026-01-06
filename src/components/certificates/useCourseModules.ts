import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { CourseModule, ModuleCompletion } from './types';

export const useCourseModules = (courseId: string) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [completions, setCompletions] = useState<ModuleCompletion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchModulesAndCompletions();
    }
  }, [courseId, user]);

  const fetchModulesAndCompletions = async () => {
    try {
      setIsLoading(true);
      
      // Fetch modules for the course
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (modulesError) throw modulesError;
      setModules((modulesData as CourseModule[]) || []);

      // Fetch user's completions if logged in
      if (user) {
        const moduleIds = modulesData?.map(m => m.id) || [];
        if (moduleIds.length > 0) {
          const { data: completionsData, error: completionsError } = await supabase
            .from('module_completions')
            .select('*')
            .eq('user_id', user.id)
            .in('module_id', moduleIds);

          if (completionsError) throw completionsError;
          setCompletions((completionsData as ModuleCompletion[]) || []);
        }
      }
    } catch (error: any) {
      console.error('Error fetching modules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markModuleComplete = async (moduleId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('module_completions')
        .insert({
          user_id: user.id,
          module_id: moduleId,
        });

      if (error) {
        if (error.code === '23505') {
          // Already completed
          return true;
        }
        throw error;
      }

      // Refresh completions
      await fetchModulesAndCompletions();

      toast({
        title: "Module completed!",
        description: "Your progress has been saved.",
      });

      return true;
    } catch (error: any) {
      console.error('Error marking module complete:', error);
      toast({
        title: "Error",
        description: "Failed to save progress.",
        variant: "destructive",
      });
      return false;
    }
  };

  const isModuleCompleted = (moduleId: string) => {
    return completions.some(c => c.module_id === moduleId);
  };

  const completedCount = completions.length;
  const totalCount = modules.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllComplete = totalCount > 0 && completedCount === totalCount;

  return {
    modules,
    completions,
    isLoading,
    markModuleComplete,
    isModuleCompleted,
    completedCount,
    totalCount,
    progressPercentage,
    isAllComplete,
    refetch: fetchModulesAndCompletions,
  };
};
