
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from '@/components/FileUpload';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

interface CourseFormProps {
  courseId?: string;
  onSuccess?: () => void;
}

const CourseForm = ({ courseId, onSuccess }: CourseFormProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(Boolean(courseId));
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('beginner');
  const [imageUrl, setImageUrl] = useState('');

  React.useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setTitle(data.title);
        setDescription(data.description || '');
        setCategory(data.category);
        setPrice(data.price.toString());
        setDuration(data.duration || '');
        setLevel(data.level || 'beginner');
        setImageUrl(data.image_url || '');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Failed to load course",
        description: "Course data could not be loaded.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCourse(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create or edit courses.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const courseData = {
      title,
      description,
      category,
      price: parseFloat(price),
      duration,
      level,
      image_url: imageUrl,
      instructor_id: user.id,
      updated_at: new Date().toISOString()
    };
    
    try {
      let result;
      
      if (courseId) {
        // Update existing course
        result = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', courseId);
      } else {
        // Insert new course
        result = await supabase
          .from('courses')
          .insert([{ ...courseData, created_at: new Date().toISOString() }]);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: courseId ? "Course Updated" : "Course Created",
        description: courseId 
          ? "Your course has been updated successfully" 
          : "Your new course has been created successfully",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (!courseId) {
        // Reset form if creating a new course
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice('');
        setDuration('');
        setLevel('beginner');
        setImageUrl('');
      }
    } catch (error: any) {
      console.error('Error saving course:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save course",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  if (isLoadingCourse) {
    return <div className="flex items-center justify-center p-6">Loading course data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{courseId ? 'Edit Course' : 'Create New Course'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">Course Title</label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Introduction to Web Development"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your course content and learning outcomes"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="personal-development">Personal Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium">Price ($)</label>
              <Input 
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="duration" className="block text-sm font-medium">Duration</label>
              <Input 
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 weeks"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium">Level</label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Course Image</label>
            <div className="flex flex-col gap-4">
              {imageUrl && (
                <div className="max-w-xs overflow-hidden rounded-lg border border-gray-200">
                  <img 
                    src={imageUrl} 
                    alt="Course preview" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <FileUpload
                bucket="course-images"
                path={courseId ? `course-${courseId}` : `course-new`}
                onUploadComplete={handleImageUpload}
                acceptedFileTypes="image/png, image/jpeg, image/jpg"
                maxSizeMB={5}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving...' : (courseId ? 'Update Course' : 'Create Course')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
