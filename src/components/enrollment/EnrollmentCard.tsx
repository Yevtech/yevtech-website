
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';
import { Course, Enrollment } from './types';

interface EnrollmentCardProps {
  enrollment: Enrollment;
  onUpdateProgress: (enrollmentId: string, newProgress: number) => void;
}

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({ enrollment, onUpdateProgress }) => {
  return (
    <Card key={enrollment.id} className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          {enrollment.courses.image_url ? (
            <img 
              src={enrollment.courses.image_url} 
              alt={enrollment.courses.title} 
              className="w-full h-40 md:h-full object-cover"
            />
          ) : (
            <div className="w-full h-40 md:h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-3/4 p-4">
          <h3 className="text-xl font-semibold">{enrollment.courses.title}</h3>
          
          <div className="flex flex-wrap gap-2 my-2">
            <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
              {enrollment.courses.level?.charAt(0).toUpperCase() + enrollment.courses.level?.slice(1) || 'Beginner'}
            </span>
            {enrollment.courses.duration && (
              <span className="text-sm px-2 py-1 bg-gray-100 rounded-full">
                {enrollment.courses.duration}
              </span>
            )}
            <span className={`text-sm px-2 py-1 rounded-full ${
              enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
              enrollment.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
            </span>
          </div>
          
          <div className="my-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{enrollment.progress}%</span>
            </div>
            <Progress value={enrollment.progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Link to={`/course/${enrollment.course_id}`}>
              <Button variant="outline">Continue Learning</Button>
            </Link>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onUpdateProgress(enrollment.id, Math.min(100, enrollment.progress + 25))}
                disabled={enrollment.progress >= 100}
              >
                Mark Progress +25%
              </Button>
              
              {enrollment.progress < 100 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onUpdateProgress(enrollment.id, 100)}
                >
                  Mark as Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnrollmentCard;
