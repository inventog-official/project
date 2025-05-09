"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Users, Briefcase, Building2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: string;
  metric: string;
  suffix?: string;
  delay?: number;
  icon: React.ReactNode;
  className?: string;
}

const StatCard = ({
  value,
  metric,
  suffix,
  delay = 0,
  icon,
  className,
}: StatProps) => {
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        numberRef.current,
        { innerText: "0" + (suffix || "") },
        {
          innerText: value,
          duration: 2,
          delay: delay,
          ease: "power2.out",
          snap: { innerText: 1 },
          modifiers: {
            innerText: (text) => {
              const num = parseInt(text.replace(/\D/g, "")) || 0;
              return num.toLocaleString() + (suffix || "");
            },
          },
          scrollTrigger: {
            trigger: numberRef.current,
            start: "top bottom-=100px",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [value, suffix, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      className={cn("flex flex-col items-center text-center", className)}
    >
      <div className="mb-3 text-primary">{icon}</div>
      <div
        ref={numberRef}
        className="text-4xl md:text-5xl font-extrabold text-foreground mb-2"
      >
        {value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">
        {metric}
      </div>
    </motion.div>
  );
};

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StatCard
            value="1000+"
            metric="Satisfied Customers"
            icon={<Users size={40} />}
            delay={0}
          />
          <StatCard
            value="25+"
            metric="Experienced Professionals"
            icon={<Briefcase size={40} />}
            delay={0.2}
          />
          <StatCard
            value="500+"
            metric="Clients across Industries"
            icon={<Building2 size={40} />}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
