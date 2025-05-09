"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, TrendingUp, Award, Shield } from 'lucide-react';
import LeadForm from '@/components/forms/lead-form';

export default function CommercialPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg"
            alt="Commercial Solar Installation"
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
              Smarter Energy for Smarter Business
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Transform your business with our commercial solar solutions. Reduce operating costs and enhance your sustainability credentials.
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
            <LeadForm type="commercial" />
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
              Benefits for Your Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how commercial solar installation can benefit your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Building2 className="h-8 w-8" />,
                title: "Property Value",
                description: "Increase your property value with modern solar infrastructure"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "ROI",
                description: "Achieve ROI within 3-7 years with significant energy savings"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Green Business",
                description: "Enhance your brand with sustainable business practices"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Tax Benefits",
                description: "Take advantage of government incentives and tax benefits"
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

      {/* Case Studies Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how other businesses have benefited from our solar solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing Plant",
                savings: "₹15L/year",
                description: "Reduced energy costs by 60% with our 100kW system"
              },
              {
                title: "Office Complex",
                savings: "₹8L/year",
                description: "Achieved carbon neutrality with rooftop solar installation"
              },
              {
                title: "Shopping Mall",
                savings: "₹20L/year",
                description: "Complete energy independence with hybrid solar system"
              }
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                <div className="text-2xl text-primary font-bold mb-2">{study.savings}</div>
                <p className="text-muted-foreground">{study.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}