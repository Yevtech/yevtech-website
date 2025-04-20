
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileUpload from '@/components/FileUpload';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';
import { useUser } from '@/contexts/UserContext';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onAvatarChange?: (url: string) => void;
}

const AvatarUpload = ({ currentAvatarUrl, onAvatarChange }: AvatarUploadProps) => {
  const { user, profile } = useUser();
  const { toast } = useToast();

  const handleAvatarUpload = async (url: string) => {
    if (!user) return;
    
    try {
      // Update the avatar_url in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: url })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Call the callback function if provided
      if (onAvatarChange) {
        onAvatarChange(url);
      }
      
      toast({
        title: "Profile Updated",
        description: "Your avatar has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update your profile",
        variant: "destructive",
      });
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={currentAvatarUrl || profile?.avatar_url || ''} alt="Profile" />
        <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
      </Avatar>
      
      <FileUpload
        bucket="avatars"
        path={`user-${user?.id}`}
        onUploadComplete={handleAvatarUpload}
        acceptedFileTypes="image/png, image/jpeg, image/jpg"
        maxSizeMB={2}
      />
    </div>
  );
};

export default AvatarUpload;
