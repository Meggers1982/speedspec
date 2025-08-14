import { UseFormReturn } from "react-hook-form";
import { MVPFormData } from "@/lib/mvpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb } from "lucide-react";

interface IdeaStepProps {
  form: UseFormReturn<MVPFormData>;
}

export function IdeaStep({ form }: IdeaStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <Lightbulb className="text-blue-600 text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Your Idea</h3>
          <p className="text-slate-600">Let's start with the basics of your MVP</p>
        </div>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  What problem are you trying to solve? *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: People waste time manually splitting bills at restaurants and it creates awkward conversations about who owes what."
                    className="h-24 resize-none"
                    data-testid="input-problem"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  What's your solution? *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Example: An app that automatically calculates splits and sends payment requests so everyone knows exactly what they owe."
                    className="h-24 resize-none"
                    data-testid="input-solution"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="targetUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Who's your target user? *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: Young professionals who eat out with friends regularly"
                    data-testid="input-target-user"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
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
