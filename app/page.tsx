"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import WordRotate from "@/components/ui/word-rotate";
import Footer from "@/components/footer";


import { WaitlistForm } from '@/components/waitlist-form'
import dynamic from 'next/dynamic'

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
const DemoFlow = dynamic(() => import('@/components/demo-flow'), { ssr: false })
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import FeatureTimeline from "@/components/ui/feature-timeline";

interface VideoMetadata {
  id: string;
  title: string;
  video_url: string;
  author: {
    name: string;
    avatar_url: string;
  };
}

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
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailFormat, setThumbnailFormat] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const response = await fetch(
          "https://storage.googleapis.com/demodrive-media/gallery/metadata.json",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch showcase data");
        }

        const data = await response.json();
        console.log("Showcase data:", data);
        setVideos(data.videos);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching showcase data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load showcase videos"
        );
        setLoading(false);
      }
    };

    fetchShowcase();
  }, []);

  const handleImageError = (videoId: string, currentFormat: string) => {
    const newFormat = currentFormat === "jpg" ? "png" : "jpg";
    setThumbnailFormat((prev) => ({
      ...prev,
      [videoId]: newFormat,
    }));
  };

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
              <h1 className="pr-5">AI Editor for</h1>
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
          {/* <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="max-w-4xl mx-auto">
              <HeroVideo
                playbackId="e6coKvqHCmIwgMzzPCVB9snRcgpDmNY1WuA01L5yHIiQ"
                title="DemoDrive Product Demo"
                className="w-full"
                poster="https://image.mux.com/e6coKvqHCmIwgMzzPCVB9snRcgpDmNY1WuA01L5yHIiQ/thumbnail.png?width=1920&height=1080&time=2.6"
                thumbnailTime={2.6}
              />
            </div>
          </BlurFade> */}

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

      {/* Feature Timeline Section */}
      <div className="" id="features">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 7}
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
          text="Key Features"
        />

        <FeatureTimeline
          baseDelay={BLUR_FADE_DELAY * 8}
          features={[
            {
              title: "Rich Editor",
              description: "Edit your video scripts, add images, videos, and more with our rich web native editor.",
              media: {
                type: 'video',
                src: '/features/rich_editor.mp4',
                alt: 'Video demo showcase'
              }
            },
            {
              title: "AI Copilot",
              description: "AI script generation for your product demos, tutorials and walkthroughs.",
              media: {
                type: 'video',
                src: '/features/storyboard.mp4',
                alt: 'Video demo showcase'
              }
            },
            {
              title: "B-Roll Generation",
              description: "Generate stunning, interactive video demonstrations of your product with AI-powered narration and automatic scene transitions. Perfect for onboarding and training materials.",
              media: {
                type: 'video',
                src: '/features/b_roll.mp4',
                alt: 'Video demo showcase'
              }
            },
            {
              title: "Short Videos",
              description: "Generate videos of different length, quality and aspect ratio.",
              media: {
                type: 'video',
                src: '/features/create_project.mp4',
                alt: 'Project management interface'
              }
            }
          ]}
        />
        </div>

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


      {/* Showcase Section */}
      <div className="py-20 lg:py-24 sm:py-12 sm:px-6" id="showcase">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 14}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center"
          text="Generated Videos Showcase"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 15}
          className="text-center text-muted-foreground mb-12 text-xl max-w-3xl mx-auto"
          text="Check out what others have created with DemoDrive's AI-powered tutorial generator."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <div className="overflow-hidden rounded-lg border border-muted">
                  <Skeleton className="aspect-video w-full" />
                </div>
                <div className="p-4 text-left">
                  <div className="flex gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-500">
            Error: {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
              {videos.map((video, index) => {
                const videoPath = video.video_url
                  .split("demodrive-media/")[1]
                  .split("/metadata.json")[0];
                const format = thumbnailFormat[video.id] || "jpg";
                return (
                  <BlurFade
                    key={video.id}
                    delay={BLUR_FADE_DELAY * (16 + index * 0.2)}
                  >
                    <a
                      href={`https://app.demodrive.tech/video-player/${btoa(videoPath)}`}
                      className="group cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-lg border border-muted shadow-sm hover:border-muted-foreground/20 transition-colors">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={`https://storage.googleapis.com/demodrive-media/${videoPath}/thumbnail.${format}`}
                            alt={video.title}
                            className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
                            onError={() => handleImageError(video.id, format)}
                          />
                        </div>
                      </div>
                      <div className="p-4 text-left">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden relative">
                            <img
                              src={video.author.avatar_url}
                              alt={video.author.name}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {video.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {video.author.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </BlurFade>
                );
              })}
            </div>

            <BlurFade delay={BLUR_FADE_DELAY * 17}>
              <div className="text-center mt-12">
                <a href="https://app.demodrive.tech/showcase" className="text-accent hover:text-accent/80 font-medium flex items-center justify-center gap-2">
                  View all showcase videos <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </BlurFade>
          </>
        )}
      </div>

      {/* Animation Showcase Section */}
      {/* <div className="py-20 lg:py-24 sm:py-12 sm:px-6" id="animations">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 18}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center"
          text="Animation Library"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 19}
          className="text-center text-muted-foreground mb-12 text-xl max-w-3xl mx-auto"
          text="Explore our collection of customizable animations for your videos and presentations."
        />

        <AnimationShowcase />
      </div> */}

      {/* FAQ Section */}
      {/* <div className="py-10 lg:py-12 sm:py-6" id="faq">
        <div className="mx-auto max-w-5xl px-6">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 18}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
            text="Frequently Asked Questions"
          />

          <BlurFade delay={BLUR_FADE_DELAY * 19}>
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
            delay={BLUR_FADE_DELAY * 20}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            text="Ready to create"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 21}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            text="stunning videos?"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 22}
            className="mt-6 text-lg leading-8 text-muted-foreground"
            text="Schedule a demo with us. We promise you will be amazed."
          />
          <BlurFade delay={BLUR_FADE_DELAY * 23}>
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
