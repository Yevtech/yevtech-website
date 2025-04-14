
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CourseList from "./pages/courses/CourseList";
import CourseDetail from "./pages/courses/CourseDetail";
import ServiceList from "./pages/services/ServiceList";
import ServiceDetail from "./pages/services/ServiceDetail";
import Dashboard from "./pages/dashboard/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Course Routes */}
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:category" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          
          {/* Service Routes */}
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:category" element={<ServiceList />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
