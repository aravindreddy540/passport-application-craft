
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
    organization?: string;
    relationship: string;
    phone: string;
    email?: string;
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

// A modified version of the main type that makes all properties optional for partial updates
export interface PartialDS160FormData extends Partial<Omit<DS160FormData, 'previousUSTravelDetails' | 'schools' | 'usContactInfo'>> {
  // Previous US Travel with optional nested properties
  previousUSTravelDetails?: Array<{
    arrivalDate?: string;
    departureDate?: string;
    lengthOfStay?: number;
  }>;
  
  // Education with optional nested properties
  schools?: Array<{
    name?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
    courseOfStudy?: string;
    fromDate?: string;
    toDate?: string;
  }>;
  
  // Travel info with optional nested properties
  usContactInfo?: {
    name?: string;
    organization?: string;
    relationship?: string;
    phone?: string;
    email?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
  };
}
