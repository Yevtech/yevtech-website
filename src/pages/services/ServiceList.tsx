
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
  ArrowRight,
  MailIcon
} from 'lucide-react';
import Header from '@/components/ui/Header';
import { useToast } from "@/components/ui/use-toast";

interface ServiceProps {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: JSX.Element;
  price: string;
  features: string[];
}

const services: ServiceProps[] = [
  {
    id: "academic-tutoring",
    title: "Academic Tutoring",
    category: "academic",
    description: "One-on-one academic support for students across various subjects",
    icon: <BookOpen className="h-10 w-10 text-forest" />,
    price: "Starting at $25/hour",
    features: [
      "Personalized learning plans",
      "Subject matter experts",
      "Flexible scheduling",
      "Progress tracking",
      "Exam preparation"
    ]
  },
  {
    id: "curriculum-development",
    title: "Curriculum Development",
    category: "academic",
    description: "Custom curriculum design for schools and educational institutions",
    icon: <GraduationCap className="h-10 w-10 text-forest" />,
    price: "Custom pricing",
    features: [
      "Needs assessment",
      "Content creation",
      "Learning objectives alignment",
      "Assessment design",
      "Implementation support"
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    category: "technical",
    description: "Professional website development for businesses and individuals",
    icon: <Code className="h-10 w-10 text-forest" />,
    price: "Starting at $499",
    features: [
      "Responsive design",
      "Content management systems",
      "E-commerce integration",
      "SEO optimization",
      "Maintenance support"
    ]
  },
  {
    id: "technical-support",
    title: "Technical Support",
    category: "technical",
    description: "IT support services for businesses and organizations",
    icon: <HelpCircle className="h-10 w-10 text-forest" />,
    price: "Starting at $75/hour",
    features: [
      "Hardware troubleshooting",
      "Software installation and setup",
      "Network configuration",
      "Data backup and recovery",
      "Security assessment"
    ]
  },
  {
    id: "project-management",
    title: "Project Management",
    category: "management",
    description: "Professional project planning and execution services",
    icon: <Briefcase className="h-10 w-10 text-forest" />,
    price: "Starting at $85/hour",
    features: [
      "Project planning",
      "Resource allocation",
      "Timeline development",
      "Risk management",
      "Progress reporting"
    ]
  },
  {
    id: "virtual-assistance",
    title: "Virtual Assistance",
    category: "management",
    description: "Remote administrative support for businesses and professionals",
    icon: <HelpCircle className="h-10 w-10 text-forest" />,
    price: "Starting at $20/hour",
    features: [
      "Email management",
      "Calendar scheduling",
      "Data entry",
      "Customer service",
      "Social media management"
    ]
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    category: "management",
    description: "Comprehensive social media strategy and content creation",
    icon: <Users className="h-10 w-10 text-forest" />,
    price: "Starting at $350/month",
    features: [
      "Platform setup",
      "Content strategy",
      "Post creation and scheduling",
      "Community engagement",
      "Performance analytics"
    ]
  },
  {
    id: "cooking-classes",
    title: "Cooking Classes",
    category: "vocational",
    description: "Learn to cook various cuisines with professional guidance",
    icon: <Coffee className="h-10 w-10 text-forest" />,
    price: "Starting at $45/session",
    features: [
      "Hands-on instruction",
      "Ingredient sourcing guidance",
      "Recipe development",
      "Cooking techniques",
      "Meal planning"
    ]
  },
  {
    id: "fashion-design",
    title: "Fashion Design & Styling",
    category: "vocational",
    description: "Learn fashion design principles and styling techniques",
    icon: <Scissors className="h-10 w-10 text-forest" />,
    price: "Starting at $60/session",
    features: [
      "Design principles",
      "Fabric selection",
      "Pattern making",
      "Styling techniques",
      "Portfolio development"
    ]
  },
  {
    id: "music-production",
    title: "Music & Dance Lessons",
    category: "vocational",
    description: "Professional instruction in various music and dance styles",
    icon: <Music className="h-10 w-10 text-forest" />,
    price: "Starting at $40/session",
    features: [
      "Personalized instruction",
      "Technique development",
      "Performance opportunities",
      "Equipment guidance",
      "Recording sessions"
    ]
  }
];

const ServiceList = () => {
  const { category } = useParams();
  const { toast } = useToast();
  const [filter, setFilter] = useState(category || "all");
  const [searchTerm, setSearchTerm] = useState("");
  const [animatedCards, setAnimatedCards] = useState<string[]>([]);

  // Filter services based on category and search term
  const filteredServices = services.filter(service => 
    (filter === "all" || service.category === filter) && 
    (service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     service.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInquire = (serviceTitle: string) => {
    toast({
      title: "Inquiry Sent",
      description: `Thank you for your interest in ${serviceTitle}. We'll contact you soon.`,
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Our Services</h1>
            <p className="text-lg md:text-xl max-w-3xl opacity-90">
              Discover our range of professional services designed to help individuals and organizations achieve their goals.
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Filters & Listings */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue={filter} className="w-full" onValueChange={setFilter}>
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="vocational">Vocational</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card 
                    key={service.id}
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                      animatedCards.includes(service.id) ? 'animate-scale-in' : ''
                    }`}
                    onMouseEnter={() => handleCardHover(service.id)}
                  >
                    <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-full">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.category.charAt(0).toUpperCase() + service.category.slice(1)}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-forest mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                      <p className="font-bold text-forest">{service.price}</p>
                      <div className="flex space-x-2">
                        <Link to={`/services/${service.id}`}>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            Details
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          size="sm" 
                          className="flex items-center gap-1"
                          onClick={() => handleInquire(service.title)}
                        >
                          <MailIcon className="h-4 w-4" />
                          Inquire
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold mb-2">No services found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </TabsContent>
            
            {["academic", "technical", "management", "vocational"].map((categoryName) => (
              <TabsContent key={categoryName} value={categoryName} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card 
                      key={service.id}
                      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                        animatedCards.includes(service.id) ? 'animate-scale-in' : ''
                      }`}
                      onMouseEnter={() => handleCardHover(service.id)}
                    >
                      <CardHeader className="bg-secondary p-4 flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-full">
                          {service.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription>{service.category.charAt(0).toUpperCase() + service.category.slice(1)}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <p className="mb-4">{service.description}</p>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-forest mr-2">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                        <p className="font-bold text-forest">{service.price}</p>
                        <div className="flex space-x-2">
                          <Link to={`/services/${service.id}`}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              Details
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleInquire(service.title)}
                          >
                            <MailIcon className="h-4 w-4" />
                            Inquire
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold mb-2">No services found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Call to Action */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Our team can create tailored services to meet your specific needs. Get in touch today.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-forest hover:bg-forest-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceList;
