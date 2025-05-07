
import { createClient } from '@supabase/supabase-js';

// Define fallback values for development only
// In production, these should be set in the environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create the Supabase client with correct values
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
