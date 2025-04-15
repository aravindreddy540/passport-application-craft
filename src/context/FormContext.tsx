
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our form data
export interface DS160FormData {
  // Personal Information
  lastName: string;
  firstName: string;
  middleName?: string;
  gender: string;
  dateOfBirth: string;
  cityOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Passport Information
  passportNumber: string;
  passportIssuedCountry: string;
  passportIssuedDate: string;
  passportExpiryDate: string;
  
  // Travel Information
  travelPurpose: string;
  intendedArrivalDate: string;
  intendedStayDuration: number;
  usContactInfo: {
    name: string;
    organization: string;
    relationship: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  
  // Previous US Travel
  previousUSTravel: boolean;
  previousUSTravelDetails: Array<{
    arrivalDate: string;
    departureDate: string;
    lengthOfStay: number;
  }>;
  
  // Employment Information
  employmentStatus: string;
  employer: {
    name: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  
  // Education Information
  educationLevel: string;
  schools: Array<{
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    courseOfStudy: string;
    fromDate: string;
    toDate: string;
  }>;
  
  // Security Questions
  securityQuestions: {
    criminalOffense: boolean;
    drugOffense: boolean;
    terrorism: boolean;
    visaFraud: boolean;
    explanations: string;
  };
}

interface FormContextType {
  formData: Partial<DS160FormData>;
  updateFormData: (data: Partial<DS160FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formId: string | null;
  setFormId: (id: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Initial form state
const initialFormData: Partial<DS160FormData> = {
  previousUSTravel: false,
  previousUSTravelDetails: [],
  schools: [],
  securityQuestions: {
    criminalOffense: false,
    drugOffense: false,
    terrorism: false,
    visaFraud: false,
    explanations: '',
  },
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<DS160FormData>>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [formId, setFormId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (newData: Partial<DS160FormData>) => {
    setFormData(prevData => ({
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
