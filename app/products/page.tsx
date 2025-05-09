"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ProductsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Solar Products</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover our range of high-quality solar solutions designed for maximum efficiency and sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Solar Panels",
                description: "High-efficiency solar panels with advanced photovoltaic technology",
                image: "https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg"
              },
              {
                title: "Solar Batteries",
                description: "Energy storage solutions for continuous power supply",
                image: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg"
              },
              {
                title: "Monitoring Systems",
                description: "Smart monitoring solutions for optimal performance tracking",
                image: "https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <Button className="w-full">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}