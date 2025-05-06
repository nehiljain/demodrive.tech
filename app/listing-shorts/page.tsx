'use client';

import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import Footer from '@/components/footer';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import { Button } from '@/components/ui/button';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

// Dynamically import DemoFlow with SSR disabled since ReactFlow needs browser APIs
import { TransformingArrow } from '@/components/ui/transforming-arrow'
import { VideoPlayer } from '@/components/video-player';
import { MagicFeatureCards } from '@/components/magic-features';

export default function ListingShorts() {
  const BLUR_FADE_DELAY = 0.04;
  const listingShortUrl = 'http://app.demodrive.tech/open/listing-shorts';

  // Array of input photos
  const inputPhotos = [
    {
      src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/input-hero-1.jpg',
      alt: 'Listing photo 1'
    },
    {
      src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/input-hero-2.jpg',
      alt: 'Listing photo 2'
    },
    {
      src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/input-hero-3.jpg',
      alt: 'Listing photo 3'
    },
    {
      src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/input-hero-4.jpg',
      alt: 'Listing photo 4'
    },
    {
      src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/input-hero-5.jpg',
      alt: 'Listing photo 5'
    },
    {
      src: 'https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/input-hero-6.jpg',
      alt: 'Listing photo 6'
    }
  ]

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
                {/* Left Column - Six Images in grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 w-full sm:w-[300px] md:w-[450px] justify-center">
                  {inputPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-muted/50 shadow-lg"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ))}
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
                    <VideoPlayer
                      src="https://prod-assets.demodrive.tech/video_uploads/landing_page/dori/fullvideo-voiceover-muted-compressed.mp4"
                      aspectRatio="aspect-[9/16]"
                    />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Video Showcase Section */}
      {/* <div className="w-full py-12">
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
      </div> */}

      {/* Feature Section */}
      <div className="py-12" id="features">
        <div className="mx-auto max-w-5xl px-6 relative z-[1]">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
          >
            <div className="flex flex-col gap-2">
              <div>Everything you need to</div>
              <div className="text-accent">grow your reputation</div>
            </div>
          </BlurFade>
          <MagicFeatureCards/>
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
