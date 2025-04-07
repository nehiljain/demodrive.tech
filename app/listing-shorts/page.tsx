'use client';

import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import Footer from '@/components/footer';
import { VideoMarquee } from '@/components/video-marquee';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import { Button } from '@/components/ui/button';
import React from 'react'

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
import { ChevronRight, FileText, Bell, Share2, Calendar } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';

export default function ListingShorts() {
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen dark text-foreground overflow-hidden bg-radial-fancy">
      {/* Hero Section */}
      <div className="relative w-full py-6">
        <div className="mx-auto max-w-6xl px-6 relative z-[1]">
          {/* Hero Content */}
          <div className="text-center mb-12 mt-16">
            <BlurFade delay={BLUR_FADE_DELAY * 0.5} yOffset={8}>
              <AnnouncementBanner />
            </BlurFade>
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mt-8"
              yOffset={8}
            >
              <h2>
                Turn photos into  <span className="text-accent">viral short tours</span>
              </h2>
            </BlurFade>
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="mt-6 text-lg leading-8 text-[#DFC8AF]"
              text="In Minutes. With AI. No editing required. For Free."
            />

            {/* Image to Video Transformation Section */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="mt-16 flex flex-row gap-8 max-w-6xl mx-auto items-center justify-center px-4">
                {/* Left Column - Three Images */}
                <div className="flex flex-col gap-4 w-[160px] sm:w-[200px]">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Photo 1</span>
                    </div>
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Photo 2</span>
                    </div>
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Photo 3</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-center w-12 sm:w-24">
                  <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12 text-primary" />
                </div>

                {/* Right Column - Vertical Video */}
                <div className="w-[200px] sm:w-[300px]">
                  <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border-accent-glow">
                    <video
                      src="https://storage.googleapis.com/demodrive-media/20250128/output/www_getmaple_ca__2025_01_28_134124/161455-823541644_small.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Video Showcase Section */}
      <div className="w-full py-12">
        <div className="mx-auto max-w-7xl relative z-[1]">
          <BlurFade
                delay={BLUR_FADE_DELAY * 7}
                className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                <h2>
                  We created 20 tours  <span className="text-accent">in 3 mins</span>
                </h2>
          </BlurFade>
          <VideoMarquee />
        </div>
      </div>

      {/* Feature Timeline Section */}
      <div className="py-12" id="features">
        <div className="mx-auto max-w-7xl px-6 relative z-[1]">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
          >
            <div className="flex flex-col gap-2">
              <div>Everything you need to</div>
              <div className="text-accent">grow your reputation</div>
            </div>
          </BlurFade>

          <BentoGrid>
            {[
              {
                title: 'Photos to Motion Magic',
                description: 'Take photos of your listing and turn them into a video using AI moving the camera around.',
                Icon: FileText,
                className: 'col-span-3 lg:col-span-2 card-highlight',
                background: (
                  <video
                    src="/features/rich_editor.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                ),
              },
              {
                title: 'Auto sync with Music',
                description: 'Automatic syncing of music to the video to make every transition feel perfect.',
                Icon: Bell,
                className: 'col-span-3 lg:col-span-1 card-highlight',
                background: (
                  <video
                    src="/features/storyboard.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                ),
              },
              {
                title: 'Vertical Video Format',
                description: 'Get more leads with vertical videos that are perfect for YouTube, TikTok, and Instagram.',
                Icon: Share2,
                className: 'col-span-3 lg:col-span-1 card-highlight',
                background: (
                  <video
                    src="/features/b_roll.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                ),
              },
              {
                title: 'No editing required',
                description: 'You go from inputting photos to a finished video with one click. "Generate"',
                Icon: Calendar,
                className: 'col-span-3 lg:col-span-2 card-highlight',
                background: (
                  <video
                    src="/features/create_project.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                ),
              },
            ].map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative py-16">
        <div className="mx-auto max-w-5xl px-6 py-2 sm:py-12 lg:px-8 text-center relative z-[1]">
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

            <Button
              variant="golden"
              size="xl"
              className="w-[280px]"
            >
              Generate Video
            </Button>
          </div>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
