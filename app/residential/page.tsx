"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun, Battery, PiggyBank, Leaf } from 'lucide-react';
import LeadForm from '@/components/forms/lead-form';

export default function ResidentialPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg"
            alt="Residential Solar Installation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Switch to Affordable, Eco-Friendly Solar Energy
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Enjoy up to 90% savings on electricity with our residential solar solutions. We provide expert installation and support across Tamil Nadu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-card rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Get Your Free Quote</h2>
            <LeadForm type="residential" />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Residential Solar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the benefits of clean, renewable energy for your home
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sun className="h-8 w-8" />,
                title: "Energy Independence",
                description: "Generate your own electricity and reduce dependency on the grid"
              },
              {
                icon: <Battery className="h-8 w-8" />,
                title: "24/7 Power Supply",
                description: "Never worry about power cuts with battery backup systems"
              },
              {
                icon: <PiggyBank className="h-8 w-8" />,
                title: "Cost Savings",
                description: "Significant reduction in monthly electricity bills"
              },
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Eco-Friendly",
                description: "Reduce your carbon footprint and help protect the environment"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:w-2/3"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Solar Journey?
              </h2>
              <p className="text-primary-foreground/90 text-lg">
                Our experts are here to help you transition to clean, renewable energy.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button size="lg" variant="secondary" className="group">
                Contact Us Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}