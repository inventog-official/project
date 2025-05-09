"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { LeafyGreen, TrendingUp, Award } from 'lucide-react';

interface BenefitCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
}

const BenefitCard = ({ icon, title, description, index }: BenefitCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl p-6 shadow-sm"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: <LeafyGreen className="h-6 w-6" />,
      title: "Renewable & Sustainable",
      description: "Solar energy is a clean, renewable resource that reduces carbon emissions and helps preserve our planet for future generations."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Increased Property Value",
      description: "Solar installations can boost your property's value by 3-4%, making it a smart investment for long-term financial benefits."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Government Incentives",
      description: "Take advantage of federal tax credits, state rebates, and local incentives that significantly reduce your installation costs."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}