import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import FutureSection from "@/components/sections/future-section";
import { Feature108 } from "@/components/ui/feature108";
import ExpertiseSection from "@/components/sections/expertise-section";
import BenefitsSection from "@/components/sections/benefits-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import BlogSection from "@/components/sections/blog-section";
import ContactSection from "@/components/sections/contact-section";
import FAQSection from "@/components/sections/faq-section";
import AnimationProvider from "@/components/animation-provider";

export default function Home() {
  return (
    <AnimationProvider>
      <HeroSection />
      <StatsSection />
      <FutureSection />
      <Feature108 />
      <ExpertiseSection />
      {/* <BenefitsSection /> */}
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </AnimationProvider>
  );
}
