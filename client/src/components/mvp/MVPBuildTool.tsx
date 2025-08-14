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
        title: "MVP Plan Complete!",
        description: "Your MVP plan has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Failed to submit your MVP plan. Please try again.",
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">MVP Plan Complete!</h2>
            <p className="text-slate-600 mb-6">
              Your MVP plan is ready. Now it's time to start building!
            </p>
            <Button
              onClick={() => {
                setShowSuccessDialog(false);
                form.reset();
              }}
              className="w-full"
              data-testid="button-start-new-plan"
            >
              Create Another Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Rocket className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">MVP Builder</h1>
                <p className="text-sm text-slate-500 hidden sm:block">Professional MVP Planning Tool</p>
              </div>
            </div>
            
            {/* Auto-save indicator */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-subtle"></div>
                <span data-testid="auto-save-status">{formatLastSaved()}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHelpDialog(true)}
                className="text-slate-400 hover:text-slate-600"
                data-testid="header-help-button"
              >
                <Rocket className="text-lg" />
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
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200 animate-slide-up">
          <CardContent className="p-8">
            {renderCurrentStep()}

            {/* Validation Messages */}
            {currentStep < totalSteps - 1 && (
              <div className="mt-6">
                {getStepValidation(currentStep).isValid ? (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      ✓ All required fields completed for this step
                    </AlertDescription>
                  </Alert>
                ) : getStepValidation(currentStep).hasBeenTouched ? (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Please complete all required fields before continuing
                    </AlertDescription>
                  </Alert>
                ) : null}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
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
                  data-testid="button-save-draft"
                >
                  Save Draft
                </Button>
                {currentStep < totalSteps - 1 && (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2"
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
            <DialogTitle>MVP Builder Help</DialogTitle>
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
