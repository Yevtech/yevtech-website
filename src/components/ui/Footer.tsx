
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Company */}
          <div>
            <h3 className="text-2xl font-bold mb-4">YevTech Nexus</h3>
            <p className="mb-4 text-gray-300">
              A forward-thinking educational and technology consulting firm dedicated to empowering the 
              next generation with future-ready skills.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-forest-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-forest-300">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-forest-300">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-forest-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-forest-300">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-forest-300">About Us</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-forest-300">Courses</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-forest-300">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-forest-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses/tech" className="text-gray-300 hover:text-forest-300">Technology</Link>
              </li>
              <li>
                <Link to="/courses/business" className="text-gray-300 hover:text-forest-300">Entrepreneurship</Link>
              </li>
              <li>
                <Link to="/courses/media" className="text-gray-300 hover:text-forest-300">Entertainment</Link>
              </li>
              <li>
                <Link to="/courses/finance" className="text-gray-300 hover:text-forest-300">Finance</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-forest-400" />
                <span className="text-gray-300">Asaba, Delta. Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-forest-400" />
                <span className="text-gray-300">+2349077770809</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-forest-400" />
                <span className="text-gray-300">WhatsApp: +2349038625705</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-forest-400" />
                <span className="text-gray-300">yevtechnexus@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} YevTech Nexus. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-forest-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-forest-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
