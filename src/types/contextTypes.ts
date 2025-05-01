
import { DS160FormData, PartialDS160FormData } from './formTypes';

export interface FormContextType {
  formData: Partial<DS160FormData>;
  updateFormData: (data: PartialDS160FormData) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formId: string | null;
  setFormId: (id: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}
