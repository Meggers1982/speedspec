import { UseFormReturn, useFieldArray } from "react-hook-form";
import { MVPFormData } from "@/lib/mvpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Plus, X } from "lucide-react";

interface FeaturesStepProps {
  form: UseFormReturn<MVPFormData>;
}

export function FeaturesStep({ form }: FeaturesStepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "supportingFeatures",
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <Settings className="text-green-600 text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Core Features</h3>
          <p className="text-slate-600">Define what your MVP needs to do</p>
        </div>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="mainFeature"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  What's the ONE main thing your app does? *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: Split a bill and send payment requests"
                    data-testid="input-main-feature"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel className="text-lg font-medium">
                Supporting features *
              </FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
                data-testid="button-add-feature"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-3">
                <FormField
                  control={form.control}
                  name={`supportingFeatures.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder={`Supporting feature ${index + 1}${
                            index === 0 
                              ? ' (Example: Calculate individual amounts)' 
                              : index === 1
                              ? ' (Example: Send text notifications)'
                              : ''
                          }`}
                          data-testid={`input-supporting-feature-${index}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                    data-testid={`button-remove-feature-${index}`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
}
