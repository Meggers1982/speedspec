import { useEffect } from "react";
import { useMVPForm } from "@/hooks/useMVPForm";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useToast } from "@/hooks/use-toast";
import { ProgressStepper } from "./ProgressStepper";
import { IdeaStep } from "./steps/IdeaStep";
import { FeaturesStep } from "./steps/FeaturesStep";
import { UserFlowStep } from "./steps/UserFlowStep";
import { TechnicalStep } from "./steps/TechnicalStep";
import { ReviewStep } from "./steps/ReviewStep";
import { TemplateCard } from "./TemplateCard";
import { FloatingActions } from "./FloatingActions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import { SparkleIcon, HeartIcon } from "@/components/icons/FeminineIcons";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export function MVPBuildTool() {
  const { toast } = useToast();
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const {
    form,
    currentStep,
    totalSteps,
    progress,
    steps,
    nextStep,
    prevStep,
    goToStep,
    getStepValidation,
    submitForm,
    isSubmitting,
  } = useMVPForm();

  const { formatLastSaved, loadDraft, clearDraft } = useAutoSave(
    form.watch,
    (data) => {
      console.log("Auto-saving form data:", data);
    }
  );

  // Load draft on component mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      form.reset(draft);
      toast({
        title: "Draft Loaded",
        description: "Your previous work has been restored.",
      });
    }
  }, [form, loadDraft, toast]);

  const handleNextStep = async () => {
    const isValid = await nextStep();
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
    }
  };

  const handleStepClick = async (step: number) => {
    const success = await goToStep(step);
    if (!success) {
      toast({
        title: "Navigation Error",
        description: "Please complete previous steps before jumping ahead.",
        variant: "destructive",
      });
    }
  };

  const handleTemplateSelect = (templateData: any) => {
    form.reset({ ...form.getValues(), ...templateData });
    toast({
      title: "Template Applied",
      description: "Template data has been loaded into your form.",
    });
  };

  const handleSaveDraft = () => {
    const data = form.getValues();
    localStorage.setItem("mvp-form-draft", JSON.stringify(data));
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally.",
    });
  };

  const handleSubmit = async (data: any) => {
    try {
      await submitForm(data);
      clearDraft();
      setShowSuccessDialog(true);
      toast({
        title: "Product Spec Complete!",
        description: "Your product specification has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit your product specification. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <IdeaStep form={form} />;
      case 1:
        return <FeaturesStep form={form} />;
      case 2:
        return <UserFlowStep form={form} />;
      case 3:
        return <TechnicalStep form={form} />;
      case 4:
        return <ReviewStep form={form} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  // Show success dialog for final step
  if (showSuccessDialog) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--warm-cream-50)' }}>
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--sage-green-100)' }}>
              <SparkleIcon className="w-8 h-8" style={{ color: 'var(--sage-green-600)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--gentle-gray-900)' }}>Product Spec Complete!</h2>
            <p className="mb-6" style={{ color: 'var(--gentle-gray-600)' }}>
              Your product specification is ready. Now it's time to start building!
            </p>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                form.reset();
              }}
              className="w-full btn-feminine-primary"
              data-testid="button-start-new-plan"
            >
              Create Another Spec
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--warm-cream-50)' }}>
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 backdrop-blur-md" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid var(--gentle-gray-200)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                background: `linear-gradient(135deg, var(--dusty-rose-400) 0%, var(--sage-green-400) 100%)`
              }}>
                <Rocket className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold" style={{ color: 'var(--gentle-gray-900)' }}>SpeedSpec</h1>
                <p className="text-sm hidden sm:block" style={{ color: 'var(--gentle-gray-500)' }}>Professional MVP Planning Tool</p>
              </div>
            </div>
            
            {/* Auto-save indicator */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm" style={{ color: 'var(--gentle-gray-600)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse-subtle" style={{ backgroundColor: 'var(--sage-green-500)' }}></div>
                <span data-testid="auto-save-status">{formatLastSaved()}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHelpDialog(true)}
                className="transition-colors hover:bg-opacity-20"
                style={{ 
                  color: 'var(--gentle-gray-400)',
                }}
                data-testid="header-help-button"
              >
                <HeartIcon className="text-lg" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Stepper */}
        <ProgressStepper
          currentStep={currentStep}
          totalSteps={totalSteps}
          progress={progress}
          steps={steps}
          onStepClick={handleStepClick}
          getStepValidation={getStepValidation}
        />

        {/* Form Container */}
        <Card className="bg-white rounded-2xl shadow-sm animate-slide-up" style={{ borderColor: 'var(--gentle-gray-200)' }}>
          <CardContent className="p-8">
            {renderCurrentStep()}

            {/* Validation Messages */}
            {currentStep < totalSteps - 1 && (
              <div className="mt-6">
                {getStepValidation(currentStep).isValid ? (
                  <Alert className="rounded-lg" style={{ 
                    backgroundColor: 'var(--sage-green-50)', 
                    borderColor: 'var(--sage-green-200)' 
                  }}>
                    <AlertDescription style={{ color: 'var(--sage-green-800)' }}>
                      ✓ All required fields completed for this step
                    </AlertDescription>
                  </Alert>
                ) : getStepValidation(currentStep).hasBeenTouched ? (
                  <Alert variant="destructive" className="rounded-lg" style={{
                    backgroundColor: 'var(--muted-coral-50)',
                    borderColor: 'var(--muted-coral-200)'
                  }}>
                    <AlertDescription style={{ color: 'var(--muted-coral-600)' }}>
                      Please complete all required fields before continuing
                    </AlertDescription>
                  </Alert>
                ) : null}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8" style={{ borderTop: '1px solid var(--gentle-gray-200)' }}>
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 btn-feminine-outline"
                data-testid="button-previous"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSaveDraft}
                  className="btn-feminine-ghost"
                  data-testid="button-save-draft"
                >
                  Save Draft
                </Button>
                {currentStep < totalSteps - 1 && (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 btn-feminine-primary"
                    data-testid="button-next"
                  >
                    <span>{currentStep === totalSteps - 2 ? 'Review Plan' : 'Continue'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template Cards */}
        {currentStep === 0 && (
          <TemplateCard onTemplateSelect={handleTemplateSelect} />
        )}
      </main>

      {/* Floating Actions */}
      <FloatingActions
        onSave={handleSaveDraft}
        onHelp={() => setShowHelpDialog(true)}
      />

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>SpeedSpec Help</DialogTitle>
            <DialogDescription>
              Need help building your MVP plan? Here are some tips:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium">Step 1: Your Idea</h4>
              <p className="text-slate-600">Clearly define the problem you're solving and your proposed solution.</p>
            </div>
            <div>
              <h4 className="font-medium">Step 2: Core Features</h4>
              <p className="text-slate-600">Focus on the one main feature and 2-3 supporting features for your MVP.</p>
            </div>
            <div>
              <h4 className="font-medium">Step 3: User Flow</h4>
              <p className="text-slate-600">Map out the key steps users take to get value from your product.</p>
            </div>
            <div>
              <h4 className="font-medium">Step 4: Technical Specs</h4>
              <p className="text-slate-600">Define your platform and technical requirements.</p>
            </div>
            <div>
              <h4 className="font-medium">Tips</h4>
              <ul className="text-slate-600 list-disc list-inside space-y-1">
                <li>Your work is automatically saved every few seconds</li>
                <li>Use templates for inspiration</li>
                <li>Keep your MVP scope small and focused</li>
                <li>You can navigate between completed steps</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
