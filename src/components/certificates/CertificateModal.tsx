import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award, Download, Share2 } from 'lucide-react';
import { Certificate } from './types';
import { format } from 'date-fns';

interface CertificateModalProps {
  certificate: Certificate;
  courseName: string;
  studentName: string;
  children: React.ReactNode;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  courseName,
  studentName,
  children,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Create a simple text-based certificate for now
    const content = `
CERTIFICATE OF COMPLETION

This is to certify that

${studentName}

has successfully completed the course

${courseName}

Certificate Number: ${certificate.certificate_number}
Issue Date: ${format(new Date(certificate.issued_at), 'MMMM dd, yyyy')}

YevTech Nexus
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${certificate.certificate_number}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Course Completion Certificate',
      text: `I just completed "${courseName}" at YevTech Nexus! Certificate #${certificate.certificate_number}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Certificate info copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-forest" />
            Certificate of Completion
          </DialogTitle>
        </DialogHeader>
        
        <div 
          ref={certificateRef}
          className="bg-gradient-to-br from-forest/5 to-forest/10 border-4 border-forest/20 rounded-lg p-8 text-center"
        >
          <div className="mb-6">
            <Award className="h-16 w-16 text-forest mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-forest mb-2">Certificate of Completion</h2>
            <div className="w-24 h-1 bg-forest/30 mx-auto" />
          </div>
          
          <p className="text-muted-foreground mb-4">This is to certify that</p>
          
          <h3 className="text-3xl font-bold text-foreground mb-4 font-serif">
            {studentName}
          </h3>
          
          <p className="text-muted-foreground mb-4">has successfully completed the course</p>
          
          <h4 className="text-2xl font-semibold text-forest mb-6">
            {courseName}
          </h4>
          
          <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-6">
            <div>
              <p className="font-medium text-foreground">Certificate Number</p>
              <p>{certificate.certificate_number}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Issue Date</p>
              <p>{format(new Date(certificate.issued_at), 'MMMM dd, yyyy')}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-forest/20">
            <p className="text-lg font-semibold text-forest">YevTech Nexus</p>
            <p className="text-sm text-muted-foreground">Excellence in Technology Education</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleShare} className="gap-2 bg-forest hover:bg-forest/90">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
