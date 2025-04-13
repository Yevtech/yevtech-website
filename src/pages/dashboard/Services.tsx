
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Calendar, Clock, DollarSign, FileText, MessageSquare } from 'lucide-react';

interface ServiceProps {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'completed' | 'scheduled';
  date: string;
  price: string;
  description: string;
}

const Services = () => {
  // Dummy services data for demonstration
  const services: ServiceProps[] = [
    {
      id: "academic-tutoring-1",
      title: "Academic Tutoring - Mathematics",
      category: "academic",
      status: 'active',
      date: 'Weekly, Mon & Wed 4-5 PM',
      price: "$25/hour",
      description: "One-on-one mathematics tutoring sessions to help improve understanding of calculus concepts."
    },
    {
      id: "web-development-1",
      title: "Web Development - Portfolio Website",
      category: "technical",
      status: 'active',
      date: 'Due: June 15, 2023',
      price: "$750",
      description: "Development of a personal portfolio website with responsive design and content management system."
    },
    {
      id: "career-counseling-1",
      title: "Career Counseling Session",
      category: "management",
      status: 'scheduled',
      date: 'May 20, 2023, 2:00 PM',
      price: "$85",
      description: "One-hour session to discuss career goals, resume review, and job search strategies."
    },
    {
      id: "cooking-class-1",
      title: "Italian Cooking Masterclass",
      category: "vocational",
      status: 'completed',
      date: 'April 12, 2023',
      price: "$120",
      description: "Group cooking class focused on authentic Italian pasta-making techniques and recipes."
    }
  ];

  // Group services by status
  const activeServices = services.filter(service => service.status === 'active');
  const scheduledServices = services.filter(service => service.status === 'scheduled');
  const completedServices = services.filter(service => service.status === 'completed');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Services</h1>
          <p className="text-gray-600">Track and manage your service bookings</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/services">
            <Button className="bg-forest hover:bg-forest-700">Browse Services</Button>
          </Link>
        </div>
      </div>
      
      {/* Active Services */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Active Services</h2>
        {activeServices.length > 0 ? (
          <div className="space-y-4">
            {activeServices.map((service) => (
              <Card key={service.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-600">Active</Badge>
                      <span className="text-sm text-gray-500 capitalize">{service.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-3">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{service.date}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 md:p-6 flex md:flex-col justify-between md:justify-center items-center md:border-l">
                    <Button variant="outline" className="w-full mb-0 md:mb-3">
                      View Details
                    </Button>
                    <Button className="bg-forest hover:bg-forest-700 flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>Contact</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No active services found.</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Scheduled Services */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Scheduled Services</h2>
        {scheduledServices.length > 0 ? (
          <div className="space-y-4">
            {scheduledServices.map((service) => (
              <Card key={service.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-blue-500 text-blue-500">Scheduled</Badge>
                      <span className="text-sm text-gray-500 capitalize">{service.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-3">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{service.date}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 md:p-6 flex md:flex-col justify-between md:justify-center items-center md:border-l">
                    <Button variant="outline" className="w-full mb-0 md:mb-3">
                      View Details
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-1">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No scheduled services found.</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Service History */}
      <div>
        <h2 className="text-xl font-bold mb-4">Service History</h2>
        {completedServices.length > 0 ? (
          <div className="space-y-4">
            {completedServices.map((service) => (
              <Card key={service.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-grow p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">Completed</Badge>
                      <span className="text-sm text-gray-500 capitalize">{service.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-3">{service.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{service.date}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 md:p-6 flex md:flex-col justify-between md:justify-center items-center md:border-l">
                    <Button variant="outline" className="w-full mb-0 md:mb-3">
                      View Details
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-1">
                      <FileText size={16} />
                      <span>Invoice</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-50">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">No service history found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Services;
