
import React from 'react';
import EnrollmentCard from './enrollment/EnrollmentCard';
import EmptyEnrollmentState from './enrollment/EmptyEnrollmentState';
import LoadingState from './enrollment/LoadingState';
import { useEnrollments } from './enrollment/useEnrollments';

const EnrollmentList = () => {
  const { enrollments, isLoading, updateProgress } = useEnrollments();

  if (isLoading) {
    return <LoadingState />;
  }

  if (enrollments.length === 0) {
    return <EmptyEnrollmentState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Courses</h2>
      
      {enrollments.map((enrollment) => (
        <EnrollmentCard 
          key={enrollment.id}
          enrollment={enrollment}
          onUpdateProgress={updateProgress}
        />
      ))}
    </div>
  );
};

export default EnrollmentList;
