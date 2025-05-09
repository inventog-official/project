"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function FutureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Rotate animation for the circular frame
      gsap.to(".circular-frame", {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });
      
      // Animate image on scroll
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Powering Your Future With Clean, Renewable Energy
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're committed to revolutionizing how energy is produced and consumed. Our solar solutions are designed to maximize efficiency while minimizing environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">Environmentally friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">25-year warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">Maintenance included</span>
              </div>
            </div>
            <Button className="group">
              Learn More 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          
          <div className="relative flex justify-center" ref={imageRef}>
            {/* Circular frame with rotation animation */}
            <div className="circular-frame absolute w-[120%] h-[120%] border-[20px] border-dashed border-muted/30 rounded-full"></div>
            
            {/* Circular image container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-background shadow-xl"
            >
              <Image
                src="https://images.pexels.com/photos/356049/pexels-photo-356049.jpeg"
                alt="Solar energy installation in a desert landscape"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Stats floating elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-[5%] -right-[5%] bg-background shadow-lg rounded-lg p-3 text-sm"
            >
              <div className="font-semibold">SOLAR SPEED</div>
              <div className="text-xs text-muted-foreground">12.5 KW/H</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-[5%] -left-[5%] bg-background shadow-lg rounded-lg p-3 text-sm"
            >
              <div className="font-semibold">ENERGY OUTPUT</div>
              <div className="text-xs text-muted-foreground">36.8 KW/DAY</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}