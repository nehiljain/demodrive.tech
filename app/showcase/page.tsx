'use client';

import { useState, useRef, useEffect } from 'react';
import BlurFade from '@/components/magicui/blur-fade';
import Footer from '@/components/footer';
import { AnnouncementBanner } from '@/components/ui/announcement-banner';
import { Button } from '@/components/ui/button';
import React from 'react'
import Link from 'next/link';
import { FileText, Bell, Video, Camera } from 'lucide-react'

// Video loading component with better error handling
const VideoPlayer = ({
  src,
  className = '',
  aspectRatio = 'aspect-video',
  objectFit = 'object-cover'
}: {
  src: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      videoElement.play().catch(() => {
        // Handle any play promise rejection silently
      });
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      console.error(`Error loading video: ${src}`);
    };

    videoElement.load();

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [src]);

  return (
    <div className={`relative ${aspectRatio} w-full h-full overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        className={`w-full h-full ${objectFit}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={src}
      />

      {hasError && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
          <p className="text-sm text-red-400">Failed to load video</p>
        </div>
      )}
    </div>
  );
};

// Gallery videos array
const GALLERY_VIDEOS = [
  {
    title: "Luxury Home Tour",
    description: "Elegant walkthrough of a modern luxury estate",
    video_url: "https://prod-assets.demodrive.tech/renders/b8348627-f4f5-4b0d-a03f-9bfa240de6c1/Dori%2BOrinda%2BRealtor.ca%2B916%2Bcompressed.mp4",
    aspect_ratio: "9/16",
    Icon: Video
  },
  {
    title: "Beachfront Property",
    description: "Stunning oceanview property tour with drone footage",
    video_url: "https://dev-assets.demodrive.tech/renders/a6ce3c29-e096-40e4-9219-f92957f14f24/a6ce3c29-e096-40e4-9219-f92957f14f24.mp4",
    aspect_ratio: "16/9",
    Icon: Camera
  },
  {
    title: "Urban Apartment",
    description: "City living with spectacular skyline views",
    video_url: "https://stage-assets.demodrive.tech/renders/f04ff643-c7eb-40d8-ba8b-fb955f00ae36/f04ff643-c7eb-40d8-ba8b-fb955f00ae36.mp4",
    aspect_ratio: "16/9",
    Icon: Video
  },
  {
    title: "Mountain Retreat",
    description: "Secluded mountain property with panoramic views",
    video_url: "https://stage-assets.demodrive.tech/renders/ef1b0268-64fa-4127-b1e6-72e6cace6e83/ef1b0268-64fa-4127-b1e6-72e6cace6e83.mp4",
    aspect_ratio: "9/16",
    Icon: Video
  },
  {
    title: "Contemporary Estate",
    description: "Modern architectural masterpiece with custom features",
    video_url: "https://prod-assets.demodrive.tech/renders/96434281-5667-433d-809a-67273ad1de05/96434281-5667-433d-809a-67273ad1de05.mp4",
    aspect_ratio: "16/9",
    Icon: Camera
  },
  {
    title: "Garden Paradise",
    description: "Lush landscaped property with outdoor entertainment spaces",
    video_url: "https://prod-assets.demodrive.tech/renders/43331d38-62d4-4d41-84ff-79a7a5c99a37/43331d38-62d4-4d41-84ff-79a7a5c99a37.mp4",
    aspect_ratio: "16/9",
    Icon: Video
  },
  {
    title: "Real Estate MLS Listing",
    description: "Professionally edited video for real estate listings",
    Icon: FileText,
    aspect_ratio: "16/9",
    video_url: "https://dev-assets.demodrive.tech/video_assets/real-estate-mls-listing/Real+Estate+Video+Re+Music.mp4"
  },
  {
    video_url: "https://dev-assets.demodrive.tech/20250212/output/Cravd_-_How_to_create_custom_menu_20250212_132853/CravdHowToCreateCustomMenu.mp4",
    title: "Custom Menu Creation",
    description: "Step-by-step guide to creating a custom menu",
    Icon: Bell,
    aspect_ratio: "16/9"
  }
];

export default function GalleryPage() {
  const BLUR_FADE_DELAY = 0.04;
  const listingShortUrl = 'http://app.demodrive.tech/open/listing-shorts';

  return (
    <div className="min-h-screen dark text-foreground overflow-hidden bg-radial-fancy">
      {/* Hero Section */}
      <div className="relative w-full py-6">
        <div className="mx-auto max-w-6xl px-6 relative z-[1]">
          {/* Hero Content */}
          <div className="text-center mt-20 lg:mt-24">
            <BlurFade delay={BLUR_FADE_DELAY * 0.5} yOffset={8}>
              <AnnouncementBanner />
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 relative z-[1]">
          <BlurFade
            delay={BLUR_FADE_DELAY * 7}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12 text-center"
          >
            <h2>
              <span className="text-accent">Showcase</span>
            </h2>
          </BlurFade>

          {/* Custom Bento Grid Gallery */}
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {GALLERY_VIDEOS.map((video, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl border border-accent/20 shadow-md hover:shadow-xl transition-all duration-300 ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto" : "aspect-[4/3]"
                }`}
              >
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                  <VideoPlayer
                    src={video.video_url}
                    aspectRatio=""
                  />
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl md:text-2xl text-white">{video.title}</h3>
                    <video.Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <p className="text-sm md:text-base text-white/90">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section */}


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
