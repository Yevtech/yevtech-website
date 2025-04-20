
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { uploadFile, getFileUrl } from '@/lib/supabase';

interface FileUploadProps {
  bucket: string;
  path: string;
  onUploadComplete: (url: string) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

const FileUpload = ({
  bucket,
  path,
  onUploadComplete,
  acceptedFileTypes = "image/*",
  maxSizeMB = 5
}: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const timestamp = new Date().getTime();
      const filePath = `${path}/${timestamp}-${file.name}`;
      
      await uploadFile(bucket, filePath, file);
      const fileUrl = getFileUrl(bucket, filePath);
      
      onUploadComplete(fileUrl);
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedFileTypes}
        disabled={isUploading}
      />
      <label
        htmlFor="file-upload"
        className={`cursor-pointer flex items-center justify-center ${
          isUploading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <Button 
          type="button" 
          variant="outline" 
          disabled={isUploading}
          className="flex items-center gap-2"
          asChild
        >
          <span>
            <Upload className="h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default FileUpload;
