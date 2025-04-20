
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setRedirecting(true);
      
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      
      // Short delay for user to see the toast
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <Skeleton className="h-10 w-3/4 max-w-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <Skeleton className="h-[200px] w-full rounded-md" />
          <Skeleton className="h-[200px] w-full rounded-md" />
        </div>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Redirecting to login page...</p>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};
