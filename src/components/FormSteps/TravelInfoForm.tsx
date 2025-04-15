
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
import { Textarea } from '@/components/ui/textarea';
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
  travelPurpose: z.string().min(1, { message: 'Purpose of travel is required' }),
  intendedArrivalDate: z.string().min(1, { message: 'Intended arrival date is required' }),
  intendedStayDuration: z.coerce.number().min(1, { message: 'Duration of stay is required' }),
  usContactInfo: z.object({
    name: z.string().min(1, { message: 'Contact name is required' }),
    organization: z.string().optional(),
    relationship: z.string().min(1, { message: 'Relationship is required' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
    email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
    address: z.object({
      street: z.string().min(1, { message: 'Street address is required' }),
      city: z.string().min(1, { message: 'City is required' }),
      state: z.string().min(1, { message: 'State is required' }),
      zipCode: z.string().min(1, { message: 'ZIP code is required' }),
    }),
  }),
});

export const TravelInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelPurpose: formData.travelPurpose || '',
      intendedArrivalDate: formData.intendedArrivalDate || '',
      intendedStayDuration: formData.intendedStayDuration || 0,
      usContactInfo: {
        name: formData.usContactInfo?.name || '',
        organization: formData.usContactInfo?.organization || '',
        relationship: formData.usContactInfo?.relationship || '',
        phone: formData.usContactInfo?.phone || '',
        email: formData.usContactInfo?.email || '',
        address: {
          street: formData.usContactInfo?.address?.street || '',
          city: formData.usContactInfo?.address?.city || '',
          state: formData.usContactInfo?.address?.state || '',
          zipCode: formData.usContactInfo?.address?.zipCode || '',
        },
      },
    },
  });
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Information</CardTitle>
        <CardDescription>
          Provide details about your trip to the United States
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="travelPurpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Trip <span className="text-red-500">*</span></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose of travel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BUSINESS">Business</SelectItem>
                        <SelectItem value="TOURISM">Tourism/Vacation</SelectItem>
                        <SelectItem value="EDUCATION">Education/Study</SelectItem>
                        <SelectItem value="MEDICAL">Medical Treatment</SelectItem>
                        <SelectItem value="TRANSIT">Transit to Another Country</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="intendedArrivalDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intended Date of Arrival <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="intendedStayDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intended Length of Stay (Days) <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Point of Contact in the United States</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="usContactInfo.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="usContactInfo.organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization/Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Organization name (if applicable)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="usContactInfo.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Friend, Relative, Business Partner" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="usContactInfo.phone"
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
                
                <FormField
                  control={form.control}
                  name="usContactInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium mb-3">Contact Address in the U.S.</h4>
                
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="usContactInfo.address.street"
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="usContactInfo.address.city"
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
                      name="usContactInfo.address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="usContactInfo.address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
