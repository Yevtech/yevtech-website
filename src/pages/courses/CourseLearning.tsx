import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  Play,
  Trophy,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import { useCourseModules } from '@/components/certificates/useCourseModules';
import { useCertificates } from '@/components/certificates/useCertificates';
import { useUser } from '@/contexts/UserContext';
import CertificateModal from '@/components/certificates/CertificateModal';
import { useToast } from '@/components/ui/use-toast';

// Course data mapping
const courseData: Record<string, { title: string; description: string; instructor: string }> = {
  'ai-fundamentals': {
    title: 'AI Fundamentals',
    description: 'Learn the basics of artificial intelligence and machine learning concepts',
    instructor: 'Dr. Sarah Johnson',
  },
  'blockchain-basics': {
    title: 'Blockchain Basics',
    description: 'Understand blockchain technology fundamentals and applications',
    instructor: 'Michael Chen',
  },
  'web-development': {
    title: 'Full Stack Web Development',
    description: 'Learn to build responsive websites using modern technologies',
    instructor: 'Jessica Lee',
  },
};

const CourseLearning = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useUser();
  const { toast } = useToast();
  const courseId = id || '';
  
  const {
    modules,
    isLoading,
    markModuleComplete,
    isModuleCompleted,
    completedCount,
    totalCount,
    progressPercentage,
    isAllComplete,
  } = useCourseModules(courseId);

  const { getCertificateForCourse, refetch: refetchCertificates } = useCertificates();
  const certificate = getCertificateForCourse(courseId);
  const course = courseData[courseId];

  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [loadingModuleId, setLoadingModuleId] = useState<string | null>(null);

  useEffect(() => {
    if (modules.length > 0 && !activeModuleId) {
      // Set first incomplete module as active, or first module if all complete
      const firstIncomplete = modules.find(m => !isModuleCompleted(m.id));
      setActiveModuleId(firstIncomplete?.id || modules[0].id);
    }
  }, [modules, activeModuleId]);

  useEffect(() => {
    // Refetch certificates when all modules are complete
    if (isAllComplete) {
      refetchCertificates();
    }
  }, [isAllComplete]);

  const handleMarkComplete = async (moduleId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setLoadingModuleId(moduleId);
    const success = await markModuleComplete(moduleId);
    setLoadingModuleId(null);

    if (success) {
      // Move to next incomplete module
      const currentIndex = modules.findIndex(m => m.id === moduleId);
      const nextModule = modules.slice(currentIndex + 1).find(m => !isModuleCompleted(m.id));
      if (nextModule) {
        setActiveModuleId(nextModule.id);
      }
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeModule = modules.find(m => m.id === activeModuleId);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      {/* Course Header */}
      <div className="bg-forest text-white py-6">
        <div className="container mx-auto px-4">
          <Link
            to={`/course/${courseId}`}
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-white/80">{course.instructor}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalCount} modules completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          {isAllComplete && certificate && (
            <div className="mt-4 p-4 bg-forest/10 rounded-lg border border-forest/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-forest" />
                <div>
                  <p className="font-semibold text-forest">Congratulations! Course Completed!</p>
                  <p className="text-sm text-muted-foreground">
                    You've earned your certificate
                  </p>
                </div>
              </div>
              <CertificateModal
                certificate={certificate}
                courseName={course.title}
                studentName={profile?.full_name || user?.email || 'Student'}
              >
                <Button className="bg-forest hover:bg-forest/90 gap-2">
                  <Award className="h-4 w-4" />
                  View Certificate
                </Button>
              </CertificateModal>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-forest" />
          </div>
        ) : modules.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Modules Available</h3>
              <p className="text-muted-foreground">
                Course content is being prepared. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Module List Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Modules</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {modules.map((module, index) => {
                      const isCompleted = isModuleCompleted(module.id);
                      const isActive = module.id === activeModuleId;

                      return (
                        <button
                          key={module.id}
                          onClick={() => setActiveModuleId(module.id)}
                          className={`w-full text-left p-4 transition-colors ${
                            isActive
                              ? 'bg-forest/10 border-l-4 border-forest'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-forest flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`font-medium truncate ${
                                  isCompleted ? 'text-forest' : ''
                                }`}
                              >
                                {index + 1}. {module.title}
                              </p>
                              {module.duration_minutes && (
                                <p className="text-xs text-muted-foreground flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {module.duration_minutes} min
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Module Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {activeModule && (
                <Card>
                  <CardHeader className="border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Module {modules.findIndex(m => m.id === activeModule.id) + 1} of{' '}
                          {modules.length}
                        </p>
                        <CardTitle className="text-xl">{activeModule.title}</CardTitle>
                      </div>
                      {activeModule.duration_minutes && (
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{activeModule.duration_minutes} min</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="py-8">
                    {/* Module Content Placeholder */}
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Video content for this module</p>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                      <h3>About this module</h3>
                      <p className="text-muted-foreground">
                        {activeModule.description ||
                          'Explore the concepts covered in this module through video lessons, readings, and hands-on exercises.'}
                      </p>

                      <h4>What you'll learn:</h4>
                      <ul className="text-muted-foreground">
                        <li>Core concepts and fundamentals</li>
                        <li>Practical applications and examples</li>
                        <li>Best practices and industry standards</li>
                        <li>Hands-on exercises to reinforce learning</li>
                      </ul>
                    </div>

                    {/* Mark Complete Button */}
                    <div className="mt-8 pt-6 border-t">
                      {isModuleCompleted(activeModule.id) ? (
                        <div className="flex items-center justify-center gap-2 text-forest py-4">
                          <CheckCircle2 className="h-6 w-6" />
                          <span className="font-semibold">Module Completed</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleMarkComplete(activeModule.id)}
                          disabled={loadingModuleId === activeModule.id}
                          className="w-full bg-forest hover:bg-forest/90 py-6 text-lg"
                        >
                          {loadingModuleId === activeModule.id ? (
                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                          )}
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLearning;
