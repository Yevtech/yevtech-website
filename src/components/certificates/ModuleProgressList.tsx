import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { CourseModule } from './types';

interface ModuleProgressListProps {
  modules: CourseModule[];
  isModuleCompleted: (moduleId: string) => boolean;
  onMarkComplete: (moduleId: string) => Promise<boolean>;
  completedCount: number;
  totalCount: number;
  progressPercentage: number;
  isLoading?: boolean;
}

const ModuleProgressList: React.FC<ModuleProgressListProps> = ({
  modules,
  isModuleCompleted,
  onMarkComplete,
  completedCount,
  totalCount,
  progressPercentage,
  isLoading,
}) => {
  const [loadingModuleId, setLoadingModuleId] = React.useState<string | null>(null);

  const handleMarkComplete = async (moduleId: string) => {
    setLoadingModuleId(moduleId);
    await onMarkComplete(moduleId);
    setLoadingModuleId(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-forest" />
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No modules available for this course yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Course Progress</span>
          <span className="text-sm text-muted-foreground">
            {completedCount} of {totalCount} modules completed
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {progressPercentage}% Complete
        </p>
      </div>

      {/* Module List */}
      <div className="space-y-3">
        {modules.map((module, index) => {
          const isCompleted = isModuleCompleted(module.id);
          const isLoadingThis = loadingModuleId === module.id;

          return (
            <div
              key={module.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                isCompleted 
                  ? 'bg-forest/5 border-forest/20' 
                  : 'bg-background border-border hover:border-forest/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-forest flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${isCompleted ? 'text-forest' : ''}`}>
                    Module {index + 1}: {module.title}
                  </p>
                  {module.description && (
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  )}
                  {module.duration_minutes && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {module.duration_minutes} min
                    </p>
                  )}
                </div>
              </div>

              {!isCompleted && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkComplete(module.id)}
                  disabled={isLoadingThis}
                  className="flex-shrink-0"
                >
                  {isLoadingThis ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Mark Complete'
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleProgressList;
