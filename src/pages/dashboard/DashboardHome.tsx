
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Clock, Calendar, TrendingUp, User, Users, Activity } from 'lucide-react';

const DashboardHome = () => {
  // Dummy data for the dashboard
  const enrolledCourses = 3;
  const completedCourses = 1;
  const activeServices = 2;
  
  // User progress data for enrolled courses
  const courseProgress = [
    { 
      id: 'ai-fundamentals', 
      title: 'AI Fundamentals', 
      progress: 75, 
      lastAccessed: '2 days ago',
      nextLesson: 'Neural Networks and Deep Learning'
    },
    { 
      id: 'blockchain-basics', 
      title: 'Blockchain Basics', 
      progress: 45, 
      lastAccessed: '5 days ago',
      nextLesson: 'Smart Contracts'
    },
    { 
      id: 'web-development', 
      title: 'Full Stack Web Development', 
      progress: 15, 
      lastAccessed: '1 week ago',
      nextLesson: 'JavaScript Fundamentals'
    }
  ];
  
  // Upcoming events or deadlines
  const upcomingEvents = [
    {
      title: 'Assignment Due: AI Case Study',
      date: 'Tomorrow, 11:59 PM',
      course: 'AI Fundamentals'
    },
    {
      title: 'Live Webinar: Blockchain Technology',
      date: 'May 15, 3:00 PM',
      course: 'Blockchain Basics'
    },
    {
      title: 'Group Project Meeting',
      date: 'May 18, 2:00 PM',
      course: 'Full Stack Web Development'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-gray-600">Here's an overview of your learning journey.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Enrolled Courses</p>
              <p className="text-2xl font-bold">{enrolledCourses}</p>
            </div>
            <div className="p-3 bg-forest/10 rounded-full">
              <BookOpen className="h-6 w-6 text-forest" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed Courses</p>
              <p className="text-2xl font-bold">{completedCourses}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Services</p>
              <p className="text-2xl font-bold">{activeServices}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Learning Hours</p>
              <p className="text-2xl font-bold">32h</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Course Progress */}
      <h2 className="text-xl font-bold mb-4">Course Progress</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {courseProgress.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader className="bg-secondary p-4 pb-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>Last accessed: {course.lastAccessed}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2 mb-4" />
              <p className="text-sm">
                <span className="font-medium">Next Lesson:</span> {course.nextLesson}
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-between">
              <span className="text-sm text-gray-500">
                {course.progress === 100 ? 'Completed' : 'In Progress'}
              </span>
              <Link to={`/course/${course.id}`}>
                <Button variant="outline" size="sm">
                  {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Calendar className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                      <p className="text-sm text-forest">{event.course}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="ghost" size="sm" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Recommended Courses */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium">Data Analysis</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Learn to analyze and interpret complex data sets.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">View Course</Button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <h3 className="font-medium">Project Management</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Master the skills to lead teams and deliver projects on time.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">View Course</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Link to="/courses">
                <Button className="w-full">Explore All Courses</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
