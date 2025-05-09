"use client";

import { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({
      nullTargetWarn: false,
    });
  }

  return (
    <AnimatePresence mode="sync">
      {children}
    </AnimatePresence>
  );
}