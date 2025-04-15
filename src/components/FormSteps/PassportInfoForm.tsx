
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form validation schema
const formSchema = z.object({
  passportNumber: z.string().min(1, { message: 'Passport number is required' }),
  passportIssuedCountry: z.string().min(1, { message: 'Issuing country is required' }),
  passportIssuedDate: z.string().min(1, { message: 'Issue date is required' }),
  passportExpiryDate: z.string().min(1, { message: 'Expiry date is required' }),
}).refine((data) => {
  const issuedDate = new Date(data.passportIssuedDate);
  const expiryDate = new Date(data.passportExpiryDate);
  return expiryDate > issuedDate;
}, {
  message: "Expiry date must be after issue date",
  path: ["passportExpiryDate"],
});

export const PassportInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passportNumber: formData.passportNumber || '',
      passportIssuedCountry: formData.passportIssuedCountry || '',
      passportIssuedDate: formData.passportIssuedDate || '',
      passportExpiryDate: formData.passportExpiryDate || '',
    },
  });
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passport Information</CardTitle>
        <CardDescription>
          Enter your passport details exactly as they appear in your passport
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="AB1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passportIssuedCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Country <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passportIssuedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Issue <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="passportExpiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Expiry <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Important Passport Requirements</h3>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Your passport must be valid for at least six months beyond your period of stay in the United States</li>
                <li>Your passport must have at least one blank page for the visa</li>
                <li>Ensure all information matches exactly what appears in your passport</li>
              </ul>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
