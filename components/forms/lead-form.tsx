"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { createLead } from '@/lib/api';

const phoneRegex = /^[6-9]\d{9}$/;

const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsappNumber: z.string().regex(phoneRegex, 'Please enter a valid Indian mobile number'),
  electricityBill: z.number().min(1, 'Please enter your electricity bill amount'),
  city: z.string().min(2, 'Please enter your city'),
  companyName: z.string().optional(),
  type: z.enum(['residential', 'housing_society', 'commercial'])
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  type: 'residential' | 'housing_society' | 'commercial';
}

export default function LeadForm({ type }: LeadFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: '',
      whatsappNumber: '',
      electricityBill: 0,
      city: '',
      companyName: '',
      type
    }
  });

  const mutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      setSubmitSuccess(true);
      form.reset();
    },
  });

  const onSubmit = (data: LeadFormData) => {
    mutation.mutate(data);
  };

  if (submitSuccess) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          We've received your information and will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {mutation.isError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            An error occurred. Please try again.
          </div>
        )}

        {type === 'commercial' && (
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter company name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your WhatsApp number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="electricityBill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {type === 'commercial' ? 'Monthly' : 'Bi-Monthly'} Electricity Bill (₹)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Enter your electricity bill amount"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your city" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Submitting...' : 'Get Free Quote'}
        </Button>
      </form>
    </Form>
  );
}