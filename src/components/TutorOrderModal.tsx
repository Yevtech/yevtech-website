import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, AlertCircle, MessageCircle, CheckCircle } from 'lucide-react';

interface TutorOrderModalProps {
  courseName: string;
  tutorEmail: string;
  children?: React.ReactNode;
}

const TutorOrderModal: React.FC<TutorOrderModalProps> = ({ courseName, tutorEmail, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeeAlert, setShowFeeAlert] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName.trim() || !whatsappNumber.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    // Show fee alert
    setShowFeeAlert(true);
  };

  const handleConfirmOrder = () => {
    // Create mailto link with pre-filled email
    const subject = encodeURIComponent(`Tutoring Request for ${courseName}`);
    const body = encodeURIComponent(
      `Hello sir/ma,\n\nMy name is ${studentName} and I would like you to be my tutor on ${courseName}.\n\nPlease reach me on this number: ${whatsappNumber}\n\nThank you.`
    );
    
    const mailtoLink = `mailto:${tutorEmail}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: 'Request Sent!',
      description: 'Your email client should open with the pre-filled message. Please send the email to complete your request.',
      duration: 5000,
    });
    
    // Reset form and close modals
    setStudentName('');
    setWhatsappNumber('');
    setShowFeeAlert(false);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children || (
            <Button variant="outline" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              Order a Tutor
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Order a Live Tutor
            </DialogTitle>
            <DialogDescription>
              Request a personal tutor for <strong>{courseName}</strong>. Fill in your details and we'll connect you with an expert tutor.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Your Full Name</Label>
              <Input
                id="studentName"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-600" />
                WhatsApp Number
              </Label>
              <Input
                id="whatsappNumber"
                placeholder="+234 800 000 0000"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Include your country code for international calls
              </p>
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Request Tutor
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showFeeAlert} onOpenChange={setShowFeeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Tutoring Fee Notice
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>
                Please note that <strong>live tutoring sessions require a fee</strong> for each session. 
                The tutor will discuss pricing and payment details with you directly.
              </p>
              <p className="text-sm">
                By proceeding, you acknowledge that:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Tutoring sessions are paid services</li>
                <li>Fees vary depending on the subject and tutor</li>
                <li>Payment arrangements are made directly with the tutor</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmOrder} className="bg-primary hover:bg-primary/90 gap-2">
              <CheckCircle className="h-4 w-4" />
              Proceed with Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TutorOrderModal;
