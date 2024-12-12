"use client";

import Script from "next/script";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFade from "@/components/magicui/blur-fade";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function AuditMyDocsPage() {
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className="min-h-screen dark bg-background text-foreground">
      <Navigation />

      <div className="relative w-full">
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-24 sm:pt-32 sm:pb-12 lg:px-8">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-center"
            yOffset={8}
            text="Audit my docs!"
          />
          <BlurFadeText
            delay={BLUR_FADE_DELAY * 2}
            className="mt-6 text-lg leading-8 text-muted-foreground text-center"
            text="Fill out this quick form and we'll get back to you shortly."
          />

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <div className="mt-16 bg-card rounded-lg border border-muted p-6 max-w-6xl mx-auto">
              <iframe
                data-tally-src="https://tally.so/embed/nP82a0?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height={500}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="Audit my docs"
                className="bg-transparent"
              ></iframe>

              <Script
                id="tally-js"
                src="https://tally.so/widgets/embed.js"
                onLoad={() => {
                  // @ts-expect-error - Tally is loaded from external script
                  window.Tally.loadEmbeds();
                }}
              />
            </div>
          </BlurFade>
        </div>
      </div>

      <Footer />
    </div>
  );
}
