
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DS160FormData, PartialDS160FormData } from '../types/formTypes';
import { FormContextType } from '../types/contextTypes';
import { initialFormData } from './initialFormData';

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<DS160FormData>>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [formId, setFormId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (newData: PartialDS160FormData) => {
    setFormData((prevData: Partial<DS160FormData>) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      updateFormData, 
      currentStep, 
      setCurrentStep,
      formId,
      setFormId,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

// Export types to make them available when importing from FormContext
export type { DS160FormData, PartialDS160FormData };
