"use client";

import { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import BlurFade from "@/components/magicui/blur-fade";

// Animation components
import {
  BounceReveal,
  DirectionalBlurReveal,
  FadeReveal,
  TypewriterReveal,
  UnderlineReveal,
  LogoReveal,
  RectangleStackReveal,
  D3BarChart,
  D3LineChart,
} from "@/components/remotion-src/components/animations";

interface AnimationItem {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<unknown>;
  demoProps: Record<string, unknown>;
  category: string;
}

// Animation wrapper component
const AnimationWrapper = ({
  component,
  demoProps
}: {
  component: React.ComponentType<unknown>;
  demoProps: Record<string, unknown>;
}) => {
  return (
    <Player
      component={component}
      durationInFrames={150}
      compositionWidth={400}
      compositionHeight={225}
      fps={30}
      controls
      autoPlay
      loop
      style={{
        width: "100%",
        height: "100%",
      }}
      inputProps={demoProps}
    />
  );
};

export default function AnimationShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Animation data with demo props for each component
  const animations: AnimationItem[] = [
    {
      id: "bounce-reveal",
      name: "Bounce Reveal",
      description: "A dynamic bouncing text reveal with physics-based animation",
      component: BounceReveal as React.ComponentType<unknown>,
      demoProps: {
        text: "BOUNCE IN",
        fontSize: 40,
        primaryColor: "#ffffff",
        backgroundColor: "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800",
      },
      category: "text",
    },
    {
      id: "directional-blur",
      name: "Directional Blur Reveal",
      description: "Text reveal with directional motion blur effect",
      component: DirectionalBlurReveal as React.ComponentType<unknown>,
      demoProps: {
        text: "Blur Reveal...",
        fontSize: 40,
        primaryColor: "#ffffff",
        backgroundColor: "bg-gradient-to-br from-purple-600 to-blue-700",
        containerWidth: 1200,
        lineHeight: 1.2,
        direction: "left",
      },
      category: "text",
    },
    {
      id: "fade-reveal",
      name: "Fade Reveal",
      description: "Simple fade-in text animation with customizable timing",
      component: FadeReveal as React.ComponentType<unknown>,
      demoProps: {
        text: "Fade In Text",
        fontSize: 40,
        primaryColor: "#ffffff",
        backgroundColor: "#2563eb",
        containerWidth: 600,
      },
      category: "text",
    },
    {
      id: "typewriter",
      name: "Typewriter Reveal",
      description: "Text typing effect with cursor animation",
      component: TypewriterReveal as React.ComponentType<unknown>,
      demoProps: {
        text: "Typing effect...",
        fontSize: 40,
        primaryColor: "#ffffff",
        backgroundColor: "bg-gray-900",
        containerWidth: 600,
        lineHeight: 1.2,
        typingSpeed: 2,
        showCursor: true,
        cursorColor: "#ffffff",
      },
      category: "text",
    },
    // {
    //   id: "metric-reveal",
    //   name: "Metric Reveal",
    //   description: "Animated counter for revealing numeric metrics",
    //   component: MetricReveal,
    //   demoProps: {
    //     startNumber: 0,
    //     endNumber: 1000,
    //     fontSize: 40,
    //     labelText: "",
    //     textColor: "#ffffff",
    //     backgroundColor: "bg-gradient-to-br from-blue-600 to-indigo-800",
    //     durationInFrames: 60,
    //   },
    //   category: "data",
    // },
    // {
    //   id: "video-zoom-reveal",
    //   name: "Video Zoom Reveal",
    //   description: "Dynamic video playback with smooth zoom effects",
    //   component: VideoZoomReveal,
    //   demoProps: {
    //     videoUrl: "https://storage.googleapis.com/demodrive-media/20250129/output/examples_coagents_research_canvas_ui_vercel_app__2025_01_29_201642/screen_recording.mp4",
    //     containerWidth: 400,
    //     containerHeight: 225,
    //     backgroundColor: "#03001C",
    //     volume: 0,
    //     playbackRate: 1,
    //   },
    //   category: "media",
    // },
    {
        id: "rectangle-stack",
        name: "Rectangle Stack Reveal",
        description: "Animated stacking rectangles reveal effect",
        component: RectangleStackReveal as React.ComponentType<unknown>,
        demoProps: {
            rectangleColor: "#3b82f6",
            rectangleWidth: 300,
            rectangleHeight: 40,
            numberOfRectangles: 3,
            spacing: 10,
            backgroundColor: "#111827",
            initialWipeDuration: 15,
            delayAfterWipe: 5,
            expansionDuration: 20,
            collapseDuration: 20,
            holdDuration: 20,
            marginTop: 20,
            containerWidth: 300,
            springConfig: {
                damping: 10,
                mass: 1,
                stiffness: 100,
                restSpeed: 0.001,
            },
            width: 400,
            height: 225,
        },
      category: "misc",
    },
      {
          id: "underline-reveal",
          name: "Underline Reveal",
          description: "Text with animated underline highlighting effect",
          component: UnderlineReveal as React.ComponentType<unknown>,
          demoProps: {
              text: "Highlight important words in your text",
              highlightWords: ["important", "words"],
              fontSize: 40,
              primaryColor: "#000000",
              backgroundColor: "bg-white",
              containerWidth: 600,
              lineHeight: 1.3,
              underlineColor: "#3b82f6",
              isHighlight: true,
          },
          category: "text",
      },
    {
      id: "logo-reveal",
      name: "Logo Reveal",
      description: "Animated logo reveal with company name and tagline",
      component: LogoReveal as React.ComponentType<unknown>,
      demoProps: {
        logo: {
          src: "/logo.svg",
          size: 80,
        },
        companyName: {
          text: "Company Name",
          fontSize: 40,
          color: "#FFFFFF",
        },
        tagline: {
          lines: ["Your awesome tagline"],
          fontSize: 24,
          color: "#FFFFFF",
        },
        backgroundColor: "bg-secondary",
        containerWidth: 600,
      },
      category: "media",
    },
    // {
    //       id: "opacity-flash",
    //       name: "Opacity Flash Reveal",
    //       description: "Text reveal with flashing opacity effect",
    //       component: OpacityFlashReveal as React.ComponentType<unknown>,
    //       demoProps: {
    //           text: "Flash Text",
    //           fontSize: 40,
    //           primaryColor: "#ffffff",
    //           backgroundColor: "bg-gradient-to-br from-red-600 to-purple-700",
    //           containerWidth: 600,
    //           lineHeight: 1.2,
    //           flashSpeed: 8,
    //       },
    //       category: "text",
    //   },
      {
          id: "d3-bar-chart",
          name: "D3 Bar Chart",
          description: "Animated data visualization using D3.js bar charts",
          component: D3BarChart as React.ComponentType<unknown>,
          demoProps: {
              data: [
                  { label: "Category A", value: 0.45 },
                  { label: "Category B", value: 0.32 },
                  { label: "Category C", value: 0.28 },
                  { label: "Category D", value: 0.15 },
              ],
          },
          category: "data",
      },
      {
          id: "d3-line-chart",
          name: "D3 Line Chart",
          description: "Animated line chart for time-series data visualization",
          component: D3LineChart as React.ComponentType<unknown>,
          demoProps: {
              lines: [
                  {
                      data: Array.from({ length: 20 }, (_, i) => ({
                          x: i,
                          y: Math.sin(i * 0.5) * 50 + 100,
                      })),
                      color: "#3b82f6",
                      strokeWidth: 3,
                      label: "Sine Wave",
                  },
              ],
              config: {
                  yDomain: [0, 200],
                  animationDuration: 60,
                  delay: 5,
                  backgroundColor: "#f8fafc",
                  title: {
                      text: "Data Trend",
                      fontSize: 16,
                  },
                  xLabel: {
                      text: "Time",
                  },
                  yLabel: {
                      text: "Value",
                  },
                  springConfig: {
                      mass: 0.8,
                      damping: 80,
                  },
                  referenceLines: [
                      {
                          y: 100,
                          color: "#ef4444",
                          label: "Baseline",
                          startFrame: 10,
                      },
                  ],
              },
          },
          category: "data",
      }
  ];

  useEffect(() => {
    // Simulate loading animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter animations by category if selected
  const filteredAnimations = selectedCategory
    ? animations.filter((anim) => anim.category === selectedCategory)
    : animations;

  // Categories for filtering
  const categories = [
    { id: "text", name: "Text Animations" },
    { id: "data", name: "Data Visualizations" },
    { id: "media", name: "Media Animations" },
    { id: "misc", name: "Miscellaneous" },
  ];

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => handleCategorySelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Animation grid with loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-56 bg-muted relative overflow-hidden">
                <div className="w-full h-full animate-pulse bg-muted-foreground/20"></div>
              </div>
              <div className="p-6">
                <div className="animate-pulse bg-muted-foreground/20 h-4 w-16 rounded mb-2"></div>
                <div className="animate-pulse bg-muted-foreground/20 h-6 w-3/4 rounded mb-2"></div>
                <div className="animate-pulse bg-muted-foreground/20 h-4 w-full rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAnimations.map((animation, index) => (
            <BlurFade key={animation.id} delay={0.05 * index}>
              <div className="bg-card rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 group">
                {/* Animation preview */}
                <div className="h-56 bg-muted relative overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full" style={{ maxWidth: "100%", maxHeight: "100%" }}>
                    <AnimationWrapper
                      component={animation.component}
                      demoProps={animation.demoProps}
                    />
                  </div>
                </div>

                {/* Animation details */}
                <div className="p-6">
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        animation.category === "text"
                          ? "bg-primary/10 text-primary"
                          : animation.category === "data"
                          ? "bg-accent text-accent-foreground"
                          : animation.category === "media"
                          ? "bg-secondary/80 text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {animation.category}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-card-foreground">
                    {animation.name}
                  </h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {animation.description}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      )}
    </div>
  );
}
