import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mvpFormSchema, type MVPFormData, defaultFormValues } from "@/lib/mvpSchema";
import { useState, useCallback } from "react";

export function useMVPForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MVPFormData>({
    resolver: zodResolver(mvpFormSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const steps = [
    { title: "Your Idea", description: "What are you building?", icon: "lightbulb" },
    { title: "Core Features", description: "What does it need to do?", icon: "settings" },
    { title: "User Flow", description: "How do people use it?", icon: "map" },
    { title: "Technical Specs", description: "How will you build it?", icon: "code" },
    { title: "Review & Export", description: "Your complete MVP plan", icon: "file-text" },
  ];

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const nextStep = useCallback(async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await form.trigger(stepFields);
    
    if (isValid && currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
    return isValid;
  }, [currentStep, form, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(async (step: number) => {
    if (step < 0 || step >= totalSteps) return false;
    
    // Validate all previous steps before allowing navigation
    for (let i = 0; i < step; i++) {
      const stepFields = getStepFields(i);
      const isValid = await form.trigger(stepFields);
      if (!isValid) return false;
    }
    
    setCurrentStep(step);
    return true;
  }, [form, totalSteps]);

  const getStepValidation = useCallback((step: number) => {
    const stepFields = getStepFields(step);
    const errors = form.formState.errors;
    
    return {
      isValid: stepFields.every(field => !getNestedError(errors, field)),
      hasBeenTouched: stepFields.some(field => getNestedTouched(form.formState.touchedFields, field)),
    };
  }, [form.formState.errors, form.formState.touchedFields]);

  const submitForm = useCallback(async (data: MVPFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      console.log("Submitting MVP form data:", data);
      return data;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
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
  };
}

function getStepFields(step: number): (keyof MVPFormData)[] {
  switch (step) {
    case 0:
      return ["problem", "solution", "targetUser"];
    case 1:
      return ["mainFeature", "supportingFeatures"];
    case 2:
      return ["userSteps"];
    case 3:
      return ["platform", "techNeeds", "timeframe"];
    case 4:
      return ["title"];
    default:
      return [];
  }
}

function getNestedError(errors: any, field: string): any {
  return field.split('.').reduce((err, key) => err?.[key], errors);
}

function getNestedTouched(touched: any, field: string): any {
  return field.split('.').reduce((touch, key) => touch?.[key], touched);
}
