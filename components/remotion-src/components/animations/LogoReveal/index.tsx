import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";

// Schema for colored word
const coloredWordSchema = z.object({
  word: z.string(),
  color: z.string(),
});

// Schema for audio configuration
const audioConfigSchema = z
  .object({
    src: z.string(),
    volume: z.number().optional(),
    playbackRate: z.number().optional(),
    startFrom: z.number().optional(),
    endAt: z.number().optional(),
    muted: z.boolean().optional(),
    loop: z.boolean().optional(),
  })
  .optional();

// Schema for LogoReveal props
export const logoRevealSchema = baseTemplateSchema.extend({
  logo: z.object({
    src: z.string(),
    size: z.number(),
    backgroundColor: z.string().optional(),
  }),
  companyName: z.object({
    text: z.string(),
    fontSize: z.number(),
    color: z.string(),
    coloredWords: z.array(coloredWordSchema).optional(),
  }),
  tagline: z.object({
    lines: z.array(z.string()),
    fontSize: z.number(),
    color: z.string(),
    coloredWords: z.array(coloredWordSchema).optional(),
  }),
  backgroundColor: z.string(),
  containerWidth: z.number(),
  fontFamily: z.string().optional(),
  audio: audioConfigSchema,
});

type LogoRevealProps = z.infer<typeof logoRevealSchema>;

// Helper function to render text with colored words
const renderColoredText = (
  text: string,
  defaultColor: string,
  coloredWords: { word: string; color: string }[] = [],
) => {
  if (!coloredWords || coloredWords.length === 0) {
    return text;
  }

  // Create a map of words to their colors for efficient lookup
  const colorMap = new Map(
    coloredWords.map(({ word, color }) => [word, color]),
  );

  // Split the text into words while preserving whitespace
  return text.split(/(\s+)/).map((word, index) => {
    const color = colorMap.get(word);
    return (
      <span
        key={index}
        style={{
          color: color || defaultColor,
          display: "inline",
        }}
      >
        {word}
      </span>
    );
  });
};

export const LogoReveal: React.FC<LogoRevealProps> = ({
  logo,
  companyName,
  tagline,
  backgroundColor,
  containerWidth,
  fontFamily = "Montserrat",
  audio,
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for logo
  const logoScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
    },
  });

  // Fade in animation for company name
  const nameOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in animation for tagline
  const taglineOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {audio && (
        <Audio
          loop={audio.loop}
          src={staticFile(audio.src)}
          volume={audio.volume}
          playbackRate={audio.playbackRate}
          startFrom={audio.startFrom}
          endAt={audio.endAt}
          muted={audio.muted}
        />
      )}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Logo and Company Name Container */}
        <div className="flex items-center mb-12 gap-4">
          {/* Logo */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              marginBottom: "30px",
            }}
          >
            <img
              src={staticFile(logo.src)}
              alt="Logo"
              style={{
                width: logo.size,
                height: logo.size,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Company Name */}
          <div
            style={{
              opacity: nameOpacity,
              fontSize: companyName.fontSize,
              color: companyName.color,
              fontFamily,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {renderColoredText(
              companyName.text,
              companyName.color,
              companyName.coloredWords,
            )}
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-col items-center gap-2">
          {tagline.lines.map((line, index) => (
            <div
              key={index}
              style={{
                opacity: taglineOpacity,
                fontSize: tagline.fontSize,
                color: tagline.color,
                fontFamily,
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              {renderColoredText(line, tagline.color, tagline.coloredWords)}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Example configuration
export const templateConfig = {
  id: "LogoReveal",
  name: "Logo Reveal",
  description: "Animated logo reveal with company name and tagline",
  component: LogoReveal,
  schema: logoRevealSchema,
  defaultProps: {
    logo: {
      src: "logo.png",
      size: 120,
      backgroundColor: "#000000",
    },
    companyName: {
      text: "AGENTGPT",
      fontSize: 72,
      color: "#000000",
    },
    tagline: {
      lines: ["Go to thelevel.ai/agentgpt", "Get a demo today!"],
      fontSize: 32,
      color: "#666666",
    },
    backgroundColor: "bg-white",
    containerWidth: 800,
    fontFamily: "Montserrat",
    width: 1920,
    height: 1080,
    fps: 60,
    durationInFrames: 180,
  },
};
