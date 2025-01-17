"use client";

import Navigation from "@/components/navigation";
import Image from "next/image";
import { Phone, Bot, Users, FileCheck, ChevronRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import WordRotate from "@/components/ui/word-rotate";
import Footer from "@/components/footer";
import { Tabs } from "@/components/ui/hero-tabs";
import { VideoDialog } from "@/components/video-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarButton, useInitCal } from "@/components/calendar-popup";

const logos = [
  {
    src: "/copilotkit-logo-dark.webp",
    alt: "Copilotkit AI",
  },
  {
    src: "/whiterabbit_logo.svg",
    alt: "White Rabbit AI",
  },
  {
    src: "/dagworks_logo.png",
    alt: "DagWorks Inc",
  },
];

const heroTabs = [
  {
    title: "Generate Tutorials",
    value: "code-review",
    content: (
      <div className="w-full max-w-3xl mx-auto">
        <div
          className="p-8 rounded-xl"
          style={{
            backgroundImage: 'url("/background-min.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <video
            src="/landing-page-assets/tutorial-generation-gif-2025-01-15.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Generate Screenshots",
    value: "diagnosis",
    content: (
      <div className="w-full max-w-3xl mx-auto">
        <div
          className="p-8 rounded-xl"
          style={{
            backgroundImage: 'url("/background-min.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <video
            src="/landing-page-assets/tutorial-screenshot-generation-gif-2025-01-14.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Generate How-To Videos",
    value: "api",
    content: (
      <div className="w-full max-w-3xl mx-auto">
        <div
          className="p-8 rounded-xl"
          style={{
            backgroundImage: 'url("/background-min.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <video
            src="/landing-page-assets/tutorial-video-generation-gif-2025-01-14.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Automatic QA Tutorials",
    value: "chat",
    content: (
      <div className="w-full max-w-3xl mx-auto">
        <div
          className="p-8 rounded-xl"
          style={{
            backgroundImage: 'url("/background-min.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Image
            src="/sample_report_landing_page_screenshot.png"
            alt="Sample Report Screenshot"
            width={1200}
            height={600}
            className="w-full h-[528px] rounded-xl object-cover"
          />
        </div>
      </div>
    ),
  },
];


export default function LandingPage() {
  useInitCal();
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-2 lg:pb-6 sm:pt-40 sm:pb-20 lg:px-8 flex flex-col items-center">
          <BlurFade
            delay={BLUR_FADE_DELAY}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            yOffset={8}
          >
            <h1>Supercharge 🚀</h1>
          </BlurFade>
          <BlurFade
            delay={BLUR_FADE_DELAY * 2}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl flex items-center"
            yOffset={8}
          >
            <WordRotate
              words={[
                "your Tutorials",
                "your Guides",
                "your Demos",
                "your Walkthroughs",
              ]}
              duration={2500}
            />
          </BlurFade>
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 3}
            className="mt-6 text-2xl leading-8 text-muted-foreground"
            text="Generate, review and publish in minutes."
          />

          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="mt-8 sm:mt-10 flex items-center justify-center gap-6">
              <CalendarButton className="h-12 px-6" />
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-2 lg:py-4">
            <div className="h-[30rem] sm:h-[35rem] lg:h-[40rem] [perspective:1000px] relative flex flex-col w-full items-start justify-start">
              <Tabs
                tabs={heroTabs}
                containerClassName="w-full justify-center"
                contentClassName="mt-6 sm:mt-8 lg:mt-4"
                tabClassName="min-w-[140px] sm:min-w-[160px] lg:min-w-[200px]"
              />
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
          <div className="flex justify-center mt-20">
            <VideoDialog />
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="mx-auto max-w-5xl mt-10 px-6 py-6">
            <div className="flex flex-col items-center">
              <div className="flex justify-center gap-8 mb-8">
                {logos.map((logo, i) => (
                  <div key={i} className="flex justify-center w-[160px]">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={50}
                      className="h-8 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="text-md text-muted-foreground">
                Trusted by teams leading AI companies.
              </div>
            </div>
          </div>
        </BlurFade>
      </div>

    {/* Feature Section */}
    {/* <div className="mx-auto max-w-5xl px-6 py-24">
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
      </div> */}

      {/* How it Works Section */}
      <div className="py-20 lg:py-24 sm:py-12 sm:px-6" id="how-it-works">
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
                "We schedule a call to understand your projects and help you configure our AI agents.",
            },
            {
              icon: Bot,
              title: "You submit a request via our webapp",
              description:
              "Based on your configuration and requests, AI agents generate videos or text based guides for you.",
            },
            {
              icon: Users,
              title: "Human in the loop",
              description:
                "Our AI is not perfect yet. We review and correct the generated report.",
            },
            {
              icon: FileCheck,
              title: "Publish ready output",
              description:
                "You get a code and assets to publish this on your docs/blog or website.",
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

      {/* FAQ Section */}
      <div className="py-10 lg:py-12 sm:py-6" id="faq">
        <div className="mx-auto max-w-5xl px-6">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 17}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
            text="Frequently Asked Questions"
          />

          <BlurFade delay={BLUR_FADE_DELAY * 18}>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How long does it take to get started?",
                  answer: "You can get started immediately after our onboarding call. The initial setup takes about 30 minutes, and you'll receive your first report within a week."
                },
                {
                  question: "What kind of tutorials do you support?",
                  answer: "We primarily support web applications and CLI-based tools. Our AI can analyze and create tutorials for your web app's features, API endpoints, and command-line interfaces."
                },
                {
                  question: "How accurate are the AI-generated QA reports?",
                  answer: "Our AI reports are highly accurate thanks to our human-in-the-loop process. Every report is reviewed by our team before being sent to ensure quality and accuracy."
                },
                {
                  question: "Can I add my own voice to the generated video?",
                  answer: "Yes, you can add your own voice to the generated video. We use a voice cloning technology to add your voice to the video."
                },
                {
                  question: "How accurate are the AI-generated tutorials?",
                  answer: "We are contantly improving our AI agents. Our SaaS offering makes it easy for users to jump in and take control of the process."
                },

                {
                  question: "Can I edit/ modify the output?",
                  answer: "Yes, you can edit the generated tutorial, screenshot or video. In our webapp, you built in editor to allow you to make changes. However, you can also export the output to your own editor of choice."
                },
                {
                  question: "What do I need to get started?",
                  answer: "We need access to any public facing (or private) documentation you have. We also would need either a demo code against which you want to create tutorial or a demo video."
                }
              ].map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8 text-center">
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
