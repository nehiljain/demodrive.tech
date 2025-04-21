"use client"

import { FC } from 'react'
import BlurFade from '@/components/magicui/blur-fade'
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

const FeatureGrid: FC<FeatureTimelineProps> = ({
  features,
  baseDelay = 0.1,
  delayIncrement = 0.2
}) => {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {features.map((feature, index) => (
          <BlurFade
            key={index}
            delay={baseDelay + (index * delayIncrement)}
          >
            <div className="flex flex-col h-full group hover:translate-y-[-4px] transition-transform duration-300">
              {/* Media content */}
              <div className="rounded-2xl overflow-hidden border border-muted/50 shadow-lg mb-8
                            transition-all duration-300 group-hover:shadow-xl
                            group-hover:border-muted/80">
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

              {/* Text content */}
              <div className="flex flex-col px-2">
                <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent
                             bg-gradient-to-r from-foreground to-foreground/70">
                  {feature.title}
                </h3>
                <p className="text-foreground/90 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

export default FeatureGrid
