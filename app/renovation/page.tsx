'use client';

import BlurFade from '@/components/magicui/blur-fade';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import Footer from '@/components/footer';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import React from 'react'
import Image from 'next/image';
import { VideoPlayer } from '@/components/video-player';
import { Upload } from 'lucide-react'
import { TransformingArrow } from '@/components/ui/transforming-arrow'
import { MagicFeatureCards } from '@/components/magic-features';
import { CalendarButton } from '@/components/calendar-popup';

export default function RenovationPage() {
  const BLUR_FADE_DELAY = 0.04;

  // Example renovation images from user uploads
  const beforeImages = [
    'https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/491449036_18169053001331084_8012714954802911901_n.jpg',
    'https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/490070110_18169053019331084_900180217511141331_n.jpg',
    'https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/491442021_18169053040331084_7104822397698813303_n.jpg'
  ];

  const afterImages = [
    'https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/491218931_18169053010331084_1044311958877831873_n.jpg',
    'https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/491386866_18169053028331084_4187264279583180493_n.jpg',
    'https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/491447848_18169053049331084_4678535619958897805_n.jpg',
  ];



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
                Turn photos into <span className="text-accent">Before/After Videos</span>
              </h2>
            </BlurFade>
            <BlurFadeText
              delay={BLUR_FADE_DELAY * 2}
              className="mt-6 text-lg leading-8 text-[#DFC8AF]"
              text="With AI. No editing required."
            />

            <BlurFade delay={BLUR_FADE_DELAY * 3} className="mt-8">
              <CalendarButton />
            </BlurFade>

            {/* Image to Video Transformation Section - Renovation Before/After */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="mt-16 flex flex-col sm:flex-row gap-4 sm:gap-8 max-w-6xl mx-auto items-center justify-center px-1 sm:px-4">
                {/* Left Column - Before Images */}
                <div className="flex flex-col gap-2 w-full sm:w-[240px] md:w-[420px]">
                  <div className="text-sm font-medium text-accent mb-2">Before Photos</div>
                  <div className="grid grid-cols-3 gap-2">
                    {beforeImages.map((img, index) => (
                      <div key={`before-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                        <Image
                          src={`${img}`}
                          alt={`Before renovation ${index + 1}`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-sm font-medium text-accent mt-4 mb-2">After Photos</div>
                  <div className="grid grid-cols-3 gap-2">
                    {afterImages.map((img, index) => (
                      <div key={`after-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                        <Image
                          src={`${img}`}
                          alt={`After renovation ${index + 1}`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 justify-center mt-2 text-sm text-muted-foreground">
                    <Upload size={14} />
                    <span>Upload your before/after photos</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-center w-12 h-auto sm:w-12 sm:h-12 md:w-24">
                  <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
                    <TransformingArrow />
                  </BlurFade>
                </div>

                {/* Right Column - Output Video */}
                <div className="w-full max-w-[280px] sm:w-[240px] md:w-[300px] mx-auto">
                  <div className="text-sm font-medium text-accent mb-2">AI-Generated Video</div>
                  <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden border-accent-glow">
                    <VideoPlayer
                      src="https://prod-assets.demodrive.tech/renders/8e383b71-297e-4a8b-9f73-cf0d082a96f5/renovationsx-copy_916.mp4"
                      aspectRatio="aspect-[9/16]"
                    />
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12" id="features">
        <div className="mx-auto max-w-5xl px-6 relative z-[1]">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
          >
            <div className="flex flex-col gap-2">
              <div>Everything you need to</div>
              <div className="text-accent">showcase your renovations</div>
            </div>
          </BlurFade>
          <MagicFeatureCards />
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

            <CalendarButton/>
          </div>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
