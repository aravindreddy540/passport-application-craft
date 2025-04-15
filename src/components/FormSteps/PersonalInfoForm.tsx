
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
  lastName: z.string().min(1, { message: 'Last name is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().optional(),
  gender: z.string().min(1, { message: 'Gender is required' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  cityOfBirth: z.string().min(1, { message: 'City of birth is required' }),
  countryOfBirth: z.string().min(1, { message: 'Country of birth is required' }),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
});

export const PersonalInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: formData.lastName || '',
      firstName: formData.firstName || '',
      middleName: formData.middleName || '',
      gender: formData.gender || '',
      dateOfBirth: formData.dateOfBirth || '',
      cityOfBirth: formData.cityOfBirth || '',
      countryOfBirth: formData.countryOfBirth || '',
      nationality: formData.nationality || '',
    },
  });
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please provide your personal information as it appears on your passport
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last/Family Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First/Given Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your middle name (if any)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cityOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City of Birth <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city of birth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="countryOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Birth <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your country of birth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
