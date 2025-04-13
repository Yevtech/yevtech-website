
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  GraduationCap, 
  Code, 
  Briefcase, 
  HelpCircle, 
  Users, 
  Coffee,
  Scissors,
  Music,
  CheckCircle2,
  Clock,
  Calendar,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import Header from '@/components/ui/Header';
import { useToast } from "@/components/ui/use-toast";

interface ServiceDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  icon: JSX.Element;
  price: string;
  features: string[];
  benefits: string[];
  process: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

const servicesData: ServiceDetails[] = [
  {
    id: "academic-tutoring",
    title: "Academic Tutoring",
    category: "academic",
    description: "One-on-one academic support for students across various subjects",
    fullDescription: "Our academic tutoring service provides personalized one-on-one support to help students excel in their studies. Our experienced tutors work with students of all ages and levels, from elementary to university, across a wide range of subjects. We develop customized learning plans that address each student's unique needs, learning style, and goals.",
    icon: <BookOpen className="h-10 w-10 text-forest" />,
    price: "Starting at $25/hour",
    features: [
      "Personalized learning plans",
      "Subject matter experts",
      "Flexible scheduling",
      "Progress tracking",
      "Exam preparation"
    ],
    benefits: [
      "Improved academic performance",
      "Enhanced understanding of difficult concepts",
      "Increased confidence in classroom participation",
      "Better study habits and learning strategies",
      "Reduced academic anxiety",
      "Preparation for standardized tests"
    ],
    process: [
      {
        title: "Initial Assessment",
        description: "We begin with a comprehensive assessment to identify your strengths, weaknesses, and learning style."
      },
      {
        title: "Customized Plan",
        description: "Based on the assessment, we develop a personalized learning plan tailored to your specific needs and goals."
      },
      {
        title: "Regular Sessions",
        description: "You'll meet with your tutor on a regular schedule, whether weekly, bi-weekly, or as needed."
      },
      {
        title: "Progress Monitoring",
        description: "We continuously monitor your progress and adjust the learning plan as necessary to ensure optimal results."
      },
      {
        title: "Ongoing Support",
        description: "Between sessions, you can reach out to your tutor for additional help or clarification on assignments."
      }
    ],
    faq: [
      {
        question: "How do you match tutors with students?",
        answer: "We carefully match tutors with students based on subject expertise, teaching style, personality, and the student's specific needs and goals."
      },
      {
        question: "Where do tutoring sessions take place?",
        answer: "We offer both in-person and online tutoring sessions. In-person sessions can be conducted at your home, a local library, or our facility."
      },
      {
        question: "How long are tutoring sessions?",
        answer: "Standard sessions are 60 minutes, but we offer flexibility with 30-minute, 90-minute, or 2-hour sessions as needed."
      },
      {
        question: "Do you offer group tutoring?",
        answer: "Yes, we offer small group tutoring (2-4 students) at reduced rates for students studying the same subject and at similar levels."
      },
      {
        question: "Can I change tutors if it's not a good fit?",
        answer: "Absolutely. We want to ensure the best learning experience, so if you feel your tutor isn't the right match, we'll find a suitable replacement."
      }
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    category: "technical",
    description: "Professional website development for businesses and individuals",
    fullDescription: "Our web development service offers comprehensive solutions for businesses and individuals looking to establish or enhance their online presence. We design and develop custom websites that are visually appealing, user-friendly, and optimized for performance. From simple informational sites to complex e-commerce platforms, we deliver solutions tailored to your specific needs and goals.",
    icon: <Code className="h-10 w-10 text-forest" />,
    price: "Starting at $499",
    features: [
      "Responsive design",
      "Content management systems",
      "E-commerce integration",
      "SEO optimization",
      "Maintenance support"
    ],
    benefits: [
      "Professional online presence",
      "Mobile-friendly websites that work across all devices",
      "Easy content management for non-technical users",
      "Improved search engine rankings",
      "Enhanced user experience",
      "Secure and reliable hosting",
      "Integration with third-party tools and services"
    ],
    process: [
      {
        title: "Discovery",
        description: "We begin by understanding your business, goals, target audience, and specific requirements for your website."
      },
      {
        title: "Planning",
        description: "We create a detailed plan including sitemap, features list, and technology stack to meet your requirements."
      },
      {
        title: "Design",
        description: "Our designers create wireframes and visual mockups of your website for your review and approval."
      },
      {
        title: "Development",
        description: "Our developers build your website using modern technologies, ensuring it's responsive, secure, and optimized."
      },
      {
        title: "Testing",
        description: "We thoroughly test your website across different devices, browsers, and screen sizes to ensure it works perfectly."
      },
      {
        title: "Launch",
        description: "Once approved, we deploy your website to a production server and ensure everything is working properly."
      },
      {
        title: "Post-Launch Support",
        description: "We provide ongoing maintenance, updates, and support to keep your website running smoothly."
      }
    ],
    faq: [
      {
        question: "How long does it take to develop a website?",
        answer: "The timeline varies depending on the complexity of the project. A simple website might take 2-4 weeks, while more complex projects can take 2-3 months or longer."
      },
      {
        question: "Do you provide website hosting?",
        answer: "Yes, we offer reliable hosting solutions for all websites we develop. We can also help you set up hosting with a third-party provider if preferred."
      },
      {
        question: "Can I update the website myself after it's built?",
        answer: "Absolutely! We typically build websites on user-friendly content management systems (CMS) like WordPress that allow you to easily update content without technical knowledge."
      },
      {
        question: "Do you provide SEO services?",
        answer: "Yes, all our websites are built with basic SEO best practices. We also offer more comprehensive SEO services if needed."
      },
      {
        question: "What if I need changes after the website is completed?",
        answer: "We offer maintenance packages that include regular updates and changes. For more significant changes, we can provide a quote for additional development work."
      }
    ]
  },
  {
    id: "virtual-assistance",
    title: "Virtual Assistance",
    category: "management",
    description: "Remote administrative support for businesses and professionals",
    fullDescription: "Our Virtual Assistance service provides comprehensive remote administrative support to help businesses and professionals focus on their core activities. Our skilled virtual assistants handle a wide range of administrative tasks, from email and calendar management to data entry and customer service. We offer flexible packages to meet your specific needs, whether you need occasional help with specific tasks or ongoing support.",
    icon: <HelpCircle className="h-10 w-10 text-forest" />,
    price: "Starting at $20/hour",
    features: [
      "Email management",
      "Calendar scheduling",
      "Data entry",
      "Customer service",
      "Social media management"
    ],
    benefits: [
      "Free up valuable time to focus on core business activities",
      "Reduce operational costs compared to hiring full-time staff",
      "Scale support up or down based on your needs",
      "Access to specialized skills without additional training",
      "Improved efficiency and productivity",
      "No need to worry about employee benefits or office space"
    ],
    process: [
      {
        title: "Initial Consultation",
        description: "We start with a detailed discussion to understand your business, workflow, and specific needs."
      },
      {
        title: "Needs Assessment",
        description: "We conduct a thorough assessment to identify which tasks would be most beneficial to delegate."
      },
      {
        title: "VA Matching",
        description: "We match you with a virtual assistant whose skills and experience align with your requirements."
      },
      {
        title: "Onboarding",
        description: "We establish communication channels, access to necessary tools, and detailed procedures for tasks."
      },
      {
        title: "Regular Check-ins",
        description: "We schedule regular meetings to review progress, address any concerns, and adjust priorities as needed."
      },
      {
        title: "Performance Review",
        description: "We periodically evaluate the effectiveness of the service and make improvements as necessary."
      }
    ],
    faq: [
      {
        question: "What hours do your virtual assistants work?",
        answer: "Our virtual assistants can work during standard business hours in your time zone, or we can arrange for support during specific hours based on your needs."
      },
      {
        question: "How do I communicate with my virtual assistant?",
        answer: "Communication can be managed through email, phone, messaging apps, project management tools, or any combination that works best for you."
      },
      {
        question: "What if my virtual assistant is unavailable?",
        answer: "We provide backup support to ensure continuity of service during vacations, sick days, or other absences."
      },
      {
        question: "Can I change virtual assistants if it's not working out?",
        answer: "Yes, if you feel your current VA isn't the right fit, we'll work to find a more suitable match for your needs."
      },
      {
        question: "How is billing handled?",
        answer: "We offer hourly packages, monthly retainers, or project-based billing, depending on your preference. Detailed time tracking and reports are provided."
      }
    ]
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate fetching service data
    const foundService = servicesData.find(s => s.id === id);
    
    // Add a slight delay to simulate loading
    const timer = setTimeout(() => {
      setService(foundService || null);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. We'll respond shortly.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Schedule a Consultation",
      description: `Please sign in to schedule a consultation for ${service?.title}.`,
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

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Link to="/services">
            <Button>Browse All Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Service Hero */}
        <div className="bg-forest text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-white rounded-full">
                {service.icon}
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">{service.title}</h1>
                <p className="text-lg md:text-xl opacity-90 mb-4">{service.description}</p>
                <div className="text-sm">
                  <span className="font-medium">Category: </span>
                  <span className="capitalize">{service.category}</span>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col gap-3">
                <div className="text-2xl font-bold">{service.price}</div>
                <Button onClick={handleScheduleConsultation} className="w-full md:w-auto bg-white text-forest hover:bg-white/90 font-semibold">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full max-w-2xl mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="process">Our Process</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
                
                <div className="max-w-4xl">
                  <TabsContent value="overview" className="mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                      <h2 className="text-2xl font-bold mb-4">About This Service</h2>
                      <p className="text-gray-700 mb-6">{service.fullDescription}</p>
                      
                      <h3 className="text-xl font-semibold mb-3">Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-forest mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        {service.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-forest mr-2 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="process" className="mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold mb-6">Our Process</h2>
                      
                      <div className="space-y-8">
                        {service.process.map((step, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-forest rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                              <p className="text-gray-700">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                      
                      <div className="space-y-6">
                        {service.faq.map((item, index) => (
                          <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                            <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            {/* Contact Sidebar */}
            <div className="lg:w-96">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-forest"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Inquiry
                    </Button>
                  </form>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold mb-3">Other Ways to Contact Us</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-forest" />
                        <span>yevtechnexus@gmail.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-forest" />
                        <span>+2349077770809</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2 text-forest" />
                        <span>WhatsApp: +2349038625705</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Related Services */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesData
                .filter(s => s.category === service.category && s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => (
                  <Card key={relatedService.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="p-2 bg-secondary rounded-full">
                        {relatedService.icon}
                      </div>
                      <CardTitle className="text-lg">{relatedService.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{relatedService.description}</p>
                      <Link to={`/services/${relatedService.id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Contact us today to discuss how we can help you achieve your goals with our professional {service.title} service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleScheduleConsultation} size="lg" className="bg-forest hover:bg-forest-700">
                Schedule a Consultation
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetail;
