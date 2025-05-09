"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LearnPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn About Solar Energy</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our educational resources and learn everything you need to know about solar energy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Solar Basics",
                description: "Learn the fundamentals of solar energy and how it works",
                topics: ["Photovoltaic Effect", "Types of Solar Panels", "Installation Process"]
              },
              {
                title: "Cost & Benefits",
                description: "Understand the financial aspects and advantages of solar power",
                topics: ["ROI Calculator", "Tax Incentives", "Energy Savings"]
              },
              {
                title: "Technology",
                description: "Explore the latest advancements in solar technology",
                topics: ["Smart Systems", "Energy Storage", "Efficiency Improvements"]
              },
              {
                title: "Sustainability",
                description: "Discover the environmental impact of solar energy",
                topics: ["Carbon Footprint", "Renewable Benefits", "Future Impact"]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground mb-4">{section.description}</p>
                <ul className="space-y-2 mb-4">
                  {section.topics.map((topic, i) => (
                    <li key={i} className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}