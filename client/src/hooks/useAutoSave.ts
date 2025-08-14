import { useEffect, useRef, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { MVPFormData } from "@/lib/mvpSchema";

export function useAutoSave(
  watch: UseFormWatch<MVPFormData>,
  onSave?: (data: MVPFormData) => void
) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const subscription = watch((data) => {
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout for auto-save
      saveTimeoutRef.current = setTimeout(() => {
        setIsSaving(true);
        
        // Save to localStorage
        localStorage.setItem("mvp-form-draft", JSON.stringify(data));
        
        // Call optional save callback
        if (onSave) {
          onSave(data as MVPFormData);
        }
        
        setLastSaved(new Date());
        setIsSaving(false);
      }, 2000); // Auto-save after 2 seconds of inactivity
    });

    return () => {
      subscription.unsubscribe();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [watch, onSave]);

  const loadDraft = (): MVPFormData | null => {
    try {
      const draft = localStorage.getItem("mvp-form-draft");
      return draft ? JSON.parse(draft) : null;
    } catch {
      return null;
    }
  };

  const clearDraft = () => {
    localStorage.removeItem("mvp-form-draft");
    setLastSaved(null);
  };

  const formatLastSaved = (): string => {
    if (!lastSaved) return "Not saved";
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);
    
    if (diff < 60) return "Auto-saved now";
    if (diff < 3600) return `Auto-saved ${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `Auto-saved ${Math.floor(diff / 3600)} hr ago`;
    return `Auto-saved ${lastSaved.toLocaleDateString()}`;
  };

  return {
    lastSaved,
    isSaving,
    formatLastSaved,
    loadDraft,
    clearDraft,
  };
}
