"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
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

const discount = 0.25;

const plans: PricingPlan[] = [
  {
    title: "Lite",
    monthlyPrice: 250,
    yearlyPrice: Math.ceil(250 * (1 - discount) * 12),
    description: "For small teams",
    features: [
      "Weekly automated quality reports",
      "upto 50 tutorials",
      "AI Usability recommendations",
      "AI Code snippet analysis",
      "AI Broken links detection",
      "Email support"
    ],
    actionLabel: "Get Started",
    popular: false,
  },
  {
    title: "Pro",
    monthlyPrice: 700,
    yearlyPrice: Math.ceil(700 * (1 - discount) * 12),
    description: "For fast growing devtool companies",
    features: [
      "Everything in Lite",
      "1 Editor User",
      "AI Tutorial generation",
      "AI Screenshot generation",
      "AI Video generation",
      "Slack support"
    ],
    actionLabel: "Get Started",
    popular: true,
  },
  {
    title: "Enterprise",
    monthlyPrice: undefined,
    yearlyPrice: undefined,
    description: "For established companies",
    features: [
      "Everything in Pro",
      "Custom # of Editors",
      "Volume discounts",
      "Higher limits for AI generation",
    ],
    actionLabel: "Get Started",
    popular: false,
  },
];

const PricingCard = ({
  isYearly,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  // actionLabel,
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

    <CalendarButton className="w-full" />
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
            text="Plans & Pricing"
          />
          {/* <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-xl text-muted-foreground"
            text="Just have one pricing plan for you"
          /> */}
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Tabs
            defaultValue="monthly"
            className="w-fit mx-auto mb-16"
            onValueChange={(value) => setIsYearly(value === "yearly")}
          >
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="flex items-center gap-2">
                Yearly
                <span className="bg-accent/20 text-accent rounded-full px-2 py-0.5 text-xs font-bold">Save {Math.round(discount * 100)}%</span>
              </TabsTrigger>
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
