# Deployment Guide

This guide will help you set up this project in your own VSCode environment and deploy it to a web hosting service.

## Setting Up the Project in VSCode

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- VSCode
- Supabase account

### Step 1: Clone the Repository
```bash
git clone [your-repository-url]
cd [your-project-folder]
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Configure Supabase

1. Create a new Supabase project at [https://app.supabase.io](https://app.supabase.io)
2. Once your project is created, navigate to Settings > API in the Supabase dashboard
3. Copy your project URL and anon key
4. Create a `.env` file in the root of your project with the following content:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Step 4: Update Supabase Configuration
Update the `src/lib/supabase.ts` file with your environment variables:

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
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
```

### Step 5: Set Up Database Schema
Run the SQL migrations script from the `supabase/migrations/tables.sql` file in your Supabase project's SQL editor.

### Step 6: Set Up Storage Buckets
In your Supabase dashboard:
1. Go to Storage
2. Create the following buckets:
   - `avatars` - for user profile images
   - `course-images` - for course thumbnails
   - `course-materials` - for course files

For each bucket, set the appropriate CORS and RLS policies:

**CORS configuration (for all buckets)**:
```json
{
  "allowedOrigins": ["*"],
  "allowedMethods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  "allowedHeaders": ["*"],
  "maxAgeSeconds": 3600
}
```

**Row Level Security**:
Set up RLS policies to allow authenticated users to read and write to their own files.

### Step 7: Run the Development Server
```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173`

## Deploying to Production

### Option 1: Deploy to Netlify

1. Create a `netlify.toml` file in your project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Install Netlify CLI: `npm install -g netlify-cli`
3. Run `netlify login` to authenticate
4. Run `netlify init` to set up your project
5. Set up environment variables in Netlify dashboard
6. Deploy with `netlify deploy --prod`

### Option 2: Deploy to Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel login` to authenticate
3. Run `vercel` to initialize the project
4. Set up environment variables in Vercel dashboard
5. Deploy with `vercel --prod`

### Option 3: Deploy to Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase login` to authenticate
3. Run `firebase init` and select Hosting
4. Set the public directory to `dist`
5. Configure as a single-page app
6. Run `npm run build` to build your project
7. Deploy with `firebase deploy`

## Post-Deployment Tasks

1. Update authentication redirect URLs in your Supabase project settings
2. Test all functionality on the live site
3. Set up a custom domain name if desired
4. Configure Google Search Console for better SEO

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure your Supabase URLs and keys are correctly set in your environment variables.

2. **CORS Issues**: If you encounter CORS errors with Supabase:
   - Check your Supabase API settings
   - Verify your bucket CORS configurations
   - Ensure your environment is using HTTPS for production

3. **Build Failures**: Check your dependency versions and ensure compatibility.

4. **Database Issues**: Verify that all tables are created correctly in Supabase.

### Getting Help

If you encounter issues not covered in this guide, refer to:
- [Supabase Documentation](https://supabase.io/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)

## Keeping Your Site Updated

1. Regularly update dependencies for security patches
2. Monitor your Supabase usage and upgrade your plan if necessary
3. Use version control to track changes and roll back if needed
4. Set up monitoring tools to track site performance and user experience
