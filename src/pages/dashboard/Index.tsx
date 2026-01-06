import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  Plus,
  FileText,
  Upload,
  Bell,
  User,
  Award
} from 'lucide-react';

// Dashboard Components
import DashboardHome from './DashboardHome';
import MyCourses from './MyCourses';
import Services from './Services';
import Profile from './Profile';
import SettingsPage from './Settings';
import Certificates from './Certificates';

const Sidebar = ({ isMobileMenuOpen, toggleMobileMenu }: { isMobileMenuOpen: boolean, toggleMobileMenu: () => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    // We'll implement actual Supabase logout later
  };

  const navigationItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <BookOpen size={20} />, label: "My Courses", path: "/dashboard/courses" },
    { icon: <Award size={20} />, label: "Certificates", path: "/dashboard/certificates" },
    { icon: <ShoppingBag size={20} />, label: "My Services", path: "/dashboard/services" },
    { icon: <User size={20} />, label: "Profile", path: "/dashboard/profile" },
    { icon: <Settings size={20} />, label: "Settings", path: "/dashboard/settings" }
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`bg-sidebar border-r border-sidebar-border fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold text-forest">YevTech Nexus</h1>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    onClick={() => {
                      if (isMobileMenuOpen) toggleMobileMenu();
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Admin Section */}
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-sidebar-foreground opacity-70 uppercase tracking-wider mb-2">
                Admin
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/dashboard/admin/courses"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    onClick={() => {
                      if (isMobileMenuOpen) toggleMobileMenu();
                      toast({
                        title: "Admin Access",
                        description: "Connect to Supabase for admin functionality",
                      });
                    }}
                  >
                    <FileText size={20} />
                    <span>Manage Courses</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/admin/users"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    onClick={() => {
                      if (isMobileMenuOpen) toggleMobileMenu();
                      toast({
                        title: "Admin Access",
                        description: "Connect to Supabase for admin functionality",
                      });
                    }}
                  >
                    <Users size={20} />
                    <span>Manage Users</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/admin/upload"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    onClick={() => {
                      if (isMobileMenuOpen) toggleMobileMenu();
                      toast({
                        title: "Admin Access",
                        description: "Connect to Supabase for admin functionality",
                      });
                    }}
                  >
                    <Upload size={20} />
                    <span>Upload Materials</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ toggleMobileMenu }: { toggleMobileMenu: () => void }) => {
  return (
    <header className="sticky top-0 z-30 bg-background border-b py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
            <Plus size={16} />
            <span>New Course</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-forest rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-white">
              JD
            </div>
            <span className="hidden sm:inline">John Doe</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      
      <div className="flex-1 md:ml-64">
        <Header toggleMobileMenu={toggleMobileMenu} />
        
        <main className="p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/courses" element={<MyCourses />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/services" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-6">The dashboard page you're looking for doesn't exist.</p>
                <Link to="/dashboard">
                  <Button>Return to Dashboard</Button>
                </Link>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
