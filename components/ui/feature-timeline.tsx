"use client"

import { FC } from 'react'
import BlurFade from '@/components/magicui/blur-fade'
import BlurFadeText from '@/components/magicui/blur-fade-text'
import Image from 'next/image'

interface FeatureItem {
  title: string
  description: string
  media: {
    type: 'video' | 'image'
    src: string
    alt?: string
  }
}

interface FeatureTimelineProps {
  features: FeatureItem[]
  baseDelay?: number
  delayIncrement?: number
}

const FeatureTimeline: FC<FeatureTimelineProps> = ({
  features,
  baseDelay = 0.1,
  delayIncrement = 0.2
}) => {
  return (
    <div className="relative mx-auto max-w-6xl px-6">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted/70 -translate-x-1/2"></div>

      {/* Features */}
      <div className="relative">
        {features.map((feature, index) => (
          <BlurFade
            key={index}
            delay={baseDelay + (index * delayIncrement)}
            className="mb-24 last:mb-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {/* Circle marker on timeline */}
              <div className="absolute left-1/2 top-8 w-4 h-4 rounded-full bg-accent -translate-x-1/2 md:block hidden"></div>

              {/* Left side: Text content */}
              <div className="flex flex-col justify-center order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </div>

              {/* Right side: Media content */}
              <div className="rounded-xl overflow-hidden border border-muted order-1 md:order-2 shadow-sm">
                {feature.media.type === 'video' ? (
                  <video
                    src={feature.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <Image
                    src={feature.media.src}
                    alt={feature.media.alt || feature.title}
                    width={800}
                    height={450}
                    className="w-full aspect-video object-cover"
                  />
                )}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default FeatureTimeline
