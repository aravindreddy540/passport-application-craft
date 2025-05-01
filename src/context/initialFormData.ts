
import { DS160FormData } from '../types/formTypes';

// Initial form state
export const initialFormData: Partial<DS160FormData> = {
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
