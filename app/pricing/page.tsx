"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import { CalendarButton, useInitCal } from "@/components/calendar-popup";

type PricingPlan = {
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
}

const plans: PricingPlan[] = [
  {
    title: "Starter",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "Perfect for small documentation projects",
    features: [
      "Weekly automated scans",
      "Basic error detection",
      "Link validation",
      "Email support"
    ],
    actionLabel: "Get Started",
  },
  {
    title: "Professional",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    description: "For growing teams with complex documentation",
    features: [
      "Daily automated scans",
      "Advanced error detection",
      "Custom integrations",
      "Priority support",
      "Custom reporting"
    ],
    actionLabel: "Get Started",
    popular: true,
  },

];

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive
}: PricingPlan & { isYearly: boolean }) => (
  <Card className={cn(
    "w-full flex flex-col justify-between p-6",
    popular ? "border-accent" : "border-border",
    exclusive ? "bg-secondary" : "bg-card"
  )}>
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          {popular && (
            <span className="px-3 py-1 text-sm rounded-full bg-accent text-accent-foreground">
              Popular
            </span>
          )}
        </div>
        <div className="flex items-baseline mb-2">
          {monthlyPrice ? (
            <>
              <span className="text-4xl font-bold">
                ${isYearly ? yearlyPrice : monthlyPrice}
              </span>
              <span className="text-muted-foreground ml-2">
                /{isYearly ? 'year' : 'month'}
              </span>
            </>
          ) : (
            <span className="text-4xl font-bold">Custom</span>
          )}
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4 mb-8">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>

    {title === "Starter" ? (
      <Button
        variant="accent"
        className="w-full relative inline-flex items-center justify-center"
      >
        <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
        {actionLabel}
      </Button>
    ) : (
      <CalendarButton className="w-full" />
    )}
  </Card>
);

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const BLUR_FADE_DELAY = 0.04;

  useInitCal();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-4xl font-bold tracking-tight sm:text-5xl mb-4"
            text="Simple, transparent pricing"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-xl text-muted-foreground"
            text="Choose the plan that's right for your documentation needs"
          />
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Tabs
            defaultValue="monthly"
            className="w-fit mx-auto mb-16"
            onValueChange={(value) => setIsYearly(value === "yearly")}
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </BlurFade>

        <div className={cn(
          "grid gap-8 w-full justify-center",
          // Dynamic grid columns based on number of plans
          plans.length === 1 ? "grid-cols-1 max-w-md mx-auto" :
          plans.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto" :
          "grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto"
        )}>
          {plans.map((plan, idx) => (
            <BlurFade key={plan.title} delay={BLUR_FADE_DELAY * (4 + idx)}>
              <PricingCard {...plan} isYearly={isYearly} />
            </BlurFade>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
