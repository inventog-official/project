"use client";

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadForm from '@/components/forms/lead-form';

export default function ConsultationPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Free Solar Consultation
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Fill out the form below and our experts will provide you with a customized solar solution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <Tabs defaultValue="residential" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="residential">Residential</TabsTrigger>
                <TabsTrigger value="housing_society">Housing Society</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
              <div className="mt-8">
                <TabsContent value="residential">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <LeadForm type="residential" />
                  </div>
                </TabsContent>
                <TabsContent value="housing_society">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <LeadForm type="housing_society" />
                  </div>
                </TabsContent>
                <TabsContent value="commercial">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <LeadForm type="commercial" />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}