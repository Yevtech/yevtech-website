import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { useCertificates } from '@/components/certificates/useCertificates';
import { useUser } from '@/contexts/UserContext';
import CertificateModal from '@/components/certificates/CertificateModal';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

// Mock course names mapping - in production, this would come from database
const courseNames: Record<string, string> = {
  'ai-fundamentals': 'AI Fundamentals',
  'blockchain-basics': 'Blockchain Basics',
  'web-development': 'Full Stack Web Development',
};

const Certificates = () => {
  const { user, profile } = useUser();
  const { certificates, isLoading } = useCertificates();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <p className="text-muted-foreground">View and share your earned certificates</p>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-4">
              Complete all modules in a course to earn your certificate.
            </p>
            <Link to="/courses">
              <Button className="bg-forest hover:bg-forest/90">
                Browse Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-2 bg-gradient-to-r from-forest to-forest/70" />
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Award className="h-10 w-10 text-forest" />
                  <span className="text-xs text-muted-foreground">
                    {certificate.certificate_number}
                  </span>
                </div>
                <CardTitle className="mt-2">
                  {courseNames[certificate.course_id] || 'Course Certificate'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  Issued {format(new Date(certificate.issued_at), 'MMM dd, yyyy')}
                </div>
                
                <CertificateModal
                  certificate={certificate}
                  courseName={courseNames[certificate.course_id] || 'Course Certificate'}
                  studentName={profile?.full_name || user?.email || 'Student'}
                >
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Certificate
                  </Button>
                </CertificateModal>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
