import { Card, CardContent } from "@/components/ui/card";
import { ChicShoppingCartIcon, ChicUsersIcon, ChicClipboardIcon } from "@/components/icons/FeminineIcons";
import { mvpTemplates } from "@/lib/mvpSchema";

interface TemplateCardProps {
  onTemplateSelect: (templateData: any) => void;
}

const iconMap = {
  "shopping-cart": ChicShoppingCartIcon,
  "users": ChicUsersIcon,
  "clipboard-list": ChicClipboardIcon,
};

export function TemplateCard({ onTemplateSelect }: TemplateCardProps) {
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-900">Need inspiration?</h4>
          <span className="text-sm text-blue-600 font-medium">MVP Templates</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mvpTemplates.map((template) => {
            const IconComponent = iconMap[template.icon as keyof typeof iconMap] || ChicClipboardIcon;
            
            return (
              <div
                key={template.id}
                className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                onClick={() => onTemplateSelect(template.data)}
                data-testid={`template-${template.id}`}
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <IconComponent className="text-purple-600 w-4 h-4" />
                </div>
                <h5 className="font-medium text-slate-900 mb-1">{template.name}</h5>
                <p className="text-sm text-slate-600">{template.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
