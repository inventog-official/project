"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Contact form submitted');
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Embrace a Sustainable Future?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-md">
              Get in touch with our team of experts to discuss your energy needs and discover how we can help you transition to clean, renewable power.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 max-w-md"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center bg-primary-foreground/10 backdrop-blur-sm rounded-full p-1 pl-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-primary-foreground placeholder:text-primary-foreground/60"
                  required
                />
                <Button type="submit" size="sm" className="rounded-full bg-primary-foreground text-primary">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}