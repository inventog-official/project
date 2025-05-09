"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const faqs = [
  {
    question: "What is the process of installing solar panels in Tamil Nadu?",
    answer:
      "The process typically includes a site survey & Proposal, Design & Development, Procurement and Installation, Commissioning & Connect to Grid. We assist you at each step, ensuring everything goes smoothly.",
  },
  {
    question: "How do I claim the solar government subsidy?",
    answer:
      "You need to meet certain eligibility criteria. We help you with the application process to ensure you get the maximum subsidy available for your solar installation.",
  },
  {
    question: "Is it possible to install solar panels in an apartment?",
    answer:
      "Yes, we provide solar solutions for apartments in Tamil Nadu. We customize the installation to meet your building's requirements.",
  },
  {
    question: "How much money could I potentially save by using solar power?",
    answer:
      "Depending on your current energy consumption, residential solar panels can save up to 90% on your electricity bill.",
  },
  {
    question: "What are the advantages of installing solar panels at home?",
    answer:
      "Installing solar panels reduces electricity bills, increases energy independence, and promotes environmental sustainability. Solar energy is renewable, and government subsidies make the initial investment more affordable.",
  },
  {
    question: "How much space is needed for solar panel installation?",
    answer:
      "On average, 100 square feet of roof space is needed for every 1kW of solar power. Homes with higher energy consumption may require more space.",
  },
  {
    question: "How long do solar panels last?",
    answer:
      "Solar panels typically last 25-30 years. While efficiency may decrease slightly over time, most manufacturers offer warranties of 20-25 years.",
  },
  {
    question:
      "Are solar panel installations in Tamil Nadu eligible for government subsidies?",
    answer:
      "Yes, both the Indian and Tamil Nadu state governments offer solar panel subsidies, significantly reducing installation costs. We'll assist with eligibility and paperwork.",
  },
  {
    question:
      "How do I know if my home is suitable for solar panel installation?",
    answer:
      "We look into factors like roof orientation, shading, and the space available in your roof.",
  },
  {
    question: "Can solar panels be installed on a flat roof?",
    answer:
      "Yes, solar panels can be installed on flat roofs at an optimal angle for maximum sunlight exposure.",
  },
  {
    question: "What is the payback period for a solar power plant?",
    answer:
      "Typically, the payback period is between 3 and 7 years, after which you can enjoy free electricity for the remaining lifespan of the system.",
  },
  {
    question:
      "How do I get started with solar panel installation in Tamil Nadu?",
    answer:
      "Contact us for a free consultation. We'll assess your energy needs, provide a custom solution, and guide you through the installation process and available subsidies.",
  },
];

export default function FAQSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about solar energy solutions
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card rounded-lg border px-6"
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
