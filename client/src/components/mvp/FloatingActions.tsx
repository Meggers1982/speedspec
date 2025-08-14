import { Button } from "@/components/ui/button";
import { HelpCircle, Save } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FloatingActionsProps {
  onSave: () => void;
  onHelp: () => void;
}

export function FloatingActions({ onSave, onHelp }: FloatingActionsProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl bg-white border-slate-200"
            onClick={onHelp}
            data-testid="button-help"
          >
            <HelpCircle className="w-5 h-5 text-slate-600" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Get help</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700"
            onClick={onSave}
            data-testid="button-save"
          >
            <Save className="w-5 h-5 text-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save draft</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
