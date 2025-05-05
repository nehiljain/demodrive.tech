'use client';

import BlurFade from '@/components/magicui/blur-fade';
import Footer from '@/components/footer';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import React from 'react'
import { VideoPlayer } from '@/components/video-player';
import { Mic, ScissorsIcon, VideoIcon } from 'lucide-react'
import { CalendarButton } from '@/components/calendar-popup';

export default function PodcastPage() {
  const BLUR_FADE_DELAY = 0.04;
  // Sample podcast video shorts for the grid
  const videoShorts = [
    'https://prod-assets.demodrive.tech/video_uploads/landing_page/alex-short-1-compressed.mp4',
    'https://prod-assets.demodrive.tech/video_uploads/landing_page/alex-short-2-compressed.mp4',
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
                Spend an hour, get <span className="text-accent">10 viral shorts</span>
              </h2>
            </BlurFade>

            {/* <BlurFade delay={BLUR_FADE_DELAY * 3} className="mt-8">
              <ScheduleDemo size="lg" />
            </BlurFade> */}

            {/* 3-Step Process Section */}
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="mt-16 flex flex-col gap-12 max-w-6xl mx-auto">
                {/* Step 1: We come over and capture */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <div className="w-full max-w-md text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">1</div>
                      <h3 className="text-xl flex gap-2 font-bold">We <VideoIcon/> a conversation with you
</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Our team comes to your with professional equipment to record your podcast style interview. Its like having a coffee with a friend while talking about your startup, journey, customers.
                    </p>
                  </div>

                  <div className="w-full max-w-[320px] aspect-video rounded-lg overflow-hidden border border-muted/50 shadow-lg">
                    <div className="relative w-full h-full">
                      {/* <Image
                        src="https://prod-assets.demodrive.tech/video_uploads/landing_page/podcast-recording.jpg"
                        alt="Podcast recording session"
                        fill
                        className="object-cover"
                        priority
                      /> */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Mic className="w-12 h-12 text-white/80" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: We generate a full video */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <div className="w-full max-w-md text-left sm:order-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">2</div>
                      <h3 className="text-xl flex gap-2 font-bold">We <ScissorsIcon/> and publish full episode</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Our AI automatically edits your entire podcast, enhancing audio quality, removing awkward pauses, and creating a polished final product. Ready to post on your YT.
                    </p>
                  </div>

                  <div className="w-full max-w-[320px] aspect-video rounded-lg overflow-hidden border border-muted/50 shadow-lg sm:order-1">
                    <VideoPlayer
                      src="https://prod-assets.demodrive.tech/video_uploads/landing_page/alex-fullvideo-compressed.mp4"
                      aspectRatio="aspect-video"
                    />
                  </div>
                </div>

                {/* Step 3: We generate AI video shorts */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <div className="w-full max-w-md text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">3</div>
                      <h3 className="text-xl font-bold">AI creates viral shorts</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Our AI identifies the most viral worthy moments and automatically creates captioned short-form videos ready for YouTube, Instagram, and TikTok. We also insert B-Roll automatically to keep the user engaged.
                    </p>
                  </div>

                  <div className="w-full max-w-[320px]">
                    <div className="grid grid-cols-2 gap-2">
                      {videoShorts.map((_, index) => (
                        <VideoPlayer key={index} src={videoShorts[index]} aspectRatio="aspect-[9/16]"></VideoPlayer>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      {/* <div className="py-12" id="features">
        <div className="mx-auto max-w-5xl px-6 relative z-[1]">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
          >
            <div className="flex flex-col gap-2">
              <div>Everything you need to</div>
              <div className="text-accent">grow your podcast audience</div>
            </div>
          </BlurFade>
        </div>
      </div> */}

      {/* Bottom CTA Section */}
      <div className="relative py-8">
        <div className="mx-auto max-w-5xl px-6 py-2 sm:py-8 lg:px-8 text-center relative z-[1]">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="space-y-4 mb-10">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-[#f5f2eb]">
                More content,
              </h2>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-[#f5f2eb]">
                more views,
              </h2>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-[#f5f2eb]">
                more listeners.
              </h2>

            </div>

            <CalendarButton />
          </div>
        </div>
      </div>

      {/* Add the Footer */}
      <Footer />
    </div>
  );
}
