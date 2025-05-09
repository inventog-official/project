"use client";

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

const ServiceCard = ({ title, description, imageUrl, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg bg-black/5 dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-300"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={338}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link 
          href="#" 
          className="inline-flex items-center text-primary font-medium group-hover:underline"
        >
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Energy Efficiency & Saving",
      description: "Optimize your energy consumption and reduce costs with our advanced monitoring and efficiency solutions.",
      imageUrl: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg"
    },
    {
      title: "Eco-Friendly Technology",
      description: "Harness the environmentally-friendly, low-carbon, and sustainable energy with our cutting-edge solar technologies.",
      imageUrl: "https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg"
    },
    {
      title: "Smart Monitoring & Control",
      description: "Access our advanced monitoring systems that allow users to track energy production and consumption in real-time.",
      imageUrl: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Futures That We Provide</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive range of solar solutions is designed to meet your specific energy needs while contributing to a more sustainable future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}