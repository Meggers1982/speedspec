import { UseFormReturn } from "react-hook-form";
import { MVPFormData } from "@/lib/mvpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Copy, Rocket, Calendar, Users, Target, Settings, CheckCircle } from "lucide-react";
import { exportToPDF, copyToClipboard, exportToJSON } from "@/lib/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface ReviewStepProps {
  form: UseFormReturn<MVPFormData>;
  onSubmit: (data: MVPFormData) => void;
}

export function ReviewStep({ form, onSubmit }: ReviewStepProps) {
  const { toast } = useToast();
  const formData = form.getValues();

  const handleExportPDF = () => {
    try {
      exportToPDF(formData);
      toast({
        title: "PDF Export",
        description: "Your MVP plan has been prepared for download.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard(formData);
      toast({
        title: "Copied!",
        description: "MVP plan copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Error",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportJSON = () => {
    try {
      const jsonData = exportToJSON(formData);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.title || 'mvp-plan'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "JSON Export",
        description: "Your MVP plan has been downloaded as JSON.",
      });
    } catch (error) {
      toast({
        title: "Export Error",
        description: "Failed to export JSON. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <FileText className="text-green-600 text-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Review & Export</h3>
          <p className="text-slate-600">Review your MVP plan and export it</p>
        </div>
      </div>

      <Form {...form}>
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="text-lg font-medium">
                Project Title *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a title for your MVP plan"
                  data-testid="input-project-title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Export Actions */}
        <div className="flex flex-wrap gap-3 mb-8 p-4 bg-slate-50 rounded-xl">
          <Button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center space-x-2"
            data-testid="button-export-pdf"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyToClipboard}
            className="flex items-center space-x-2"
            data-testid="button-copy-clipboard"
          >
            <Copy className="w-4 h-4" />
            <span>Copy to Clipboard</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleExportJSON}
            className="flex items-center space-x-2"
            data-testid="button-export-json"
          >
            <FileText className="w-4 h-4" />
            <span>Export JSON</span>
          </Button>
        </div>

        {/* MVP Plan Summary */}
        <div className="space-y-6">
          {/* Project Overview */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <Target className="w-5 h-5" />
                <span>Project Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Problem</h4>
                <p className="text-slate-700">{formData.problem || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Solution</h4>
                <p className="text-slate-700">{formData.solution || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Target User</h4>
                <p className="text-slate-700">{formData.targetUser || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Timeline</h4>
                <Badge variant="outline" className="flex items-center space-x-1 w-fit">
                  <Calendar className="w-3 h-3" />
                  <span>{formData.timeframe || "Not specified"}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Feature Specification */}
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center space-x-2 text-green-900">
                <Settings className="w-5 h-5" />
                <span>Feature Specification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Core Feature</h4>
                <p className="text-slate-700 text-lg">{formData.mainFeature || "Not specified"}</p>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Supporting Features</h4>
                <div className="space-y-1">
                  {formData.supportingFeatures?.filter(f => f.trim()).map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  )) || <p className="text-slate-500">No supporting features specified</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Flow */}
          <Card>
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center space-x-2 text-purple-900">
                <Users className="w-5 h-5" />
                <span>User Flow</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                {formData.userSteps?.filter(s => s.trim()).map((step, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700">{step}</p>
                      {formData.userStepDetails?.[i] && (
                        <p className="text-sm text-slate-500 mt-1">{formData.userStepDetails[i]}</p>
                      )}
                    </div>
                  </div>
                )) || <p className="text-slate-500">No user steps defined</p>}
              </div>
              
              {formData.painPoints && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <h5 className="font-medium text-amber-900 mb-1">Potential Pain Points</h5>
                  <p className="text-sm text-amber-800">{formData.painPoints}</p>
                </div>
              )}
              
              {formData.successMetrics && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-1">Success Metrics</h5>
                  <p className="text-sm text-green-800">{formData.successMetrics}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Technical Specification */}
          <Card>
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center space-x-2 text-orange-900">
                <Rocket className="w-5 h-5" />
                <span>Technical Specification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-medium text-slate-900 mb-2">Platform(s)</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.platform?.map((platform) => (
                    <Badge key={platform} variant="secondary">
                      {platform}
                    </Badge>
                  )) || <p className="text-slate-500">No platforms specified</p>}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-slate-900 mb-1">Technical Requirements</h4>
                <p className="text-slate-700">{formData.techNeeds || "Not specified"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Flows */}
          {formData.alternativeFlows && formData.alternativeFlows.length > 0 && (
            <Card>
              <CardHeader className="bg-indigo-50">
                <CardTitle className="flex items-center space-x-2 text-indigo-900">
                  <FileText className="w-5 h-5" />
                  <span>Alternative Flows</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {formData.alternativeFlows.map((flow, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-indigo-500" />
                      <span className="text-slate-700">{flow}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Final Submit Button */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-center">
          <h4 className="text-lg font-medium mb-2">🎯 Ready to Build Your MVP?</h4>
          <p className="mb-4">
            Focus: Build the simplest version that works, get it in front of users fast, then improve.
          </p>
          <Button
            type="button"
            onClick={() => onSubmit(formData)}
            className="bg-white text-blue-600 hover:bg-gray-100"
            data-testid="button-submit-mvp"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Complete MVP Plan
          </Button>
        </div>
      </Form>
    </div>
  );
}
