
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
export const supabase = createClient(
  process.env.SUPABASE_URL || 'https://your-project-url.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'your-anon-key'
);

// Helper function for file uploads
export const uploadFile = async (
  bucket: string,
  filePath: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      upsert: true,
      cacheControl: '3600'
    });
  
  if (error) throw error;
  return data;
};

// Helper function to get file URL
export const getFileUrl = (bucket: string, filePath: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

