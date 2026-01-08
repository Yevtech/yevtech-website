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
    // Create a printable HTML certificate
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Certificate - ${courseName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    .certificate {
      width: 1000px;
      height: 700px;
      background: linear-gradient(135deg, #ffffff 0%, #f8faf8 100%);
      position: relative;
      padding: 50px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .border-frame {
      position: absolute;
      inset: 15px;
      border: 3px solid #228B22;
      pointer-events: none;
    }
    
    .border-frame::before {
      content: '';
      position: absolute;
      inset: 8px;
      border: 1px solid #228B22;
      opacity: 0.5;
    }
    
    .corner {
      position: absolute;
      width: 60px;
      height: 60px;
      border: 3px solid #228B22;
    }
    
    .corner-tl { top: 30px; left: 30px; border-right: none; border-bottom: none; }
    .corner-tr { top: 30px; right: 30px; border-left: none; border-bottom: none; }
    .corner-bl { bottom: 30px; left: 30px; border-right: none; border-top: none; }
    .corner-br { bottom: 30px; right: 30px; border-left: none; border-top: none; }
    
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      position: relative;
      z-index: 1;
    }
    
    .logo-section {
      margin-bottom: 20px;
    }
    
    .award-icon {
      width: 80px;
      height: 80px;
      color: #228B22;
    }
    
    .title {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      font-weight: 700;
      color: #228B22;
      text-transform: uppercase;
      letter-spacing: 8px;
      margin-bottom: 10px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 30px;
    }
    
    .divider {
      width: 150px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #228B22, transparent);
      margin: 20px 0;
    }
    
    .presented-to {
      font-size: 14px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
    }
    
    .student-name {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 20px;
    }
    
    .completion-text {
      font-size: 16px;
      color: #555;
      margin-bottom: 10px;
    }
    
    .course-name {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 600;
      color: #228B22;
      margin-bottom: 30px;
    }
    
    .details {
      display: flex;
      justify-content: center;
      gap: 60px;
      margin-top: 20px;
    }
    
    .detail-item {
      text-align: center;
    }
    
    .detail-label {
      font-size: 10px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    
    .detail-value {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
    
    .footer {
      position: absolute;
      bottom: 60px;
      left: 0;
      right: 0;
      text-align: center;
    }
    
    .company-name {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 600;
      color: #228B22;
    }
    
    .company-tagline {
      font-size: 12px;
      color: #888;
      letter-spacing: 2px;
    }
    
    .watermark {
      position: absolute;
      font-size: 200px;
      font-family: 'Playfair Display', serif;
      color: rgba(34, 139, 34, 0.03);
      transform: rotate(-30deg);
      pointer-events: none;
      user-select: none;
    }
    
    @media print {
      body { background: white; }
      .certificate { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="border-frame"></div>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
    <div class="watermark">Y</div>
    
    <div class="content">
      <div class="logo-section">
        <svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      </div>
      
      <h1 class="title">Certificate</h1>
      <p class="subtitle">of Completion</p>
      
      <div class="divider"></div>
      
      <p class="presented-to">This is to certify that</p>
      
      <h2 class="student-name">${studentName}</h2>
      
      <p class="completion-text">has successfully completed the course</p>
      
      <h3 class="course-name">${courseName}</h3>
      
      <div class="details">
        <div class="detail-item">
          <p class="detail-label">Certificate Number</p>
          <p class="detail-value">${certificate.certificate_number}</p>
        </div>
        <div class="detail-item">
          <p class="detail-label">Date Issued</p>
          <p class="detail-value">${format(new Date(certificate.issued_at), 'MMMM dd, yyyy')}</p>
        </div>
      </div>
      
      <div class="footer">
        <p class="company-name">YevTech Nexus</p>
        <p class="company-tagline">Excellence in Technology Education</p>
      </div>
    </div>
  </div>
  
  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
    `;

    printWindow.document.write(certificateHTML);
    printWindow.document.close();
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-forest" />
            Certificate of Completion
          </DialogTitle>
        </DialogHeader>

        <div
          ref={certificateRef}
          className="relative bg-gradient-to-br from-background to-muted border-4 border-forest/20 rounded-lg p-8 overflow-hidden"
        >
          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-forest/40" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-forest/40" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-forest/40" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-forest/40" />

          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[200px] font-serif text-forest transform -rotate-12">Y</span>
          </div>

          <div className="relative z-10 text-center py-8">
            <div className="mb-6">
              <Award className="h-20 w-20 text-forest mx-auto mb-4" />
              <h2 className="text-4xl font-serif font-bold text-forest tracking-wide mb-2">
                CERTIFICATE
              </h2>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">
                of Completion
              </p>
            </div>

            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-forest to-transparent mx-auto my-6" />

            <p className="text-muted-foreground mb-4 uppercase tracking-wider text-sm">
              This is to certify that
            </p>

            <h3 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-6">
              {studentName}
            </h3>

            <p className="text-muted-foreground mb-2">has successfully completed the course</p>

            <h4 className="text-2xl md:text-3xl font-semibold text-forest mb-8">{courseName}</h4>

            <div className="flex justify-center gap-12 text-sm mb-8">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Certificate Number
                </p>
                <p className="font-medium">{certificate.certificate_number}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Date Issued
                </p>
                <p className="font-medium">
                  {format(new Date(certificate.issued_at), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-forest/20">
              <p className="text-2xl font-serif font-semibold text-forest">YevTech Nexus</p>
              <p className="text-sm text-muted-foreground tracking-wider">
                Excellence in Technology Education
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
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
