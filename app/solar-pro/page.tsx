"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Users, Wallet, Trophy, BadgeCheck } from 'lucide-react';

export default function SolarProPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become a Nigaran Solar Pro
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our network of solar professionals and earn rewards while helping others transition to clean energy.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Wallet className="h-8 w-8" />,
                title: "Earn Rewards",
                description: "Attractive commissions for every successful referral"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Help Your Network",
                description: "Enable your community to save on energy costs"
              },
              {
                icon: <Trophy className="h-8 w-8" />,
                title: "Growth Opportunities",
                description: "Access to training and professional development"
              },
              {
                icon: <BadgeCheck className="h-8 w-8" />,
                title: "Expert Support",
                description: "Dedicated team to help you succeed"
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

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Join Our Network</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input type="tel" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Input placeholder="City, State" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Profession</label>
                <Input placeholder="Current Profession" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Why do you want to join?</label>
                <Textarea 
                  placeholder="Tell us about your interest in solar energy..."
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">
                Submit Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}