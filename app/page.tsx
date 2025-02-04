"use client";

import Navigation from "@/components/navigation";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import WordRotate from "@/components/ui/word-rotate";
import Footer from "@/components/footer";


import { HeroVideo } from '@/components/ui/hero-video'
import { WaitlistForm } from '@/components/waitlist-form'
import dynamic from 'next/dynamic'

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
const DemoFlow = dynamic(() => import('@/components/demo-flow'), { ssr: false })

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

// const heroTabs = [
//   {
//     title: "Generate Tutorials",
//     value: "code-review",
//     content: (
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="p-8 rounded-xl bg-gradient-to-br from-white via-white to-accent/60">
//           <video
//             src="/landing-page-assets/tutorial-generation-gif-2025-01-15.webm"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full rounded-xl"
//           />
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: "Generate Screenshots",
//     value: "diagnosis",
//     content: (
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="p-8 rounded-xl bg-gradient-to-br from-white via-white to-accent/60">
//           <video
//             src="/landing-page-assets/tutorial-screenshot-generation-gif-2025-01-14.webm"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full rounded-xl"
//           />
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: "Generate How-To Videos",
//     value: "api",
//     content: (
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="p-8 rounded-xl bg-gradient-to-br from-white via-white to-accent/60">
//           <video
//             src="/landing-page-assets/tutorial-video-generation-gif-2025-01-14.webm"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full rounded-xl"
//           />
//         </div>
//       </div>
//     ),
//   },
//   {
//     title: "Automatic QA Tutorials",
//     value: "chat",
//     content: (
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="p-8 rounded-xl bg-gradient-to-br from-white via-white to-accent/60">
//           <Image
//             src="/sample_report_landing_page_screenshot.png"
//             alt="Sample Report Screenshot"
//             width={1200}
//             height={600}
//             className="w-full h-[300px] sm:h-[528px] rounded-xl object-cover"
//           />
//         </div>
//       </div>
//     ),
//   },
// ];


export default function LandingPage() {
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <div className="relative w-full py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero Content */}
          <div className="text-center mb-12 mt-24">
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              yOffset={8}
            >
              <h1>Supercharge 🚀</h1>
            </BlurFade>
            <BlurFade
              delay={BLUR_FADE_DELAY * 2}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl flex items-center justify-center"
              yOffset={8}
            >
              <WordRotate
                words={[
                  "your Guides",
                  "your Demos",
                  "your Walkthroughs",
                  "your Tutorials",
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
                <WaitlistForm />
              </div>
            </BlurFade>
          </div>

          {/* Featured Video */}
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="max-w-4xl mx-auto">
              <HeroVideo
                playbackId="e6coKvqHCmIwgMzzPCVB9snRcgpDmNY1WuA01L5yHIiQ"
                title="DemoDrive Product Demo"
                className="w-full"
                poster="https://image.mux.com/e6coKvqHCmIwgMzzPCVB9snRcgpDmNY1WuA01L5yHIiQ/thumbnail.png?width=1920&height=1080&time=2.6"
                thumbnailTime={2.6}
              />
            </div>
          </BlurFade>

          {/* Logos Section */}
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="mt-16 flex flex-col items-center">
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
          </BlurFade>
        </div>
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
        <div className="py-10 lg:py-12 sm:py-6" id="flow-diagram">
          <div className="mx-auto max-w-5xl px-6">
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 19}
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
              text="How DemoDrive Works"
            />

            <BlurFade delay={BLUR_FADE_DELAY * 20}>
              <div className="w-full h-[400px] border border-muted rounded-xl overflow-hidden">
                <DemoFlow />
              </div>
            </BlurFade>
          </div>
        </div>

        {/* FAQ Section */}
        {/* <div className="py-10 lg:py-12 sm:py-6" id="faq">
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
                    answer: "You can get started immediately after our onboarding call. The initial setup takes about 30 minutes, and you'll receive your first video/docs within a day."
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
        </div> */}

        {/* Flow Diagram Section */}


        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8 text-center">
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 17}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              text="Ready to create"
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 18}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              text="stunning videos?"
            />
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 19}
              className="mt-6 text-lg leading-8 text-muted-foreground"
              text="Schedule a demo with us. We promise you will be amazed."
            />
            <BlurFade delay={BLUR_FADE_DELAY * 20}>
              <div className="mt-10 flex items-center justify-center gap-6">
                <WaitlistForm />
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Add the Footer */}
        <Footer />
    </div>
  );
}
