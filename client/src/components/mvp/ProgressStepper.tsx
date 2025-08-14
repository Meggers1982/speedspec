import { ChicIdeaIcon, ChicFeaturesIcon, ChicFlowIcon, ChicTechIcon, ChicDocumentIcon, ChicCheckIcon } from "@/components/icons/FeminineIcons";
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
  lightbulb: ChicIdeaIcon,
  settings: ChicFeaturesIcon,
  map: ChicFlowIcon,
  code: ChicTechIcon,
  "file-text": ChicDocumentIcon,
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
          <h2 className="text-2xl font-bold" style={{ color: 'var(--gentle-gray-800)' }}>Build Your Product Spec</h2>
          <p className="mt-1" style={{ color: 'var(--gentle-gray-600)' }}>Step-by-step guide to validate and plan your product</p>
        </div>
        <div className="text-right">
          <div className="text-sm" style={{ color: 'var(--gentle-gray-500)' }}>Progress</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--dusty-rose-500)' }}>{Math.round(progress)}%</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full rounded-full h-2 mb-6" style={{ backgroundColor: 'var(--gentle-gray-200)' }}>
        <div 
          className="h-2 rounded-full transition-all duration-500 ease-out" 
          style={{ 
            width: `${progress}%`,
            background: `linear-gradient(90deg, var(--dusty-rose-400) 0%, var(--sage-green-400) 100%)`
          }}
          data-testid="progress-bar"
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const IconComponent = iconMap[step.icon as keyof typeof iconMap] || ChicDocumentIcon;
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
                  ? ""
                  : isCurrent
                  ? "animate-pulse-subtle"
                  : ""
              )}
              style={{
                backgroundColor: isCompleted 
                  ? 'var(--sage-green-500)'
                  : isCurrent
                  ? 'var(--dusty-rose-500)'
                  : 'var(--gentle-gray-300)',
                color: isCompleted || isCurrent ? 'white' : 'var(--gentle-gray-600)'
              }}>
                {isCompleted ? (
                  <ChicCheckIcon className="w-5 h-5" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs font-medium text-center max-w-20"
              style={{
                color: isCompleted
                  ? 'var(--sage-green-600)'
                  : isCurrent
                  ? 'var(--dusty-rose-600)'
                  : 'var(--gentle-gray-500)'
              }}>
                {step.title}
              </span>
              {index < totalSteps - 1 && (
                <div className="absolute top-5 w-20 h-0.5 transform translate-x-12"
                style={{
                  backgroundColor: index < currentStep ? 'var(--sage-green-500)' : 'var(--gentle-gray-300)'
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
