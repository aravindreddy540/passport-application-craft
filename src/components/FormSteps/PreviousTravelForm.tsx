
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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form validation schema
const travelEntrySchema = z.object({
  arrivalDate: z.string().min(1, { message: 'Arrival date is required' }),
  departureDate: z.string().min(1, { message: 'Departure date is required' }),
  lengthOfStay: z.coerce.number().min(1, { message: 'Length of stay is required' }),
});

const formSchema = z.object({
  previousUSTravel: z.boolean(),
  previousUSTravelDetails: z.array(travelEntrySchema).optional().default([]),
});

export const PreviousTravelForm = () => {
  const { formData, updateFormData } = useFormContext();
  
  // Initialize form with current values ensuring required fields are present
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      previousUSTravel: formData.previousUSTravel || false,
      previousUSTravelDetails: formData.previousUSTravelDetails && formData.previousUSTravelDetails.length > 0
        ? formData.previousUSTravelDetails.map(entry => ({
            arrivalDate: entry.arrivalDate || '',
            departureDate: entry.departureDate || '',
            lengthOfStay: entry.lengthOfStay || 0,
          }))
        : [],
    },
  });
  
  // Add a new empty travel entry
  const addTravelEntry = () => {
    const currentEntries = form.getValues('previousUSTravelDetails') || [];
    const newEntries = [
      ...currentEntries,
      { arrivalDate: '', departureDate: '', lengthOfStay: 0 }
    ];
    
    form.setValue('previousUSTravelDetails', newEntries);
    
    // Update context data after adding
    updateFormData({
      previousUSTravel: form.getValues('previousUSTravel'),
      previousUSTravelDetails: newEntries,
    });
  };
  
  // Remove a travel entry
  const removeTravelEntry = (index: number) => {
    const currentEntries = form.getValues('previousUSTravelDetails') || [];
    const newEntries = [...currentEntries];
    newEntries.splice(index, 1);
    
    form.setValue('previousUSTravelDetails', newEntries);
    
    // Update context data after removing
    updateFormData({
      previousUSTravel: form.getValues('previousUSTravel'),
      previousUSTravelDetails: newEntries,
    });
  };
  
  // Save form data when it changes
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateFormData({
      previousUSTravel: values.previousUSTravel,
      previousUSTravelDetails: values.previousUSTravelDetails ? 
        values.previousUSTravelDetails.map(entry => ({
          arrivalDate: entry.arrivalDate,
          departureDate: entry.departureDate,
          lengthOfStay: entry.lengthOfStay
        })) : []
    });
  };
  
  // Handle toggling previous travel
  const handlePreviousTravelChange = (value: boolean) => {
    form.setValue('previousUSTravel', value);
    
    // If toggled to false, clear previous travel details
    if (!value) {
      form.setValue('previousUSTravelDetails', []);
    } else if (form.getValues('previousUSTravelDetails').length === 0) {
      // If toggled to true and no entries, add one empty entry
      form.setValue('previousUSTravelDetails', [
        { arrivalDate: '', departureDate: '', lengthOfStay: 0 }
      ]);
    }
    
    // Update context data after toggle
    updateFormData({
      previousUSTravel: value,
      previousUSTravelDetails: form.getValues('previousUSTravelDetails'),
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Travel to the United States</CardTitle>
        <CardDescription>
          Provide details about your previous visits to the United States, if any
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="previousUSTravel"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Have you traveled to the United States before?</FormLabel>
                    <FormDescription>
                      Select 'Yes' if you have previously visited the United States
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => handlePreviousTravelChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch('previousUSTravel') && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Previous Visit Details</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTravelEntry}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Visit
                  </Button>
                </div>
                
                {form.watch('previousUSTravelDetails')?.map((entry, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Visit #{index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTravelEntry(index)}
                        className="text-red-500 h-8 px-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`previousUSTravelDetails.${index}.arrivalDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Arrival <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`previousUSTravelDetails.${index}.departureDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Departure <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`previousUSTravelDetails.${index}.lengthOfStay`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length of Stay (Days) <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
