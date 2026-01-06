import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 6, 2025</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using YevTech Nexus services, website, or any applications (collectively, the "Services"), 
                you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                please do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                YevTech Nexus provides technology education, consulting, and professional services including but not limited to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Online courses and educational content in AI, Web Development, Cybersecurity, and related fields</li>
                <li>Live tutoring and mentorship sessions</li>
                <li>Technical consulting and project management services</li>
                <li>Virtual assistance and administrative support</li>
                <li>Digital marketing and social media management</li>
                <li>Vocational training programs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                To access certain features of our Services, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your login credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Course Enrollment and Certificates</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you enroll in a course:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>You are granted a personal, non-transferable license to access the course content</li>
                <li>Certificates are issued upon successful completion of course requirements</li>
                <li>Certificates are for personal and professional use only</li>
                <li>We reserve the right to revoke certificates obtained through fraudulent means</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Tutoring Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Live tutoring sessions are subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Sessions are booked in advance and require payment before confirmation</li>
                <li>Cancellations must be made at least 24 hours in advance for a full refund</li>
                <li>No-shows or late cancellations may not be eligible for refunds</li>
                <li>Tutors are independent professionals; quality may vary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Payment and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                All payments are processed securely. Refund policies vary by service type:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Courses: 14-day money-back guarantee for most courses</li>
                <li>Consulting services: Refunds based on deliverables and agreements</li>
                <li>Tutoring: Subject to cancellation policy above</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, including but not limited to text, graphics, logos, videos, course materials, and software, 
                is the property of YevTech Nexus or its licensors and is protected by intellectual property laws. 
                You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Prohibited Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Share your account credentials with others</li>
                <li>Download or distribute course materials without authorization</li>
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Attempt to gain unauthorized access to any part of the Services</li>
                <li>Harass, abuse, or harm other users or staff</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, YevTech Nexus shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, use, 
                or other intangible losses, resulting from your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                via email or through the Services. Your continued use of the Services after such modifications 
                constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>YevTech Nexus</strong><br />
                Email: legal@yevtechnexus.com<br />
                Website: www.yevtechnexus.com
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
