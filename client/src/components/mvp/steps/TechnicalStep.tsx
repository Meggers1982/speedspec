import { UseFormReturn } from "react-hook-form";
import { MVPFormData } from "@/lib/mvpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Code } from "lucide-react";

interface TechnicalStepProps {
  form: UseFormReturn<MVPFormData>;
}

const platformOptions = [
  'Simple website',
  'Mobile app (iOS/Android)',
  'Web app',
  'Browser extension',
  'Desktop app',
  'Not sure yet'
];

const timeframeOptions = [
  '2 weeks',
  '1 month',
  '2 months',
  '3 months',
  '6 months',
  'Just exploring'
];

export function TechnicalStep({ form }: TechnicalStepProps) {
  const watchedPlatform = form.watch("platform") || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <Code className="text-orange-600 text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Technical Specs</h3>
          <p className="text-slate-600">Define how you'll build your MVP</p>
        </div>
      </div>

      <Form {...form}>
        <div className="space-y-8">
          {/* Platform Selection */}
          <FormField
            control={form.control}
            name="platform"
            render={() => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  What platform(s) will you build on? (Select all that apply) *
                </FormLabel>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {platformOptions.map((option) => (
                    <FormField
                      key={option}
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option)}
                              onCheckedChange={(checked) => {
                                const value = field.value || [];
                                if (checked) {
                                  field.onChange([...value, option]);
                                } else {
                                  field.onChange(value.filter((item) => item !== option));
                                }
                              }}
                              data-testid={`checkbox-platform-${option.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            />
                          </FormControl>
                          <Label className="text-sm font-normal cursor-pointer">
                            {option}
                          </Label>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Technical Needs */}
          <FormField
            control={form.control}
            name="techNeeds"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  What technical stuff do you need? *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: User accounts, payment processing, SMS sending, data storage"
                    className="h-24 resize-none"
                    data-testid="input-tech-needs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Timeframe */}
          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  When do you want a working prototype? *
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-3 mt-3"
                  >
                    {timeframeOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option} 
                          id={option}
                          data-testid={`radio-timeframe-${option.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        />
                        <Label htmlFor={option} className="text-sm font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
}
