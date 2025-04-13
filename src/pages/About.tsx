
import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Target, Award, Users, ThumbsUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-forest py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About YevTech Nexus</h1>
              <p className="text-xl">
                A forward-thinking educational and technology consulting firm dedicated to empowering the 
                next generation with future-ready skills.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg leading-relaxed mb-6">
                YevTech Nexus is a community of innovation, empowering the younger generation with 
                technology-driven education. Our goal is to help young minds unlock their potential 
                and create a lasting impact on society.
              </p>
              <p className="text-lg leading-relaxed">
                We specialize in technology-driven education, bridging the gap between traditional 
                learning and modern industry demands. Through our comprehensive programs, we equip 
                students with the skills needed to thrive in today's digital world.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <Target size={30} className="text-forest mr-4" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We partner with institutions to introduce high-value, technology-driven educational 
                  programs in technology, entrepreneurship, entertainment, and finance. By integrating 
                  tech-focused courses into secondary education, we equip students with real-world skills 
                  to thrive in industries like AI, blockchain, and cybersecurity.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <Award size={30} className="text-forest mr-4" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To be a leading force in technology-driven education, empowering the next generation 
                  with innovative skills to thrive in a rapidly evolving digital world. We envision a 
                  future where young people are equipped with the knowledge and abilities to become 
                  leaders, innovators, and problem-solvers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why YevTech */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why This Project?</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-forest-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Award size={30} className="text-forest" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Education is Timeless</h3>
                <p className="text-gray-600">Learning is lifelong and never goes out of style.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-forest-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Target size={30} className="text-forest" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Technology is the Future</h3>
                <p className="text-gray-600">Continuous advancements create new opportunities.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-forest-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Users size={30} className="text-forest" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Empowering Young Minds</h3>
                <p className="text-gray-600">We nurture innovation and entrepreneurship.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-forest-100 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <ThumbsUp size={30} className="text-forest" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Income</h3>
                <p className="text-gray-600">Education fuels long-term wealth generation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Structure */}
        <section className="py-16 bg-forest text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Business Structure</h2>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-forest-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Strategic Partnerships</h3>
                <p className="text-gray-200">
                  We collaborate with schools and institutions to integrate tech programs 
                  into their existing curriculum.
                </p>
              </div>
              
              <div className="bg-forest-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Comprehensive Curriculum</h3>
                <p className="text-gray-200">
                  Our programs cover AI, cybersecurity, blockchain, fintech and more, 
                  designed to meet industry standards.
                </p>
              </div>
              
              <div className="bg-forest-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Hands-On Learning</h3>
                <p className="text-gray-200">
                  We focus on real-world applications and entrepreneurship training for 
                  practical skill development.
                </p>
              </div>
              
              <div className="bg-forest-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Revenue Model</h3>
                <p className="text-gray-200">
                  Our business is built on course subscriptions, institutional partnerships, 
                  and specialized workshops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                At YevTech Nexus, our team is made up of passionate professionals, educators, 
                and industry experts dedicated to transforming education through technology.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <p className="text-lg mb-8">
                With diverse backgrounds in technology, entrepreneurship, finance, and digital media, 
                we bring a wealth of knowledge and experience to empower the next generation. Our team 
                members are selected not only for their expertise but also for their passion for education 
                and commitment to nurturing young talent.
              </p>
              
              <div className="bg-white rounded-lg shadow-md p-8 mb-10">
                <h3 className="text-2xl font-bold mb-4">Our Culture & Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="text-forest mr-3 mt-1">✅</div>
                    <div>
                      <h4 className="font-semibold text-lg">Innovation</h4>
                      <p className="text-gray-600">Always exploring new ways to improve learning.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-forest mr-3 mt-1">✅</div>
                    <div>
                      <h4 className="font-semibold text-lg">Collaboration</h4>
                      <p className="text-gray-600">Working with institutions, professionals, and students.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-forest mr-3 mt-1">✅</div>
                    <div>
                      <h4 className="font-semibold text-lg">Excellence</h4>
                      <p className="text-gray-600">Committed to high-quality education and mentorship.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="text-forest mr-3 mt-1">✅</div>
                    <div>
                      <h4 className="font-semibold text-lg">Impact-Driven</h4>
                      <p className="text-gray-600">Focused on shaping the future workforce.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg text-center font-medium">
                We are more than a team—we are a community of changemakers working to shape 
                the future of education and technology.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
