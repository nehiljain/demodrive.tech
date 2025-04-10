"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { MessagesSquare, Star, Zap, Captions, GalleryHorizontalEnd, HeadphonesIcon, BarChart, Rocket, Wrench, Shield, Video, Timer, FileAudio, Ban, Tv2, Palette, ArrowRight, Sparkles, FileText, Mic, Bot, Volume2, Mail, Clock, MessageSquare, Slack, Users, Gauge, TerminalSquare, BellRing, HeartHandshake } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import { CalendarButton, useInitCal } from "@/components/calendar-popup";

type PricingPlan = {
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: {
    title: string;
    icon: React.ElementType;
    subFeatures: {
      text: string;
      icon: React.ElementType;
    }[];
  }[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
}

const discount = 0.25;

const plans: PricingPlan[] = [
  {
    title: "Lite",
    monthlyPrice: undefined,
    yearlyPrice: undefined,
    description: "To make fast, easy short videos",
    features: [
      {
        title: " Video Generation",
        icon: BarChart,
        subFeatures: [
          { text: "20 videos/month", icon: Video },
          { text: "Max 1 min/video", icon: Timer },
          { text: "Free B-rolls & Audio", icon: FileAudio },
          { text: "No watermark", icon: Ban },
          { text: "1080p Exports", icon: Video },
          { text: "2 Custom Branded Template", icon: Palette }
        ]
      },
      {
        title: "AI Assistant",
        icon: Zap,
        subFeatures: [
          { text: "3 Motion magic/video", icon: Sparkles },
          { text: "Auto Beat Sync", icon: FileAudio }
        ]
      },
      {
        title: "Support",
        icon: MessagesSquare,
        subFeatures: [
          { text: "Email support", icon: Mail },
          { text: "24hr response time", icon: Clock },
        ]
      }
    ],
    actionLabel: "Get Started",
    popular: false,
  },
  {
    title: "Pro",
    monthlyPrice: undefined,
    yearlyPrice: undefined,
    description: "For fast growing devtool companies",
    features: [
      {
        title: "Everything in Lite",
        icon: Star,
        subFeatures: [
          { text: "4k exports", icon: Video },
          { text: "10 Custom Branded Templates", icon: Palette }
        ]
      },
      {
        title: "AI Assistant",
        icon: Zap,
        subFeatures: [
          { text: "Auto - Captions", icon: Captions },
          { text: "Generate Storyboards", icon: GalleryHorizontalEnd },
          { text: "AI Voiceover", icon: Mic },
          { text: "AI Avatar", icon: Bot },
          { text: "Auto volume adjustment", icon: Volume2 }
        ]
      },
      {
        title: "Enhanced Support",
        icon: HeadphonesIcon,
        subFeatures: [
          { text: "Slack support", icon: Slack },
          { text: "8hr response time", icon: Clock },
        ]
      }
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
      {
        title: "Everything in Pro",
        icon: Rocket,
        subFeatures: [
          { text: "All Pro features", icon: ArrowRight }
        ]
      },
      {
        title: "Custom Solutions",
        icon: Wrench,
        subFeatures: [
          { text: "Custom # of Editors", icon: Users },
          { text: "Higher usage limits", icon: Gauge },
          { text: "Volume discounts", icon: TerminalSquare },
          { text: "Custom AI models", icon: Sparkles }
        ]
      },
      {
        title: "Premium Support",
        icon: Shield,
        subFeatures: [
          { text: "Dedicated support", icon: HeartHandshake },
          { text: "Custom SLA", icon: BellRing }
        ]
      }
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
  popular,
  exclusive
}: PricingPlan & { isYearly: boolean }) => (
  <Card className={cn(
    "w-full flex flex-col justify-between p-8",
    popular ? "border-2 border-accent" : "border-border",
    exclusive ? "bg-secondary" : "bg-card"
  )}>
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          {popular && (
            <span className="px-3 py-1 text-sm rounded-full bg-accent text-accent-foreground font-medium">
              Popular
            </span>
          )}
        </div>
        <div className="flex items-baseline mb-3">
          {monthlyPrice ? (
            <>
              <span className="text-5xl font-bold">
                ${isYearly ? yearlyPrice : monthlyPrice}
              </span>
              <span className="text-muted-foreground ml-2">
                /{isYearly ? 'year' : 'month'}
              </span>
            </>
          ) : (
            <span className="text-5xl font-bold">Custom</span>
          )}
        </div>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <div className="space-y-6 mb-8">
        {features.map((feature) => (
          <div key={feature.title} className="space-y-3">
            <div className="flex items-center gap-2 font-medium text-lg">
              <feature.icon className="h-5 w-5 text-accent" />
              <span>{feature.title}</span>
            </div>
            <div className="space-y-2 pl-8">
              {feature.subFeatures.map((subFeature) => (
                <div key={subFeature.text} className="flex items-center gap-2 text-muted-foreground">
                  <subFeature.icon className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{subFeature.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <CalendarButton className="w-full h-12 text-lg font-medium" />
  </Card>
);

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const BLUR_FADE_DELAY = 0.04;

  useInitCal();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-5xl font-bold tracking-tight sm:text-6xl mb-4"
            text="Simple, transparent pricing"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-xl text-muted-foreground"
            text="Choose the plan that's right for your team"
          />
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <Tabs
            defaultValue="monthly"
            className="w-fit mx-auto mb-16"
            onValueChange={(value) => setIsYearly(value === "yearly")}
          >
            <TabsList className="grid w-[300px] grid-cols-2">
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
