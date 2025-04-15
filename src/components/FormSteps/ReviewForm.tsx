
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const ReviewForm = () => {
  const { formData } = useFormContext();
  const [confirmAccuracy, setConfirmAccuracy] = React.useState(false);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US').format(date);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Your Application</CardTitle>
        <CardDescription>
          Please review all your information carefully before submitting your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-6">
            <h3 className="text-blue-800 font-medium mb-2">Important</h3>
            <p className="text-blue-700 text-sm">
              Please review all information carefully. Once submitted, you will not be able to make changes online.
              If you need to make changes after submission, you will need to contact the U.S. embassy or consulate
              where you plan to apply.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="personal-info">
              <AccordionTrigger className="font-medium">Personal Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Full Name</span>
                    <span className="block">{formData.lastName}, {formData.firstName} {formData.middleName || ''}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Gender</span>
                    <span className="block">{formData.gender || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Date of Birth</span>
                    <span className="block">{formatDate(formData.dateOfBirth || '')}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Place of Birth</span>
                    <span className="block">{formData.cityOfBirth}, {formData.countryOfBirth}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Nationality</span>
                    <span className="block">{formData.nationality || 'Not provided'}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="contact-info">
              <AccordionTrigger className="font-medium">Contact Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Email</span>
                    <span className="block">{formData.email || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Phone</span>
                    <span className="block">{formData.phone || 'Not provided'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-sm font-medium text-gray-500">Address</span>
                    <span className="block">
                      {formData.address?.street}, {formData.address?.city}, {formData.address?.state} {formData.address?.zipCode}, {formData.address?.country}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="passport-info">
              <AccordionTrigger className="font-medium">Passport Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Passport Number</span>
                    <span className="block">{formData.passportNumber || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Issuing Country</span>
                    <span className="block">{formData.passportIssuedCountry || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Date of Issue</span>
                    <span className="block">{formatDate(formData.passportIssuedDate || '')}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Date of Expiry</span>
                    <span className="block">{formatDate(formData.passportExpiryDate || '')}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="travel-info">
              <AccordionTrigger className="font-medium">Travel Information</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-2">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Purpose of Trip</span>
                    <span className="block">{formData.travelPurpose || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Intended Arrival Date</span>
                    <span className="block">{formatDate(formData.intendedArrivalDate || '')}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Intended Stay Duration</span>
                    <span className="block">{formData.intendedStayDuration} days</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-sm font-medium text-gray-500 mb-1">U.S. Contact Information</span>
                    <div className="pl-4">
                      <p>{formData.usContactInfo?.name} ({formData.usContactInfo?.relationship})</p>
                      <p>{formData.usContactInfo?.organization || 'No organization provided'}</p>
                      <p>{formData.usContactInfo?.phone}</p>
                      <p>{formData.usContactInfo?.email}</p>
                      <p>
                        {formData.usContactInfo?.address?.street}, {formData.usContactInfo?.address?.city}, {formData.usContactInfo?.address?.state} {formData.usContactInfo?.address?.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="previous-travel">
              <AccordionTrigger className="font-medium">Previous Travel to the U.S.</AccordionTrigger>
              <AccordionContent>
                {formData.previousUSTravel ? (
                  <div className="mt-2">
                    <p className="mb-3">You have indicated that you have previously traveled to the United States.</p>
                    {formData.previousUSTravelDetails && formData.previousUSTravelDetails.length > 0 ? (
                      formData.previousUSTravelDetails.map((travel, index) => (
                        <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                          <span className="block font-medium mb-1">Visit #{index + 1}</span>
                          <div className="pl-4">
                            <p>Arrival: {formatDate(travel.arrivalDate || '')}</p>
                            <p>Departure: {formatDate(travel.departureDate || '')}</p>
                            <p>Length of stay: {travel.lengthOfStay} days</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-yellow-600">You marked "Yes" to previous travel but did not provide details.</p>
                    )}
                  </div>
                ) : (
                  <p className="mt-2">You have indicated that you have not previously traveled to the United States.</p>
                )}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="employment">
              <AccordionTrigger className="font-medium">Employment Information</AccordionTrigger>
              <AccordionContent>
                <div className="mt-2">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Employment Status</span>
                    <span className="block">{formData.employmentStatus || 'Not provided'}</span>
                  </div>
                  
                  {['EMPLOYED', 'SELF_EMPLOYED', 'RETIRED'].includes(formData.employmentStatus || '') && formData.employer && (
                    <div className="mt-3">
                      <span className="block text-sm font-medium text-gray-500 mb-1">Employer Details</span>
                      <div className="pl-4">
                        <p>{formData.employer.name}</p>
                        <p>{formData.employer.phone}</p>
                        <p>
                          {formData.employer.address?.street}, {formData.employer.address?.city}, {formData.employer.address?.state} {formData.employer.address?.zipCode}, {formData.employer.address?.country}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="education">
              <AccordionTrigger className="font-medium">Education Information</AccordionTrigger>
              <AccordionContent>
                <div className="mt-2">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Highest Level of Education</span>
                    <span className="block">{formData.educationLevel || 'Not provided'}</span>
                  </div>
                  
                  {formData.schools && formData.schools.length > 0 && (
                    <div className="mt-3">
                      <span className="block text-sm font-medium text-gray-500 mb-1">Schools/Universities</span>
                      {formData.schools.map((school, index) => (
                        <div key={index} className="mt-3 pb-3 border-b last:border-b-0">
                          <span className="block font-medium">School #{index + 1}</span>
                          <div className="pl-4 mt-1">
                            <p>{school.name}</p>
                            <p>Course of Study: {school.courseOfStudy}</p>
                            <p>From {formatDate(school.fromDate || '')} to {formatDate(school.toDate || '')}</p>
                            <p>
                              {school.address?.street}, {school.address?.city}, {school.address?.state} {school.address?.zipCode}, {school.address?.country}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="security">
              <AccordionTrigger className="font-medium">Security Questions</AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 space-y-3">
                  <div>
                    <span className="block text-sm">
                      Criminal Offense: {formData.securityQuestions?.criminalOffense ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm">
                      Drug Offense: {formData.securityQuestions?.drugOffense ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm">
                      Terrorism: {formData.securityQuestions?.terrorism ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm">
                      Visa Fraud: {formData.securityQuestions?.visaFraud ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  {(formData.securityQuestions?.criminalOffense || 
                    formData.securityQuestions?.drugOffense || 
                    formData.securityQuestions?.terrorism || 
                    formData.securityQuestions?.visaFraud) && (
                    <div className="mt-3">
                      <span className="block text-sm font-medium text-gray-500">Explanations</span>
                      <div className="border rounded p-3 mt-1 bg-gray-50">
                        {formData.securityQuestions?.explanations || 'No explanation provided'}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-8 space-y-6">
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="confirm" 
                  checked={confirmAccuracy}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setConfirmAccuracy(checked);
                    }
                  }}
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="confirm"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I certify that all of the information provided is true and correct
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I understand that any false or misleading statements may result in permanent visa ineligibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
