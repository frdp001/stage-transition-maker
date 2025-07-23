import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingStageProps {
  onComplete: () => void;
}

export const LoadingStage = ({ onComplete }: LoadingStageProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-sharepoint-gray flex items-center justify-center">
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sharepoint-blue rounded-lg mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-2xl font-semibold text-sharepoint-text mb-2">SharePoint</h1>
          <p className="text-sharepoint-text/70">Preparing your files...</p>
        </div>
        
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="text-center text-sm text-sharepoint-text/60">
            {progress}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};