
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          {/* Logo placeholder - replace src with your actual logo */}
          <div className="w-10 h-10 rounded-lg bg-forest flex items-center justify-center text-white font-bold text-lg">
            Y
          </div>
          <h1 className="text-2xl font-bold text-forest">YevTech Nexus</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/courses/tech" title="Technology">
                      AI, Blockchain, Web Development, and more
                    </ListItem>
                    <ListItem href="/courses/business" title="Business">
                      Entrepreneurship, Project Management
                    </ListItem>
                    <ListItem href="/courses/media" title="Digital Media">
                      Content Creation, Digital Marketing
                    </ListItem>
                    <ListItem href="/courses/finance" title="Finance">
                      Fintech, Investment Strategies
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/services/academic" title="Academic">
                      Tutoring, Curriculum Development
                    </ListItem>
                    <ListItem href="/services/technical" title="Technical">
                      Web Development, Technical Support
                    </ListItem>
                    <ListItem href="/services/management" title="Management">
                      Project Management, Virtual Assistance
                    </ListItem>
                    <ListItem href="/services/vocational" title="Vocational">
                      Cooking, Fashion, Dance and Music
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth & Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="flex items-center gap-2">
              <User size={16} />
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-forest hover:bg-forest-700">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            
            <div className="py-2 border-b border-gray-100">
              <button className="flex items-center justify-between w-full" onClick={(e) => {
                e.preventDefault();
                const content = document.getElementById('coursesMobileContent');
                if (content) content.classList.toggle('hidden');
              }}>
                Courses <ChevronDown size={16} />
              </button>
              <div id="coursesMobileContent" className="hidden mt-2 pl-4 space-y-2">
                <Link to="/courses/tech" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Technology</Link>
                <Link to="/courses/business" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Business</Link>
                <Link to="/courses/media" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Digital Media</Link>
                <Link to="/courses/finance" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Finance</Link>
              </div>
            </div>

            <div className="py-2 border-b border-gray-100">
              <button className="flex items-center justify-between w-full" onClick={(e) => {
                e.preventDefault();
                const content = document.getElementById('servicesMobileContent');
                if (content) content.classList.toggle('hidden');
              }}>
                Services <ChevronDown size={16} />
              </button>
              <div id="servicesMobileContent" className="hidden mt-2 pl-4 space-y-2">
                <Link to="/services/academic" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Academic</Link>
                <Link to="/services/technical" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Technical</Link>
                <Link to="/services/management" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Management</Link>
                <Link to="/services/vocational" className="block py-1" onClick={() => setMobileMenuOpen(false)}>Vocational</Link>
              </div>
            </div>
            
            <Link to="/about" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            
            <Link to="/contact" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            
            <div className="flex flex-col space-y-3 pt-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <User size={16} />
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-forest hover:bg-forest-700">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
