"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Leaf, BarChart3, Globe, Award } from 'lucide-react';

interface ExpertiseCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
}

const ExpertiseCard = ({ icon, title, description, index }: ExpertiseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center md:items-start text-center md:text-left"
    >
      <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default function ExpertiseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const expertiseItems = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Environmentally Friendly",
      description: "Our solar solutions drastically reduce carbon footprint while providing sustainable energy for generations."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Cost Maintenance",
      description: "Significant reduction in long-term energy costs, with minimal maintenance requirements for our systems."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Impact",
      description: "Join thousands of businesses worldwide contributing to a cleaner, more sustainable planet."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Award-Winning Service",
      description: "Recognized for excellence in customer service and innovation in renewable energy solutions."
    }
  ];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experts In The World<br />Of Solar Energy.
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {expertiseItems.map((item, index) => (
            <ExpertiseCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}