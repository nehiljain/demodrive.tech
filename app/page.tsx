"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import WordRotate from "@/components/ui/word-rotate";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";

import { WaitlistForm } from '@/components/waitlist-form'
import dynamic from 'next/dynamic'

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
const DemoFlow = dynamic(() => import('@/components/demo-flow'), { ssr: false })
import { Skeleton } from "@/components/ui/skeleton";
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
    src: "/revive_logo.avif",
    alt: "Revive AI",
  },
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
    <div className="min-h-screen dark text-foreground bg-radial-fancy">
      {/* Hero Section */}
      <div className="relative w-full py-20">
        <div className="mx-auto max-w-6xl px-6 relative z-[1]">
          {/* Hero Content */}
          <div className="text-center mb-12 mt-24">
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
              yOffset={8}
            >
              <h1 className="pr-5">Cursor for</h1>
            </BlurFade>
            <BlurFade
              delay={BLUR_FADE_DELAY * 2}
              className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl flex items-center justify-center"
              yOffset={8}
            >
              <WordRotate
                words={[
                  "Marketing Videos",
                  "Viral Shorts",
                  "Product Demos",
                ]}
                duration={2500}
                className="text-accent"
              />
            </BlurFade>
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 3}
              className="mt-6 text-2xl leading-8 text-foreground"
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
              <div className="text-md text-foreground mb-8">
                Trusted by
              </div>
              <div className="flex justify-center gap-8">
                {logos.map((logo, i) => (
                  <div key={i} className="flex justify-center sm:w-[160px] w-[120px]">
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
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Problem Statement Section */}
      <div className="py-20" id="problem">
        <div className="mx-auto max-w-6xl px-6 relative z-[1]">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 6.5}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
            text="The Problem"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <BlurFade delay={BLUR_FADE_DELAY * 6.6}>
                <Image src="/video_editing.svg" alt="Video Editing" width={400} height={400} />
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 6.7}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-6">
                    <p className="text-lg text-foreground leading-relaxed">
                      Marketing teams are drowning in video project backlogs. With time spent on repetitive tasks like voice alignment and brand consistency,
                      creating quality video content remains costly and time-consuming.
                    </p>
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-muted card-highlight">
                      <div className="text-3xl font-bold text-destructive">60%</div>
                      <div className="text-foreground">
                        of time is spent on repetitive video editing tasks
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg border border-muted card-highlight">
                      <div className="text-3xl font-bold text-destructive">85%</div>
                      <div className="text-foreground">
                        creators report video production costs are too high to scale effectively
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-accent">The Impact</h3>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-muted bg-foreground/50">
                      <div className="text-3xl font-bold text-foreground">3.5x</div>
                      <div className="text-foreground">
                        Improved customer understanding with video content
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-muted bg-foreground/50">
                      <div className="text-3xl font-bold text-foreground">3x</div>
                      <div className="text-foreground">
                        More leads generated compared to static content
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-lg text-foreground leading-relaxed">
                    DemoDrive eliminates the grunt work by using fine-tuned video pipelines with integrations to your existing tools (API, Slack).
                    This enables scalable content creation and unlocking new efficiency in product marketing and customer education.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-24 lg:py-24 sm:py-6" id="flow-diagram">
        <div className="mx-auto max-w-6xl px-6">
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
      {/* Feature Timeline Section */}
      <div className="" id="features">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 7}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        text="AI Magic Features"
        />

        <FeatureTimeline
          baseDelay={BLUR_FADE_DELAY * 8}
          features={[
            {
              title: "Motion Magic",
              description: "Take photos of your listing and turn them into a video using AI moving the camera around.",
              media: {
                type: 'video',
                src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+photos+to+motion.mp4',
                alt: 'Video demo showcase'
              }
            },
            {
              title: "Beat Sync",
              description: "Automatic syncing of music to the video to make every transition feel perfect.",
              media: {
                type: 'video',
                src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+beat+sync.mp4',
                alt: 'Video demo showcase'
              }
            },
          ]}
        />
        </div>

      <BlurFadeText
        delay={BLUR_FADE_DELAY * 7}
        className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        text="Editor Features"
      />
        <FeatureTimeline
          baseDelay={BLUR_FADE_DELAY * 8}
        features={[{
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
              src: '/features/ai_chat.mp4',
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
            title: "Customize Formats",
            description: "Generate videos of different length, quality and aspect ratio.",
            media: {
              type: 'video',
              src: '/features/create_project.mp4',
              alt: 'Project management interface'
            }
          }
        ]}
        />

      {/* Showcase Section */}
      {/* <div className="py-20 lg:py-24 sm:py-12 sm:px-6" id="showcase">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 14}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center"
          text="Generated Videos Showcase"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 15}
          className="text-center text-foreground mb-12 text-xl max-w-3xl mx-auto"
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
                          <Image
                            src={`https://storage.googleapis.com/demodrive-media/${videoPath}/thumbnail.${format}`}
                            alt={video.title}
                            width={400}
                            height={400}
                            className="object-cover w-full group-hover:scale-105 transition-transform duration-300"
                            onError={() => handleImageError(video.id, format)}
                          />
                        </div>
                      </div>
                      <div className="p-4 text-left">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden relative">
                            <Image
                              src={video.author.avatar_url}
                              alt={video.author.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {video.title}
                            </h3>
                            <p className="text-sm text-foreground">
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
          </>
        )}
      </div> */}

      {/* Animation Showcase Section */}
      {/* <div className="py-20 lg:py-24 sm:py-12 sm:px-6" id="animations">
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 18}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-center"
          text="Animation Library"
        />
        <BlurFadeText
          delay={BLUR_FADE_DELAY * 19}
          className="text-center text-foreground mb-12 text-xl max-w-3xl mx-auto"
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
                  <AccordionContent className="text-foreground text-lg">
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
      <div className="relative py-24">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8 text-center">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="space-y-4 mb-10">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5f2eb]">
                More videos,
              </h2>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5f2eb]">
                more views,
              </h2>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#f5f2eb]">
                more leads.
              </h2>

              <p className="mt-8 text-xl leading-8 text-[#f5f2eb]/80">
                Use it while it&apos;s free.
              </p>
            </div>

            <a href="/listing-shorts">
              <Button
                variant="golden"
                size="xl"
                className="w-[280px]"
              >
                Generate Video
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
