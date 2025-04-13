
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookText, Code, LineChart, Mail, User, Video, Briefcase, PenTool, Cpu, ShieldCheck, Database, Cloud, HelpCircle, Wallet } from 'lucide-react';
import Header from '@/components/ui/Header';
import { useToast } from "@/components/ui/use-toast";

interface CourseProps {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: JSX.Element;
  level: string;
  duration: string;
  price: string;
}

const courses: CourseProps[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    category: "tech",
    description: "Learn the basics of artificial intelligence and machine learning concepts",
    icon: <Cpu className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "8 weeks",
    price: "$99"
  },
  {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    category: "tech",
    description: "Understand blockchain technology fundamentals and applications",
    icon: <Database className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "6 weeks",
    price: "$89"
  },
  {
    id: "web-development",
    title: "Full Stack Web Development",
    category: "tech",
    description: "Learn to build responsive websites using modern technologies",
    icon: <Code className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "12 weeks",
    price: "$149"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Essentials",
    category: "tech",
    description: "Develop skills to protect systems and networks from digital attacks",
    icon: <ShieldCheck className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "10 weeks",
    price: "$129"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    category: "tech",
    description: "Master cloud technologies and deployment strategies",
    icon: <Cloud className="h-10 w-10 text-forest" />,
    level: "Advanced",
    duration: "10 weeks",
    price: "$139"
  },
  {
    id: "virtual-assistant",
    title: "Virtual Assistant Training",
    category: "tech",
    description: "Learn to provide remote administrative support",
    icon: <HelpCircle className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "5 weeks",
    price: "$79"
  },
  {
    id: "project-management",
    title: "Project Management",
    category: "business",
    description: "Learn methodologies to manage projects effectively",
    icon: <Briefcase className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "8 weeks",
    price: "$109"
  },
  {
    id: "business-development",
    title: "Business Development",
    category: "business",
    description: "Learn strategies to grow and expand your business",
    icon: <LineChart className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "7 weeks",
    price: "$99"
  },
  {
    id: "content-creation",
    title: "Content Creation & Strategy",
    category: "media",
    description: "Master creating engaging content for various platforms",
    icon: <PenTool className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "6 weeks",
    price: "$89"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "media",
    description: "Learn effective online marketing strategies",
    icon: <Mail className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "8 weeks",
    price: "$109"
  },
  {
    id: "fintech-intro",
    title: "Introduction to Fintech",
    category: "finance",
    description: "Explore how technology is transforming financial services",
    icon: <Wallet className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "5 weeks",
    price: "$79"
  },
  {
    id: "investment-strategies",
    title: "Investment Strategies",
    category: "finance",
    description: "Learn effective approaches to investing and wealth building",
    icon: <LineChart className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "7 weeks",
    price: "$99"
  }
];

const CourseList = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [animatedCards, setAnimatedCards] = useState<string[]>([]);

  // Filter courses based on category and search term
  const filteredCourses = courses.filter(course => 
    (filter === "all" || course.category === filter) && 
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: "Course Selected",
      description: `You've selected ${courseTitle}. Please sign in to enroll.`,
      duration: 5000,
    });
  };

  // Handle card hover animation
  const handleCardHover = (id: string) => {
    if (!animatedCards.includes(id)) {
      setAnimatedCards(prev => [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-forest text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Explore Our Courses</h1>
            <p className="text-lg md:text-xl max-w-3xl opacity-90">
              Discover a wide range of courses designed to help you master in-demand skills and advance your career.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Filters & Listings */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All Courses</TabsTrigger>
              <TabsTrigger value="tech" onClick={() => setFilter("tech")}>Technology</TabsTrigger>
              <TabsTrigger value="business" onClick={() => setFilter("business")}>Business</TabsTrigger>
              <TabsTrigger value="media" onClick={() => setFilter("media")}>Digital Media</TabsTrigger>
              <TabsTrigger value="finance" onClick={() => setFilter("finance")}>Finance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card 
                    key={course.id}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      animatedCards.includes(course.id) ? 'animate-scale-in' : ''
                    }`}
                    onMouseEnter={() => handleCardHover(course.id)}
                  >
                    <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-full">
                        {course.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <BookText className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                      <p className="font-bold text-forest">{course.price}</p>
                      <div className="flex space-x-2">
                        <Link to={`/course/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleEnroll(course.title)}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="tech" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  // Same card component as above
                  <Card 
                    key={course.id}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      animatedCards.includes(course.id) ? 'animate-scale-in' : ''
                    }`}
                    onMouseEnter={() => handleCardHover(course.id)}
                  >
                    <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-full">
                        {course.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <BookText className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                      <p className="font-bold text-forest">{course.price}</p>
                      <div className="flex space-x-2">
                        <Link to={`/course/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleEnroll(course.title)}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Similar TabsContent for business, media, and finance categories */}
            <TabsContent value="business" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  // Same card component as above
                  <Card 
                    key={course.id}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      animatedCards.includes(course.id) ? 'animate-scale-in' : ''
                    }`}
                    onMouseEnter={() => handleCardHover(course.id)}
                  >
                    <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-full">
                        {course.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <BookText className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                      <p className="font-bold text-forest">{course.price}</p>
                      <div className="flex space-x-2">
                        <Link to={`/course/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleEnroll(course.title)}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  // Same card component as above
                  <Card 
                    key={course.id}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      animatedCards.includes(course.id) ? 'animate-scale-in' : ''
                    }`}
                    onMouseEnter={() => handleCardHover(course.id)}
                  >
                    <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-full">
                        {course.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <BookText className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                      <p className="font-bold text-forest">{course.price}</p>
                      <div className="flex space-x-2">
                        <Link to={`/course/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleEnroll(course.title)}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="finance" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  // Same card component as above
                  <Card 
                    key={course.id}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      animatedCards.includes(course.id) ? 'animate-scale-in' : ''
                    }`}
                    onMouseEnter={() => handleCardHover(course.id)}
                  >
                    <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-full">
                        {course.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{course.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center">
                          <BookText className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                      <p className="font-bold text-forest">{course.price}</p>
                      <div className="flex space-x-2">
                        <Link to={`/course/${course.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Button size="sm" onClick={() => handleEnroll(course.title)}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CourseList;
