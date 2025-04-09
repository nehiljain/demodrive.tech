'use client';

import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import Footer from '@/components/footer';
import { VideoMarquee } from '@/components/video-marquee';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import { Button } from '@/components/ui/button';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
import { FileText, Bell } from 'lucide-react'
import { TransformingArrow } from '@/components/ui/transforming-arrow'

export default function ListingShorts() {
  const BLUR_FADE_DELAY = 0.04;
  const listingShortUrl = 'http://app.demodrive.tech/open/listing-shorts';

  return (
    <div className="min-h-screen dark text-foreground overflow-hidden bg-radial-fancy">
      {/* Hero Section */}
      <div className="relative w-full py-6">
        <div className="mx-auto max-w-6xl px-6 relative z-[1]">
          {/* Hero Content */}
          <div className="text-center mb-12 mt-20 lg:mt-24">
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

            <BlurFade delay={BLUR_FADE_DELAY * 3} className="mt-8">
              <Link href={listingShortUrl} className="inline-block">
                <Button variant="golden" size="lg">
                  Create Free Tour
                </Button>
              </Link>
            </BlurFade>

            {/* Image to Video Transformation Section */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="mt-16 flex flex-col sm:flex-row gap-4 sm:gap-8 max-w-6xl mx-auto items-center justify-center px-1 sm:px-4">
                {/* Left Column - Three Images */}
                <div className="flex flex-row sm:flex-col gap-4 w-full sm:w-[160px] md:w-[200px] justify-center">
                  {/* Image 1 */}
                  <div className="relative w-1/3 sm:w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <Image
                      src="https://prod-assets.demodrive.tech/video_uploads/landing_page/hero-img-5.png"
                      alt="Listing photo 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Image 2 */}
                  <div className="relative w-1/3 sm:w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <Image
                      src="https://prod-assets.demodrive.tech/video_uploads/landing_page/hero-img2.png"
                      alt="Listing photo 2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Image 3 */}
                  <div className="relative w-1/3 sm:w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <Image
                      src="https://prod-assets.demodrive.tech/video_uploads/landing_page/hero-img-1.png"
                      alt="Listing photo 3"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-center w-12 h-auto sm:w-12 sm:h-12 md:w-24">
                  {/* <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12 text-primary transform rotate-90 sm:rotate-0" /> */}
                  <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
                    <TransformingArrow />
                  </BlurFade>
                </div>

                {/* Right Column - Vertical Video */}
                <div className="w-full max-w-[280px] sm:w-[200px] md:w-[300px] mx-auto">
                  <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border-accent-glow">
                    <video
                      src="https://prod-assets.demodrive.tech/video_uploads/landing_page/6f40a586-b130-401e-bf15-80947d95b74a.mp4"
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

      {/* Feature Section */}
      <div className="py-12" id="features">
        <div className="mx-auto max-w-3xl px-6 relative z-[1]">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
          >
            <div className="flex flex-col gap-2">
              <div>Everything you need to</div>
              <div className="text-accent">grow your reputation</div>
            </div>
          </BlurFade>

          <div className="flex flex-col gap-6">
            {/* Feature Card 1 - horizontal (16:9) */}
            <div className="relative h-[280px] md:h-[450px] overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0">
                <video
                  src="https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+photos+to+motion.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-white mr-2" />
                  <h3 className="font-bold text-xl md:text-2xl text-white">Photos to Motion Magic</h3>
                </div>
                <p className="text-sm md:text-base text-white/90">Take photos of your listing and turn them into a video using AI moving the camera around.</p>
              </div>
            </div>

            {/* Feature Card 2 - vertical (9:16) */}
            {/* <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0">
                <video
                  src="https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+vertical.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
                <div className="flex items-center mb-2">
                  <Share2 className="h-5 w-5 md:h-6 md:w-6 text-white mr-2" />
                  <h3 className="font-bold text-xl md:text-2xl text-white">Vertical Video Format</h3>
                </div>
                <p className="text-sm md:text-base text-white/90">Get more leads with vertical videos that are perfect for YouTube, TikTok, and Instagram.</p>
              </div>
            </div> */}

            {/* Feature Card 3 - horizontal (16:9) */}
            <div className="relative h-[280px] md:h-[350px] overflow-hidden rounded-lg shadow-lg">
              <div className="absolute inset-0">
                <video
                  src="https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+beat+sync.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
                <div className="flex items-center mb-2">
                  <Bell className="h-5 w-5 md:h-6 md:w-6 text-white mr-2" />
                  <h3 className="font-bold text-xl md:text-2xl text-white">Auto sync with Music</h3>
                </div>
                <p className="text-sm md:text-base text-white/90">Automatic syncing of music to the video to make every transition feel perfect.</p>
              </div>
            </div>
          </div>
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

            <Link href={listingShortUrl} className="inline-block">
              <Button
                variant="golden"
                size="xl"
                className="w-[280px]"
              >
                Create Free Tour
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
