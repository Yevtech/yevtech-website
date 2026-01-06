
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  CheckCircle2, 
  Play, 
  Download, 
  Share2, 
  Star, 
  Users,
  Cpu,
  Database,
  Code,
  ShieldCheck,
  Cloud,
  HelpCircle,
  Briefcase,
  LineChart,
  PenTool,
  Mail,
  Wallet,
  GraduationCap
} from 'lucide-react';
import Header from '@/components/ui/Header';
import { useToast } from "@/components/ui/use-toast";
import TutorOrderModal from '@/components/TutorOrderModal';

interface CourseModule {
  title: string;
  lessons: {
    title: string;
    duration: string;
    type: 'video' | 'document' | 'quiz';
    isLocked: boolean;
  }[];
}

interface Instructor {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

interface CourseData {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: JSX.Element;
  level: string;
  duration: string;
  price: string;
  students: number;
  rating: number;
  reviews: number;
  learningOutcomes: string[];
  modules: CourseModule[];
  instructor: Instructor;
  tutorEmail: string;
}
const courses: CourseData[] = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    category: "tech",
    description: "Learn the basics of artificial intelligence and machine learning concepts",
    longDescription: "This comprehensive course introduces you to the exciting world of Artificial Intelligence. You'll learn the core concepts of AI, explore machine learning algorithms, and understand how AI is transforming industries globally. Through hands-on projects, you'll gain practical experience with AI tools and frameworks.",
    icon: <Cpu className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "8 weeks",
    price: "$99",
    students: 2457,
    rating: 4.7,
    reviews: 342,
    learningOutcomes: [
      "Understand core AI concepts and terminology",
      "Build and train simple machine learning models",
      "Apply AI solutions to real-world problems",
      "Evaluate the performance of AI systems",
      "Understand ethical implications of AI technologies"
    ],
    modules: [
      {
        title: "Introduction to Artificial Intelligence",
        lessons: [
          { title: "What is AI?", duration: "15 min", type: "video", isLocked: false },
          { title: "History of AI Development", duration: "20 min", type: "video", isLocked: false },
          { title: "AI Applications Overview", duration: "25 min", type: "video", isLocked: false },
          { title: "Week 1 Assessment", duration: "30 min", type: "quiz", isLocked: false }
        ]
      },
      {
        title: "Machine Learning Basics",
        lessons: [
          { title: "Introduction to Machine Learning", duration: "20 min", type: "video", isLocked: true },
          { title: "Supervised vs. Unsupervised Learning", duration: "25 min", type: "video", isLocked: true },
          { title: "ML Algorithms Overview", duration: "30 min", type: "video", isLocked: true },
          { title: "Week 2 Resources", duration: "15 min", type: "document", isLocked: true }
        ]
      },
      {
        title: "Neural Networks and Deep Learning",
        lessons: [
          { title: "Neural Network Fundamentals", duration: "30 min", type: "video", isLocked: true },
          { title: "Building Your First Neural Network", duration: "45 min", type: "video", isLocked: true },
          { title: "Deep Learning Applications", duration: "35 min", type: "video", isLocked: true },
          { title: "Deep Learning Project", duration: "60 min", type: "document", isLocked: true }
        ]
      }
    ],
    instructor: {
      name: "Dr. Sarah Johnson",
      role: "AI Research Scientist",
      bio: "Dr. Johnson has over 10 years of experience in AI research and has published numerous papers on machine learning algorithms. She previously worked at leading tech companies before joining YevTech Nexus.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    tutorEmail: "ai-tutor@yevtechnexus.com"
  },
  {
    id: "blockchain-basics",
    title: "Blockchain Basics",
    category: "tech",
    description: "Understand blockchain technology fundamentals and applications",
    longDescription: "Blockchain technology is revolutionizing how we think about trust, transparency, and security in digital systems. This course provides a comprehensive introduction to blockchain fundamentals, exploring its architecture, consensus mechanisms, and real-world applications beyond cryptocurrencies.",
    icon: <Database className="h-10 w-10 text-forest" />,
    level: "Beginner",
    duration: "6 weeks",
    price: "$89",
    students: 1853,
    rating: 4.5,
    reviews: 275,
    learningOutcomes: [
      "Understand blockchain architecture and components",
      "Explain how consensus mechanisms work",
      "Identify use cases for blockchain technology",
      "Create simple smart contracts",
      "Evaluate blockchain solutions for business problems"
    ],
    modules: [
      {
        title: "Blockchain Fundamentals",
        lessons: [
          { title: "What is Blockchain?", duration: "20 min", type: "video", isLocked: false },
          { title: "Blockchain Architecture", duration: "25 min", type: "video", isLocked: false },
          { title: "Cryptography Basics", duration: "30 min", type: "video", isLocked: false },
          { title: "Week 1 Quiz", duration: "20 min", type: "quiz", isLocked: false }
        ]
      },
      {
        title: "Blockchain Applications",
        lessons: [
          { title: "Cryptocurrencies Overview", duration: "25 min", type: "video", isLocked: true },
          { title: "Smart Contracts", duration: "30 min", type: "video", isLocked: true },
          { title: "DApps and Web3", duration: "35 min", type: "video", isLocked: true },
          { title: "Application Case Studies", duration: "40 min", type: "document", isLocked: true }
        ]
      },
      {
        title: "Blockchain Implementation",
        lessons: [
          { title: "Setting Up a Blockchain Environment", duration: "45 min", type: "video", isLocked: true },
          { title: "Creating Your First Smart Contract", duration: "50 min", type: "video", isLocked: true },
          { title: "Testing and Deployment", duration: "40 min", type: "video", isLocked: true },
          { title: "Final Project", duration: "120 min", type: "document", isLocked: true }
        ]
      }
    ],
    instructor: {
      name: "Michael Chen",
      role: "Blockchain Developer",
      bio: "Michael has been developing blockchain applications for over 5 years. He has contributed to several open-source blockchain projects and regularly speaks at blockchain conferences worldwide.",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    tutorEmail: "blockchain-tutor@yevtechnexus.com"
  },
  // Add more courses here for the other IDs
  {
    id: "web-development",
    title: "Full Stack Web Development",
    category: "tech",
    description: "Learn to build responsive websites using modern technologies",
    longDescription: "Master the art of web development from front to back. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and database technologies to give you the complete skill set needed to build modern, responsive web applications.",
    icon: <Code className="h-10 w-10 text-forest" />,
    level: "Intermediate",
    duration: "12 weeks",
    price: "$149",
    students: 3876,
    rating: 4.8,
    reviews: 521,
    learningOutcomes: [
      "Build responsive front-end interfaces with HTML, CSS, and JavaScript",
      "Create interactive UIs with React",
      "Develop RESTful APIs with Node.js and Express",
      "Design and implement database solutions",
      "Deploy full-stack applications to production environments"
    ],
    modules: [
      {
        title: "Front-End Fundamentals",
        lessons: [
          { title: "HTML5 Essentials", duration: "35 min", type: "video", isLocked: false },
          { title: "CSS3 and Responsive Design", duration: "40 min", type: "video", isLocked: false },
          { title: "JavaScript Basics", duration: "45 min", type: "video", isLocked: false },
          { title: "Front-End Project", duration: "60 min", type: "document", isLocked: false }
        ]
      },
      {
        title: "Modern Front-End Frameworks",
        lessons: [
          { title: "Introduction to React", duration: "40 min", type: "video", isLocked: true },
          { title: "React Hooks and State Management", duration: "45 min", type: "video", isLocked: true },
          { title: "Building UI Components", duration: "50 min", type: "video", isLocked: true },
          { title: "React Application Project", duration: "90 min", type: "document", isLocked: true }
        ]
      },
      {
        title: "Back-End Development",
        lessons: [
          { title: "Node.js Fundamentals", duration: "40 min", type: "video", isLocked: true },
          { title: "RESTful API Design", duration: "45 min", type: "video", isLocked: true },
          { title: "Database Integration", duration: "50 min", type: "video", isLocked: true },
          { title: "Full Stack Final Project", duration: "120 min", type: "document", isLocked: true }
        ]
      }
    ],
    instructor: {
      name: "Jessica Lee",
      role: "Senior Web Developer",
      bio: "Jessica has 8 years of experience in web development and has worked with startups and large corporations to build scalable web applications. She specializes in React and Node.js ecosystems.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    tutorEmail: "webdev-tutor@yevtechnexus.com"
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  useEffect(() => {
    // Simulate fetching course data
    const foundCourse = courses.find(c => c.id === id);
    
    // Add a slight delay to simulate loading
    const timer = setTimeout(() => {
      setCourse(foundCourse || null);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const toggleModule = (index: number) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleEnroll = () => {
    toast({
      title: "Sign in required",
      description: "Please sign in to enroll in this course.",
      duration: 5000,
    });
  };

  const handleStartFreeTrial = () => {
    toast({
      title: "Free Trial",
      description: "Sign in to start your 7-day free trial.",
      duration: 5000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses">
            <Button>Browse All Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Course Hero */}
        <div className="bg-forest text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-white rounded-full">
                {course.icon}
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">{course.title}</h1>
                <p className="text-lg md:text-xl opacity-90 mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-300" />
                    <span>{course.rating} ({course.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col gap-3">
                <div className="text-3xl font-bold">{course.price}</div>
                <Button onClick={handleEnroll} className="w-full md:w-auto bg-white text-forest hover:bg-white/90 font-semibold">
                  Enroll Now
                </Button>
                <Button variant="outline" onClick={handleStartFreeTrial} className="w-full md:w-auto border-white text-white hover:bg-white/10">
                  Start Free Trial
                </Button>
                <TutorOrderModal courseName={course.title} tutorEmail={course.tutorEmail}>
                  <Button variant="outline" className="w-full md:w-auto border-white text-white hover:bg-white/10 gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Order a Tutor
                  </Button>
                </TutorOrderModal>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-3xl mx-auto mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <div className="max-w-5xl mx-auto">
              <TabsContent value="overview" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                  <p className="text-gray-700 mb-6">{course.longDescription}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-forest mr-2 mt-0.5 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-6">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Syllabus
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-forest" />
                      Duration
                    </h3>
                    <p>{course.duration}</p>
                    <p className="text-sm text-gray-500 mt-1">Self-paced learning</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-forest" />
                      Certificate
                    </h3>
                    <p>Earn a certificate of completion</p>
                    <p className="text-sm text-gray-500 mt-1">Shareable on LinkedIn</p>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-forest" />
                      Resources
                    </h3>
                    <p>Downloadable materials</p>
                    <p className="text-sm text-gray-500 mt-1">Projects & exercises</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                  
                  <div className="space-y-4">
                    {course.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="border rounded-lg overflow-hidden">
                        <button 
                          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => toggleModule(moduleIndex)}
                        >
                          <h3 className="text-lg font-semibold">{module.title}</h3>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-3">{module.lessons.length} lessons</span>
                            <svg 
                              className={`w-5 h-5 transition-transform ${expandedModules.includes(moduleIndex) ? 'transform rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        
                        {expandedModules.includes(moduleIndex) && (
                          <div className="divide-y">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className={`p-4 flex justify-between items-center ${lesson.isLocked ? 'opacity-60' : ''}`}>
                                <div className="flex items-center">
                                  {lesson.type === 'video' ? (
                                    <Play className="h-5 w-5 mr-3 text-forest" />
                                  ) : lesson.type === 'document' ? (
                                    <Download className="h-5 w-5 mr-3 text-forest" />
                                  ) : (
                                    <CheckCircle2 className="h-5 w-5 mr-3 text-forest" />
                                  )}
                                  <span>{lesson.title}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-500 mr-3">{lesson.duration}</span>
                                  {lesson.isLocked ? (
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-center text-gray-600">
                      To access all course materials, please <button onClick={handleEnroll} className="text-forest font-semibold hover:underline">enroll in this course</button>.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name} 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{course.instructor.name}</h2>
                      <p className="text-forest font-medium mb-4">{course.instructor.role}</p>
                      <p className="text-gray-700">{course.instructor.bio}</p>
                      
                      <div className="mt-6 flex gap-3">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm">All Courses</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{course.rating}</div>
                      <div className="flex text-yellow-400 text-2xl mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-gray-600">{course.reviews} reviews</p>
                    </div>
                    
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
                      <p className="text-gray-600 mb-6">Reviews are only visible to enrolled students.</p>
                      
                      <Button onClick={handleEnroll}>Enroll to See Reviews</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Call to Action */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your learning journey?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Join thousands of students who are already mastering new skills with YevTech Nexus.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleEnroll} size="lg" className="bg-forest hover:bg-forest-700">
                Enroll Now
              </Button>
              <Button variant="outline" onClick={handleStartFreeTrial} size="lg">
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
