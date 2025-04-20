
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://your-project-url.supabase.co',
  'your-anon-key'
);
