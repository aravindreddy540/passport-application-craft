
import React, { useEffect } from 'react';
import { FormProvider, useFormContext } from '@/context/FormContext';
import { PersonalInfoForm } from './FormSteps/PersonalInfoForm';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import api from '@/services/api';

// Placeholder components that we'll implement later
const ContactInfoForm = () => <div>Contact Information Form (To be implemented)</div>;
const PassportInfoForm = () => <div>Passport Information Form (To be implemented)</div>;
const TravelInfoForm = () => <div>Travel Information Form (To be implemented)</div>;
const PreviousTravelForm = () => <div>Previous Travel Form (To be implemented)</div>;
const EmploymentInfoForm = () => <div>Employment Information Form (To be implemented)</div>;
const EducationInfoForm = () => <div>Education Information Form (To be implemented)</div>;
const SecurityQuestionsForm = () => <div>Security Questions Form (To be implemented)</div>;
const ReviewForm = () => <div>Review and Submit Form (To be implemented)</div>;

const FormSteps = () => {
  const { currentStep, setCurrentStep, formData, updateFormData, formId, setFormId, isLoading, setIsLoading } = useFormContext();
  
  // Form steps
  const steps = [
    'Personal Info',
    'Contact Info',
    'Passport Info',
    'Travel Info',
    'Previous Travel',
    'Employment',
    'Education',
    'Security',
    'Review & Submit'
  ];
  
  // Render progress indicator
  const renderProgressIndicator = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2 overflow-x-auto">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`relative flex flex-col items-center mr-4 ${
              index <= currentStep ? 'text-visa-600' : 'text-gray-400'
            }`}
          >
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index < currentStep 
                  ? 'bg-visa-600 text-white' 
                  : index === currentStep 
                  ? 'border-2 border-visa-600 text-visa-600' 
                  : 'border-2 border-gray-300 text-gray-400'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-xs mt-1 hidden md:block">{step}</span>
          </button>
        ))}
      </div>
      <div className="relative w-full h-1 bg-gray-200 mt-4">
        <div 
          className="absolute h-1 bg-visa-600 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
  
  // Autosave form data when it changes
  useEffect(() => {
    const saveFormData = async () => {
      if (Object.keys(formData).length > 0) {
        try {
          setIsLoading(true);
          
          if (formId) {
            // Update existing form
            await api.updateApplication(formId, { ...formData, formStatus: 'draft' });
          } else {
            // Create new form
            const result = await api.createApplication({ ...formData, formStatus: 'draft' });
            setFormId(result._id);
          }
          
          toast.success('Form progress saved');
        } catch (error) {
          console.error('Error saving form data:', error);
          toast.error('Failed to save form progress');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    // Debounce autosave to prevent too many requests
    const timeoutId = setTimeout(saveFormData, 2000);
    return () => clearTimeout(timeoutId);
  }, [formData, formId, setFormId, setIsLoading]);
  
  // Render the appropriate form based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <ContactInfoForm />;
      case 2:
        return <PassportInfoForm />;
      case 3:
        return <TravelInfoForm />;
      case 4:
        return <PreviousTravelForm />;
      case 5:
        return <EmploymentInfoForm />;
      case 6:
        return <EducationInfoForm />;
      case 7:
        return <SecurityQuestionsForm />;
      case 8:
        return <ReviewForm />;
      default:
        return <PersonalInfoForm />;
    }
  };
  
  const handleNext = () => {
    if (currentStep < 8) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="w-full">
      {renderProgressIndicator()}
      {renderStep()}
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isLoading}
          className="px-8"
        >
          Previous
        </Button>
        
        {currentStep < 8 ? (
          <Button 
            onClick={handleNext}
            disabled={isLoading}
            className="bg-visa-600 hover:bg-visa-700 text-white px-8"
          >
            {isLoading ? 'Saving...' : 'Next'}
          </Button>
        ) : (
          <Button 
            onClick={async () => {
              if (formId) {
                try {
                  setIsLoading(true);
                  await api.updateApplication(formId, { ...formData, formStatus: 'submitted' });
                  toast.success('DS-160 form submitted successfully!');
                  // Reset or redirect user
                } catch (error) {
                  console.error('Error submitting form:', error);
                  toast.error('Error submitting form. Please try again.');
                } finally {
                  setIsLoading(false);
                }
              }
            }}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-8"
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        )}
      </div>
    </div>
  );
};

// Wrapper component for the entire DS-160 form
export const DS160Form = () => {
  return (
    <FormProvider>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-visa-800">DS-160 Online Nonimmigrant Visa Application</h1>
          <p className="text-gray-600 mt-2">Complete the form accurately to apply for a nonimmigrant visa to the United States</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <FormSteps />
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>By submitting this form, you certify that all information provided is true and correct to the best of your knowledge.</p>
        </div>
      </div>
    </FormProvider>
  );
};
