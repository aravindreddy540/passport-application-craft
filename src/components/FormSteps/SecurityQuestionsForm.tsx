
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
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form validation schema
const formSchema = z.object({
  securityQuestions: z.object({
    criminalOffense: z.boolean(),
    drugOffense: z.boolean(),
    terrorism: z.boolean(),
    visaFraud: z.boolean(),
    explanations: z.string().optional(),
  }),
});

export const SecurityQuestionsForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      securityQuestions: {
        criminalOffense: formData.securityQuestions?.criminalOffense || false,
        drugOffense: formData.securityQuestions?.drugOffense || false,
        terrorism: formData.securityQuestions?.terrorism || false,
        visaFraud: formData.securityQuestions?.visaFraud || false,
        explanations: formData.securityQuestions?.explanations || '',
      },
    },
  });
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData(values);
  };
  
  // Check if any security question has 'Yes' answer
  const hasYesAnswers = () => {
    return (
      form.watch('securityQuestions.criminalOffense') ||
      form.watch('securityQuestions.drugOffense') ||
      form.watch('securityQuestions.terrorism') ||
      form.watch('securityQuestions.visaFraud')
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Questions</CardTitle>
        <CardDescription>
          Please answer the following security questions truthfully. False statements may result in visa denial
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-md mb-6 border border-yellow-200">
              <h3 className="font-medium text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700 text-sm">
                Answering "Yes" to any of these questions does not automatically disqualify you 
                from obtaining a visa. However, you may be required to provide additional information 
                during your visa interview. It is important to answer truthfully.
              </p>
            </div>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="securityQuestions.criminalOffense"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Have you ever been arrested or convicted for any offense or crime?</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="securityQuestions.drugOffense"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Have you ever violated any law related to controlled substances?</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="securityQuestions.terrorism"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Do you seek to engage in terrorist activities or have you ever engaged in terrorist activities?</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="securityQuestions.visaFraud"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Have you ever committed fraud or misrepresented yourself to obtain a visa?</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            {hasYesAnswers() && (
              <FormField
                control={form.control}
                name="securityQuestions.explanations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provide detailed explanations for all "Yes" answers <span className="text-red-500">*</span></FormLabel>
                    <FormDescription>
                      Include dates, circumstances, and outcomes for each relevant incident
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide detailed explanations here..."
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
