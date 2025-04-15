
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
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  address: z.object({
    street: z.string().min(1, { message: 'Street address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State/Province is required' }),
    zipCode: z.string().min(1, { message: 'Postal/ZIP code is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
});

export const ContactInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: formData.email || '',
      phone: formData.phone || '',
      address: {
        street: formData.address?.street || '',
        city: formData.address?.city || '',
        state: formData.address?.state || '',
        zipCode: formData.address?.zipCode || '',
        country: formData.address?.country || '',
      },
    },
  });
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Need to update with a properly typed object to match DS160FormData
    updateFormData({
      email: values.email,
      phone: values.phone,
      address: {
        street: values.address.street,
        city: values.address.city,
        state: values.address.state,
        zipCode: values.address.zipCode,
        country: values.address.country,
      }
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Provide your current contact information and residential address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
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
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Residential Address</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, Apt 4B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal/ZIP Code <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
