
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

interface ServiceBookingProps {
  serviceId: string;
  serviceName: string;
  onBookingComplete?: () => void;
}

const ServiceBooking = ({ serviceId, serviceName, onBookingComplete }: ServiceBookingProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to book a service.",
        variant: "destructive",
      });
      return;
    }

    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a date for your booking.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    try {
      const { error } = await supabase
        .from('service_bookings')
        .insert([{
          user_id: user.id,
          service_id: serviceId,
          status: 'pending',
          booking_date: date.toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({
        title: "Booking Successful",
        description: `Your booking for ${serviceName} has been confirmed.`,
      });

      setDate(undefined);
      
      if (onBookingComplete) {
        onBookingComplete();
      }
    } catch (error: any) {
      console.error('Error booking service:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to book service.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book {serviceName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Select a Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                // Disable dates before today
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          onClick={handleBooking} 
          className="w-full" 
          disabled={!date || isBooking}
        >
          {isBooking ? "Processing..." : "Confirm Booking"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceBooking;
