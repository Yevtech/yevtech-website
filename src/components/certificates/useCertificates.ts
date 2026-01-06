import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { Certificate } from './types';

export const useCertificates = () => {
  const { user } = useUser();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCertificates();
    } else {
      setCertificates([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', user?.id)
        .order('issued_at', { ascending: false });

      if (error) throw error;
      setCertificates((data as Certificate[]) || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCertificateForCourse = (courseId: string) => {
    return certificates.find(c => c.course_id === courseId);
  };

  return {
    certificates,
    isLoading,
    getCertificateForCourse,
    refetch: fetchCertificates,
  };
};
