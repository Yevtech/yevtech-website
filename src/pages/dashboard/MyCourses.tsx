
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Award, Clock, BookText, ChevronRight, Filter } from 'lucide-react';

interface CourseProps {
  id: string;
  title: string;
  category: string;
  progress: number;
  status: 'in-progress' | 'completed' | 'not-started';
  lastAccessed?: string;
  instructor: string;
  duration: string;
  lessons: number;
  completedLessons: number;
}

const MyCourses = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dummy courses data for demonstration
  const courses: CourseProps[] = [
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      category: "tech",
      progress: 75,
      status: 'in-progress',
      lastAccessed: '2 days ago',
      instructor: 'Dr. Sarah Johnson',
      duration: '8 weeks',
      lessons: 24,
      completedLessons: 18
    },
    {
      id: "blockchain-basics",
      title: "Blockchain Basics",
      category: "tech",
      progress: 45,
      status: 'in-progress',
      lastAccessed: '5 days ago',
      instructor: 'Michael Chen',
      duration: '6 weeks',
      lessons: 18,
      completedLessons: 8
    },
    {
      id: "web-development",
      title: "Full Stack Web Development",
      category: "tech",
      progress: 15,
      status: 'in-progress',
      lastAccessed: '1 week ago',
      instructor: 'Jessica Lee',
      duration: '12 weeks',
      lessons: 36,
      completedLessons: 5
    },
    {
      id: "intro-to-python",
      title: "Introduction to Python Programming",
      category: "tech",
      progress: 100,
      status: 'completed',
      lastAccessed: '3 weeks ago',
      instructor: 'David Wilson',
      duration: '4 weeks',
      lessons: 16,
      completedLessons: 16
    }
  ];
  
  // Filter courses based on status and search term
  const filteredCourses = courses.filter(course => 
    (filter === "all" || 
     (filter === "in-progress" && course.status === 'in-progress') ||
     (filter === "completed" && course.status === 'completed')
    ) && 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-gray-600">Track and manage your learning journey</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/courses">
            <Button className="bg-forest hover:bg-forest-700">Browse New Courses</Button>
          </Link>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            className="py-2 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Course Info */}
                <div className="flex-grow p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={course.status === 'completed' ? 'secondary' : 'default'}>
                      {course.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Last accessed: {course.lastAccessed || 'Never'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookText className="mr-2 h-4 w-4" />
                      <span>{course.completedLessons}/{course.lessons} lessons</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="bg-gray-50 p-4 md:p-6 flex md:flex-col justify-between md:justify-center items-center md:border-l">
                  <Link to={`/course/${course.id}`}>
                    <Button variant="outline" className="w-full mb-0 md:mb-3">
                      View Details
                    </Button>
                  </Link>
                  <Link to={`/course/${course.id}`}>
                    <Button className="bg-forest hover:bg-forest-700 flex items-center gap-1">
                      {course.status === 'completed' ? (
                        <>
                          <Award size={16} />
                          <span>Certificate</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          <span>Continue</span>
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search term' : 'You haven\'t enrolled in any courses yet'}
            </p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Recommended Courses */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Analysis</CardTitle>
              <CardDescription>Learn to analyze and interpret complex data sets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span>8 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Level:</span>
                  <span>Intermediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Instructor:</span>
                  <span>Emma Thompson</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Course</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Master the skills to lead teams and deliver projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span>6 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Level:</span>
                  <span>Beginner</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Instructor:</span>
                  <span>Robert Miller</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Course</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Digital Marketing</CardTitle>
              <CardDescription>Develop effective online marketing strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span>7 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Level:</span>
                  <span>Intermediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Instructor:</span>
                  <span>Sophia Garcia</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Course</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
