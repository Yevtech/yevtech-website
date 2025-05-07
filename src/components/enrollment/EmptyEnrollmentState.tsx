
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const EmptyEnrollmentState: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <p className="text-lg font-medium mb-4">You haven't enrolled in any courses yet.</p>
        <Link to="/courses">
          <Button>Browse Courses</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EmptyEnrollmentState;
