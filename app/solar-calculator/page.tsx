"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator, Sun, IndianRupee, Battery, Zap } from 'lucide-react';

export default function SolarCalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState<number>(0);
  const [roofArea, setRoofArea] = useState<number>(0);
  const [location, setLocation] = useState<string>('tamil-nadu');
  const [showResults, setShowResults] = useState(false);

  const calculateSolarSystem = () => {
    // Average electricity rate in Tamil Nadu (Rs/kWh)
    const electricityRate = 8;
    
    // Monthly consumption in kWh
    const monthlyConsumption = monthlyBill / electricityRate;
    
    // Daily consumption
    const dailyConsumption = monthlyConsumption / 30;
    
    // Solar system size needed (kW)
    // Assuming 4 peak sun hours per day and 80% system efficiency
    const systemSize = (dailyConsumption / (4 * 0.8));
    
    // Area needed (assuming 100 sq ft per kW)
    const areaNeeded = systemSize * 100;
    
    // System cost (assuming Rs. 45,000 per kW)
    const systemCost = systemSize * 45000;
    
    // Annual savings
    const annualSavings = monthlyBill * 12;
    
    // Payback period
    const paybackPeriod = systemCost / annualSavings;
    
    return {
      systemSize: Math.round(systemSize * 100) / 100,
      areaNeeded: Math.round(areaNeeded),
      systemCost: Math.round(systemCost),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(monthlyConsumption * 12 * 0.82), // kg of CO2 per year
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = calculateSolarSystem();

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solar Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Calculate your solar power requirements and potential savings with our easy-to-use solar calculator.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Monthly Electricity Bill (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your monthly bill"
                    value={monthlyBill || ''}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Available Roof Area (sq ft)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter roof area"
                    value={roofArea || ''}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Location
                  </label>
                  <Select
                    value={location}
                    onValueChange={setLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full"
                  onClick={handleCalculate}
                  disabled={!monthlyBill || !roofArea}
                >
                  Calculate Solar Requirements
                </Button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    Required Solar System Size
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {results.systemSize} kW
                  </div>
                  <p className="text-muted-foreground">
                    Recommended system capacity based on your consumption
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-primary" />
                      Estimated Cost
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{results.systemCost.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Battery className="h-5 w-5 text-primary" />
                      Annual Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{results.annualSavings.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Payback Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.paybackPeriod} years
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      CO₂ Reduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {results.co2Reduction} kg/year
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}