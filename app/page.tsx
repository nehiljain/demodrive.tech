"use client";

import Navigation from "@/components/navigation";
import Image from "next/image";
import { Phone, Bot, Users, FileCheck, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarButton, useInitCal } from "@/components/calendar-popup";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Footer from "@/components/footer";

interface Feature {
  badge: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageAlt: string;
  imageUrl?: string;
}

const features: Feature[] = [
  {
    badge: "Usability Recommendations",
    title: "Improve the DX of your docs",
    description:
      "Get insights on documentation clarity, completeness, searchability, LLM and Human Friendliness. Our AI evaluates your docs on multiple standards that matter to your users.",
    videoUrl: "/usability_recommendations.mp4",
    imageAlt: "UX Assessment",
  },
  {
    badge: "Error Stacktraces",
    title: "Developer friendly summary of bugs",
    description:
      "AI agents scan your docs as a technical user would. They replicate all the code guides and tutorials. You get a detailed report of whats not working.",
    videoUrl: "/stacktrace_recording.mp4",
    imageAlt: "PR Summary",
  },
  {
    badge: "Broken Links",
    title: "List of all the invalid links and references",
    description:
      "Our AI performs comprehensive testing of code samples in your documentation, ensuring they compile and run as expected. Catch issues before your users do.",
    imageUrl: "/404_demo_screenshot.png",
    imageAlt: "Code Analysis",
  },
];

const logos = [
  {
    src: "/copilotkit-logo-dark.webp",
    alt: "Copilotkit AI",
  },
  {
    src: "/whiterabbit_logo.svg",
    alt: "White Rabbit AI",
  },
];

// const FeatureSection = ({ features }: { features: Feature[] }) => {
//   return (
//     <div className="mx-auto max-w-5xl px-6 py-24">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
//           Documentation Quality Report
//         </h2>
//         <p className="text-center text-muted-foreground mb-12 text-xl font-bold">
//           Detailed review of your docs for correctness and usability.{" "}
//           <Link
//             href="https://app.demodrive.tech/reports/copilotkit-ai-12-06-1733533936"
//             className="text-accent hover:underline font-bold inline-flex items-center"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             See a sample report
//             <ArrowRight className="ml-2 h-4 w-4" />
//           </Link>
//         </p>
//       </div>

//       <div className="space-y-24">
//         {features.map((feature) => (
//           <FeatureCard
//             key={feature.badge}
//             feature={feature}
//             className="lg:grid-cols-2"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

const FeatureCard = ({
  feature,
  className,
}: {
  feature: Feature;
  className?: string;
}) => {
  return (
    <div className={cn("grid gap-12 lg:gap-8 items-start", className)}>
      <div className="px-6 lg:px-12 flex flex-col justify-center">
        <div className="space-y-4">
          <p className="text-sm text-accent font-bold">{feature.badge}</p>
          <h3 className="text-2xl font-bold">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      </div>
      <Card className="bg-card border-muted overflow-hidden">
        {feature.videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            width={600}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          >
            <source src={feature.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : feature.imageUrl ? (
          <Image
            src={feature.imageUrl}
            alt={feature.title}
            width={600}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
        ) : null}
      </Card>
    </div>
  );
};

export default function LandingPage() {
  useInitCal();
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-12 lg:px-8 flex flex-col items-center">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            yOffset={8}
            text="Make your docs"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            yOffset={8}
            text="Error Proof"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 3}
            className="mt-6 text-lg leading-8 text-muted-foreground"
            text="AI find bugs and generates usability report for your documentation."
          />
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="mt-10 flex items-center justify-center gap-6">
              <CalendarButton className="h-12 px-6" />
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="mx-auto max-w-6xl px-6 lg:py-6 sm:py-2">
            <Card className="relative overflow-hidden rounded-lg border border-muted bg-background">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <Image
                src="/sample_report_landing_page_screenshot.png"
                alt="Sample Report Screenshot"
                width={1200}
                height={600}
                className="relative rounded-lg"
              />
            </Card>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="mx-auto max-w-5xl px-6 py-12">
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-8 mb-8">
                {logos.map((logo, i) => (
                  <div key={i} className="flex justify-center w-[120px]">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={170}
                      height={50}
                      className="h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="text-md text-muted-foreground">
                Trusted by teams leading AI DevTool companies.
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Feature Section */}
      <div className="mx-auto max-w-5xl px-6 py-24">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 7}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center"
          text="Documentation Quality Report"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 8}
          className="text-center text-muted-foreground mb-12 text-xl font-bold"
          text="Detailed review of your docs for correctness and usability."
        />

        <div className="space-y-24">
          {features.map((feature, idx) => (
            <BlurFade key={feature.badge} delay={BLUR_FADE_DELAY * (9 + idx)}>
              <FeatureCard feature={feature} className="lg:grid-cols-2" />
            </BlurFade>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-20 lg:py-24 sm:py-12 sm:px-6">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 12}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center"
          text="Here is how it works"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-6 relative">
          {[
            {
              icon: Phone,
              title: "Onboarding Call",
              description:
                "We schedule a call to understand your project and help you configure our AI agents.",
            },
            {
              icon: Bot,
              title: "Weekly AI automated reports",
              description:
                "Based on your configuration, AI agents look at your public facing documentation and generate a report.",
            },
            {
              icon: Users,
              title: "Human in the loop",
              description:
                "Our AI is not perfect yet. We review and correct the generated report. OSS projects are our ideal users.",
            },
            {
              icon: FileCheck,
              title: "Better Docs",
              description:
                "You get a detailed report of whats not working. You fix it and the cycle continues.",
            },
          ].map((feature, index) => (
            <BlurFade
              key={feature.title}
              delay={BLUR_FADE_DELAY * (13 + index)}
            >
              <div className="relative flex items-stretch h-full">
                <div className="bg-card p-6 rounded-lg border border-muted shadow-sm hover:border-muted-foreground/20 transition-colors flex-1 flex flex-col">
                  <feature.icon className="h-8 w-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-foreground text-sm flex-1">
                    {feature.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-10 px-4">
                    <ChevronRight className="w-6 h-6 text-accent" />
                  </div>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8 text-center">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 17}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            text="Ready to improve"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 18}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            text="your documentation?"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 19}
            className="mt-6 text-lg leading-8 text-muted-foreground"
            text="Schedule a demo with us. We promise you will be amazed."
          />
          <BlurFade delay={BLUR_FADE_DELAY * 20}>
            <div className="mt-10 flex items-center justify-center gap-6">
              <CalendarButton className="h-12 px-6" />
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
