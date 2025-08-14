import { CheckCircle, Lightbulb, Settings, Map, Code, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
  steps: Array<{ title: string; description: string; icon: string }>;
  onStepClick: (step: number) => void;
  getStepValidation: (step: number) => { isValid: boolean; hasBeenTouched: boolean };
}

const iconMap = {
  lightbulb: Lightbulb,
  settings: Settings,
  map: Map,
  code: Code,
  "file-text": FileText,
};

export function ProgressStepper({
  currentStep,
  totalSteps,
  progress,
  steps,
  onStepClick,
  getStepValidation,
}: ProgressStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Build Your MVP Plan</h2>
          <p className="text-slate-600 mt-1">Step-by-step guide to validate and plan your product</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Progress</div>
          <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const IconComponent = iconMap[step.icon as keyof typeof iconMap] || FileText;
          const validation = getStepValidation(index);
          const isCompleted = index < currentStep || (index === currentStep && validation.isValid);
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep || isCompleted;

          return (
            <div 
              key={index}
              className={cn(
                "flex flex-col items-center group cursor-pointer transition-opacity",
                !isClickable && "opacity-60 cursor-not-allowed"
              )}
              onClick={() => isClickable && onStepClick(index)}
              data-testid={`step-indicator-${index}`}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-white mb-2 shadow-lg transition-all",
                isCompleted 
                  ? "bg-green-500"
                  : isCurrent
                  ? "bg-blue-500 animate-pulse-subtle"
                  : "bg-slate-300 text-slate-600"
              )}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>
              <span className={cn(
                "text-xs font-medium text-center max-w-20",
                isCompleted
                  ? "text-green-600"
                  : isCurrent
                  ? "text-blue-600"
                  : "text-slate-500"
              )}>
                {step.title}
              </span>
              {index < totalSteps - 1 && (
                <div className={cn(
                  "absolute top-5 w-20 h-0.5 transform translate-x-12",
                  index < currentStep ? "bg-green-500" : "bg-slate-300"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
