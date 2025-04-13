
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Code, 
  Briefcase, 
  Brain,
  Monitor,
  Shield,
  TrendingUp,
  Camera,
  Cloud,
  Pen,
  MessageSquare,
  ChevronRight,
  Users,
  Award,
  Clock
} from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-black to-forest py-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering the Next Generation with Future-Ready Skills</h1>
              <p className="text-xl mb-8">
                YevTech Nexus is a community of innovation, bridging the gap between traditional learning 
                and modern industry demands.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/courses">
                  <Button className="bg-forest hover:bg-forest-700 text-white px-8 py-6 text-lg w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6 text-lg w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Programs & Courses</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive curriculum designed to equip students with real-world skills in technology, 
                entrepreneurship, entertainment, and finance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Technology Program */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-forest text-white p-4 flex items-center">
                  <Code size={24} className="mr-3" />
                  <h3 className="text-xl font-semibold">Technology</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <CourseItem icon={<Brain size={18} />} name="AI & Machine Learning" />
                    <CourseItem icon={<Code size={18} />} name="Web Development" />
                    <CourseItem icon={<Monitor size={18} />} name="Virtual Assistant" />
                    <CourseItem icon={<Shield size={18} />} name="Cybersecurity" />
                    <CourseItem icon={<Cloud size={18} />} name="Cloud Computing" />
                  </ul>
                  <Link to="/courses/tech" className="mt-6 inline-flex items-center text-forest font-medium hover:underline">
                    View All Courses <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>

              {/* Entrepreneurship Program */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-forest text-white p-4 flex items-center">
                  <Briefcase size={24} className="mr-3" />
                  <h3 className="text-xl font-semibold">Entrepreneurship</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <CourseItem icon={<Briefcase size={18} />} name="Business Development" />
                    <CourseItem icon={<TrendingUp size={18} />} name="Startups" />
                    <CourseItem icon={<Users size={18} />} name="Project Management" />
                    <CourseItem icon={<Award size={18} />} name="Vocational Skills" />
                  </ul>
                  <Link to="/courses/business" className="mt-6 inline-flex items-center text-forest font-medium hover:underline">
                    View All Courses <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>

              {/* Digital Media Program */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-forest text-white p-4 flex items-center">
                  <Camera size={24} className="mr-3" />
                  <h3 className="text-xl font-semibold">Digital Media</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <CourseItem icon={<Camera size={18} />} name="Content Creation" />
                    <CourseItem icon={<Pen size={18} />} name="Copywriting" />
                    <CourseItem icon={<MessageSquare size={18} />} name="Social Media Marketing" />
                    <CourseItem icon={<TrendingUp size={18} />} name="Digital Marketing" />
                  </ul>
                  <Link to="/courses/media" className="mt-6 inline-flex items-center text-forest font-medium hover:underline">
                    View All Courses <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/courses">
                <Button className="bg-forest hover:bg-forest-700">View All Programs</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Professional services tailored to meet educational and technological needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <ServiceCard 
                icon={<GraduationCap />} 
                title="Academic Tutoring" 
                description="Personalized academic support across various subjects and levels."
              />
              <ServiceCard 
                icon={<Code />} 
                title="Web Development" 
                description="Custom website and application development solutions."
              />
              <ServiceCard 
                icon={<Briefcase />} 
                title="Project Management" 
                description="Professional oversight for your educational and technical projects."
              />
              <ServiceCard 
                icon={<Monitor />} 
                title="Technical Support" 
                description="Reliable IT support for organizations and educational institutions."
              />
              <ServiceCard 
                icon={<Users />} 
                title="Virtual Assistance" 
                description="Remote administrative and technical support services."
              />
              <ServiceCard 
                icon={<MessageSquare />} 
                title="Social Media Management" 
                description="Strategic social media management to boost your online presence."
              />
              <ServiceCard 
                icon={<Camera />} 
                title="Vocational Training" 
                description="Practical skills training including cooking, fashion, dance and music."
              />
              <ServiceCard 
                icon={<Award />} 
                title="Educational Consulting" 
                description="Expert advice for educational institutions and programs."
              />
            </div>

            <div className="text-center mt-10">
              <Link to="/services">
                <Button className="bg-forest hover:bg-forest-700">Explore All Services</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-forest">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Why Choose YevTech Nexus</h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                Our approach to technology-driven education stands out for these key reasons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<GraduationCap size={48} className="text-white" />}
                title="Lifelong Learning"
                description="Education never goes out of style – we foster a mindset of continuous growth and development."
                light
              />
              <FeatureCard 
                icon={<Code size={48} className="text-white" />}
                title="Future-Ready Skills"
                description="Technology is the future – our curriculum adapts to continuous advancements and new opportunities."
                light
              />
              <FeatureCard 
                icon={<Brain size={48} className="text-white" />}
                title="Empowering Young Minds"
                description="We nurture innovation and entrepreneurship in the next generation of leaders."
                light
              />
              <FeatureCard 
                icon={<TrendingUp size={48} className="text-white" />}
                title="Sustainable Income"
                description="Education fuels long-term wealth generation and career opportunities."
                light
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                  <p className="text-gray-600 mb-6">
                    Join us in shaping the future of education and innovation. Let's build a generation 
                    of tech-savvy leaders, problem-solvers, and entrepreneurs.
                  </p>
                  <div className="space-y-3 md:space-y-0 md:space-x-3 md:flex">
                    <Link to="/signup">
                      <Button className="w-full md:w-auto bg-forest hover:bg-forest-700">
                        Create Account
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full md:w-auto">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 bg-forest flex items-center justify-center p-8 md:p-12">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-4">Our Community Benefits</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Clock size={18} className="text-white" />
                        </div>
                        <span className="ml-2">Access to comprehensive learning materials</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Users size={18} className="text-white" />
                        </div>
                        <span className="ml-2">Community of like-minded learners and professionals</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Award size={18} className="text-white" />
                        </div>
                        <span className="ml-2">Certificates and practical skills development</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Briefcase size={18} className="text-white" />
                        </div>
                        <span className="ml-2">Career opportunities and professional networking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Components
const CourseItem = ({ icon, name }) => (
  <li className="flex items-center">
    <div className="mr-2 text-forest">{icon}</div>
    <span>{name}</span>
  </li>
);

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
    <div className="text-forest mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link to="/contact" className="inline-flex items-center text-forest font-medium hover:underline">
      Request Service <ChevronRight size={16} className="ml-1" />
    </Link>
  </div>
);

const FeatureCard = ({ icon, title, description, light = false }) => (
  <div className={`p-6 rounded-lg ${light ? 'bg-forest-800 bg-opacity-30' : 'bg-white'} flex flex-col items-center text-center`}>
    <div className="mb-4">{icon}</div>
    <h3 className={`text-xl font-semibold mb-2 ${light ? 'text-white' : ''}`}>{title}</h3>
    <p className={`${light ? 'text-gray-200' : 'text-gray-600'}`}>{description}</p>
  </div>
);

export default Index;
