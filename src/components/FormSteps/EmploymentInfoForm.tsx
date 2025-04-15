
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form validation schema
const formSchema = z.object({
  employmentStatus: z.string().min(1, { message: 'Employment status is required' }),
  employer: z.object({
    name: z.string().min(1, { message: 'Employer name is required' }).optional().or(z.literal('')),
    phone: z.string().min(1, { message: 'Phone number is required' }).optional().or(z.literal('')),
    address: z.object({
      street: z.string().min(1, { message: 'Street address is required' }).optional().or(z.literal('')),
      city: z.string().min(1, { message: 'City is required' }).optional().or(z.literal('')),
      state: z.string().min(1, { message: 'State is required' }).optional().or(z.literal('')),
      zipCode: z.string().min(1, { message: 'ZIP code is required' }).optional().or(z.literal('')),
      country: z.string().min(1, { message: 'Country is required' }).optional().or(z.literal('')),
    }),
  }).optional(),
});

export const EmploymentInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employmentStatus: formData.employmentStatus || '',
      employer: {
        name: formData.employer?.name || '',
        phone: formData.employer?.phone || '',
        address: {
          street: formData.employer?.address?.street || '',
          city: formData.employer?.address?.city || '',
          state: formData.employer?.address?.state || '',
          zipCode: formData.employer?.address?.zipCode || '',
          country: formData.employer?.address?.country || '',
        },
      },
    },
  });
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
  };
  
  // Show employer details only for specific employment statuses
  const showEmployerDetails = ['EMPLOYED', 'SELF_EMPLOYED', 'RETIRED'].includes(form.watch('employmentStatus'));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment Information</CardTitle>
        <CardDescription>
          Provide details about your current employment status and employer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Employment Status <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EMPLOYED">Employed</SelectItem>
                      <SelectItem value="SELF_EMPLOYED">Self-Employed</SelectItem>
                      <SelectItem value="RETIRED">Retired</SelectItem>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="UNEMPLOYED">Unemployed</SelectItem>
                      <SelectItem value="HOMEMAKER">Homemaker</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {showEmployerDetails && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Employer/Business Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="employer.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company/Employer Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Employer or business name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="employer.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 555-5555" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4">
                  <h4 className="text-md font-medium mb-3">Employer Address</h4>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="employer.address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="123 Business Ave, Suite 100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="employer.address.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="employer.address.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="State or province" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="employer.address.zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal/ZIP Code <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Postal or ZIP code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="employer.address.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
