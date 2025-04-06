'use client';

import Navigation from '@/components/navigation';
import Image from 'next/image';
import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import Footer from '@/components/footer';
import { VideoMarquee } from '@/components/video-marquee';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
import { ChevronRight, FileText, Bell, Share2, Calendar } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';

export default function ListingShorts() {
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <div className="relative w-full py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero Content */}
          <div className="text-center mb-12 mt-24">
            <BlurFade delay={BLUR_FADE_DELAY * 0.5} yOffset={8}>
              <AnnouncementBanner />
            </BlurFade>
            <BlurFade
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mt-8"
              yOffset={8}
            >
              <h2>
                Turn photos into viral short <span className="text-[#ff4d00]">tours</span>
              </h2>
            </BlurFade>
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="mt-6 text-lg leading-8 text-muted-foreground"
              text="In Minutes. With AI. No editing required. For Free."
            />

            {/* Image to Video Transformation Section */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="mt-16 flex flex-row gap-8 max-w-6xl mx-auto items-center justify-center px-4">
                {/* Left Column - Three Images */}
                <div className="flex flex-col gap-4 w-[160px] sm:w-[200px]">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <Image
                      src="/demo-images/photo1.jpg"
                      alt="Interior Photo 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <Image
                      src="/demo-images/photo2.jpg"
                      alt="Interior Photo 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <Image
                      src="/demo-images/photo3.jpg"
                      alt="Interior Photo 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-center w-12 sm:w-24">
                  <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground" />
                </div>

                {/* Right Column - Vertical Video */}
                <div className="w-[200px] sm:w-[300px]">
                  <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
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
      <div className="w-full py-12 bg-background/50">
        <div className="mx-auto max-w-7xl">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 7}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
            text="See it in action"
          />
          <VideoMarquee />
        </div>
      </div>

      {/* Feature Timeline Section */}
      <div className="" id="features">
        <BlurFade
          delay={BLUR_FADE_DELAY * 8}
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        >
          <div className="flex flex-col gap-2">
            <div>Everything you need to</div>
            <div className="text-[#ff4d00]">grow your reputation</div>
          </div>
        </BlurFade>

        <BentoGrid>
          {[
            {
              title: 'Photos to Motion Magic',
              description: 'Take photos of your listing and turn them into a video using AI moving the camera around.',
              Icon: FileText,
              className: 'col-span-3 lg:col-span-2',
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
              className: 'col-span-3 lg:col-span-1',
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
              className: 'col-span-3 lg:col-span-1',
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
              className: 'col-span-3 lg:col-span-2',
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

      {/* Bottom CTA Section */}
      <div className="relative">
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-12 lg:px-8 text-center">
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 20}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            text="More videos, more views, more leads."
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 22}
            className="mt-6 text-lg leading-8 text-muted-foreground"
            text="Use it while it's free."
          />
          <BlurFade delay={BLUR_FADE_DELAY * 23}>
            <div className="mt-10 flex items-center justify-center gap-6"></div>
          </BlurFade>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
