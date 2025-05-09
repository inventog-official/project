"use client";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/lib/api";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  if (isLoading) {
    return <div className="py-16 text-center">Loading testimonials...</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-500">
        Error loading testimonials
      </div>
    );
  }

  console.log(data);

  const testimonials =
    //@ts-ignore
    data?.testimonials.map((t: any) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: "Nigaran Solar",
      content: t.content,
      rating: 5,
      avatar: t.imageUrl,

      youtubeUrl: t.youtubeUrl,
    })) || [];

  return (
    <AnimatedTestimonials
      title="What Our Customers Say"
      subtitle="Hear from our satisfied customers about their experience with Nigaran Solar's solutions and service."
      badgeText="Customer Reviews"
      testimonials={testimonials}
      trustedCompanies={["TATA", "Adani", "Reliance", "L&T", "Mahindra"]}
      trustedCompaniesTitle="Trusted by leading companies across India"
    />
  );
}
