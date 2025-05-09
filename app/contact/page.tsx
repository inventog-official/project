"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactPage() {
  const [lookingFor, setLookingFor] = useState("");

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div {...fadeInUp()} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to make the switch to clean, renewable solar energy? Contact
              us today! Whether you’re interested in residential solar panels or
              commercial solar solutions, our team at Nigaran Solar is here to
              help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeInUp(0.2)}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-semibold text-lg mb-2">Phone:</h2>
                  <p>+91 96007 15993</p>
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-2">Email:</h2>
                  <p>info@nigaransolar.com</p>
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-2">
                    Registered Office:
                  </h2>
                  <p>No.52, Theo Saro Villa</p>
                  <p>Vasantham Nagar, P&T Nagar Extn</p>
                  <p>Madurai-625017</p>
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-2">Work Office:</h2>
                  <p>No.G1a/62, Periya Subbannan Street</p>
                  <p>KK Pudur, Saibaba Colony</p>
                  <p>Coimbatore-641038</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              {...fadeInUp(0.3)}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required placeholder="Your full name" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" required placeholder="Your phone number" />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required placeholder="Enter your city" />
                </div>

                <div>
                  <Label htmlFor="bill">Monthly Electricity Bill</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bill range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lt1500">Less than ₹1500</SelectItem>
                      <SelectItem value="1500-2500">₹1500 - ₹2500</SelectItem>
                      <SelectItem value="2500-4000">₹2500 - ₹4000</SelectItem>
                      <SelectItem value="4000-8000">₹4000 - ₹8000</SelectItem>
                      <SelectItem value="gt8000">More than ₹8000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="lookingFor">Looking For</Label>
                  <Select
                    onValueChange={(value) => setLookingFor(value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">
                        Residential Solar
                      </SelectItem>
                      <SelectItem value="commercial">
                        Commercial Solar
                      </SelectItem>
                      <SelectItem value="industry">Industry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <AnimatePresence>
                  {lookingFor === "commercial" && (
                    <motion.div
                      key="commercial"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="businessSize">Business Size</Label>
                      <Input
                        id="businessSize"
                        placeholder="e.g. Small, Medium, Large"
                      />
                    </motion.div>
                  )}

                  {lookingFor === "industry" && (
                    <motion.div
                      key="industry"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="industryType">Industry Type</Label>
                      <Input
                        id="industryType"
                        placeholder="e.g. Textile, Manufacturing, IT"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button type="submit" className="w-full mt-4">
                  Submit
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
