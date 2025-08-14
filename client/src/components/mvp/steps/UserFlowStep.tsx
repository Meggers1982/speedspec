import { UseFormReturn, useFieldArray } from "react-hook-form";
import { MVPFormData } from "@/lib/mvpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Map, AlertTriangle, TrendingUp, Plus, X } from "lucide-react";

interface UserFlowStepProps {
  form: UseFormReturn<MVPFormData>;
}

export function UserFlowStep({ form }: UserFlowStepProps) {
  const { fields: altFlowFields, append: appendAltFlow, remove: removeAltFlow } = useFieldArray({
    control: form.control,
    name: "alternativeFlows",
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Map className="text-blue-600 text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">User Flow</h3>
          <p className="text-slate-600">Map out how users will interact with your MVP</p>
        </div>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          {/* User Journey Steps */}
          <div>
            <FormLabel className="text-lg font-medium mb-4 block">
              What are the 3 key steps in your user journey? *
            </FormLabel>
            <p className="text-sm text-slate-600 mb-4">
              Think about the core actions users need to take to get value from your product.
            </p>
            
            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <FormField
                      control={form.control}
                      name={`userSteps.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder={
                                index === 0 
                                  ? "e.g., User signs up and completes onboarding"
                                  : index === 1
                                  ? "e.g., User adds their first project or data"
                                  : "e.g., User sees results or gets the main value"
                              }
                              data-testid={`input-user-step-${index}`}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`userStepDetails.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what happens in this step (optional)"
                              className="h-20 resize-none text-sm"
                              data-testid={`input-user-step-details-${index}`}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pain Points */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="text-amber-600 text-lg mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-amber-900 mb-2">Potential Pain Points</h4>
                <p className="text-sm text-amber-800 mb-4">
                  Where might users get stuck or frustrated in this flow?
                </p>
                <FormField
                  control={form.control}
                  name="painPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Users might not want to give contact permissions, bill photos might be unclear, friends might not respond to payment requests..."
                          className="bg-white border-amber-300 focus:ring-amber-500 focus:border-transparent h-20 resize-none text-sm"
                          data-testid="input-pain-points"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <TrendingUp className="text-green-600 text-lg mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-green-900 mb-2">Success Metrics</h4>
                <p className="text-sm text-green-800 mb-4">
                  How will you measure if users are completing this flow successfully?
                </p>
                <FormField
                  control={form.control}
                  name="successMetrics"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., % of users who complete all 3 steps, time to complete flow, user satisfaction scores..."
                          className="bg-white border-green-300 focus:ring-green-500 focus:border-transparent h-20 resize-none text-sm"
                          data-testid="input-success-metrics"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Alternative Flows */}
          <div className="border-t border-slate-200 pt-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-slate-900">Alternative User Flows</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendAltFlow("")}
                data-testid="button-add-alternative-flow"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Alternative Flow
              </Button>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Consider different ways users might achieve the same goal.
            </p>
            
            {altFlowFields.map((field, index) => (
              <div key={field.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-slate-900">Alternative Flow {index + 1}</h5>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAltFlow(index)}
                    className="text-slate-400 hover:text-red-500"
                    data-testid={`button-remove-alternative-flow-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`alternativeFlows.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Describe this alternative flow..."
                          data-testid={`input-alternative-flow-${index}`}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
}
