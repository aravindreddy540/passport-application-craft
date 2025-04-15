
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
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form validation schema
const schoolSchema = z.object({
  name: z.string().min(1, { message: 'School name is required' }),
  address: z.object({
    street: z.string().min(1, { message: 'Street address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State/province is required' }),
    zipCode: z.string().min(1, { message: 'ZIP code is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
  }),
  courseOfStudy: z.string().min(1, { message: 'Course of study is required' }),
  fromDate: z.string().min(1, { message: 'From date is required' }),
  toDate: z.string().min(1, { message: 'To date is required' }),
});

const formSchema = z.object({
  educationLevel: z.string().min(1, { message: 'Education level is required' }),
  schools: z.array(schoolSchema).min(1, { message: 'At least one school is required' }),
});

export const EducationInfoForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values or default values ensuring all required fields are present
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educationLevel: formData.educationLevel || '',
      schools: formData.schools && formData.schools.length > 0 
        ? formData.schools.map(school => ({
            name: school.name || '',
            address: {
              street: school.address?.street || '',
              city: school.address?.city || '',
              state: school.address?.state || '',
              zipCode: school.address?.zipCode || '',
              country: school.address?.country || '',
            },
            courseOfStudy: school.courseOfStudy || '',
            fromDate: school.fromDate || '',
            toDate: school.toDate || '',
          }))
        : [{
            name: '',
            address: {
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: '',
            },
            courseOfStudy: '',
            fromDate: '',
            toDate: '',
          }],
    },
  });
  
  // Add a new empty school
  const addSchool = () => {
    const currentSchools = form.getValues('schools') || [];
    form.setValue('schools', [
      ...currentSchools,
      {
        name: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        courseOfStudy: '',
        fromDate: '',
        toDate: '',
      }
    ]);
    
    // Update context data after adding
    updateFormData({
      educationLevel: form.getValues('educationLevel'),
      schools: form.getValues('schools'),
    });
  };
  
  // Remove a school entry
  const removeSchool = (index: number) => {
    const currentSchools = form.getValues('schools') || [];
    // Don't remove if it's the only school
    if (currentSchools.length <= 1) return;
    
    const newSchools = [...currentSchools];
    newSchools.splice(index, 1);
    
    form.setValue('schools', newSchools);
    
    // Update context data after removing
    updateFormData({
      educationLevel: form.getValues('educationLevel'),
      schools: newSchools,
    });
  };
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education Information</CardTitle>
        <CardDescription>
          Provide details about your educational background
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Level of Education <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LESS_THAN_HIGH_SCHOOL">Less than High School</SelectItem>
                      <SelectItem value="HIGH_SCHOOL">High School/Secondary School</SelectItem>
                      <SelectItem value="VOCATIONAL_SCHOOL">Vocational School</SelectItem>
                      <SelectItem value="SOME_UNIVERSITY">Some University Courses</SelectItem>
                      <SelectItem value="UNIVERSITY_DEGREE">University Degree (Bachelor's)</SelectItem>
                      <SelectItem value="GRADUATE_DEGREE">Graduate Degree (Master's, PhD)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Schools/Universities Attended</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSchool}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add School
                </Button>
              </div>
              
              {form.watch('schools')?.map((school, index) => (
                <div key={index} className="p-4 border rounded-md mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">School #{index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSchool(index)}
                      className="text-red-500 h-8 px-2"
                      disabled={form.watch('schools').length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name={`schools.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Name of school or university" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`schools.${index}.courseOfStudy`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course of Study <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Major or field of study" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`schools.${index}.fromDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Date <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`schools.${index}.toDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>To Date <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="text-md font-medium mb-3">School Address</h5>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name={`schools.${index}.address.street`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name={`schools.${index}.address.city`}
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
                          name={`schools.${index}.address.state`}
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
                          name={`schools.${index}.address.zipCode`}
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
                          name={`schools.${index}.address.country`}
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
              ))}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
