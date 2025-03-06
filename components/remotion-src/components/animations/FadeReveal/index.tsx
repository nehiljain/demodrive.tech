import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { registerAnimation } from "../registry";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { AVAILABLE_FONTS, FontFamily } from "../../../shared/fonts";

// Define schema for FadeReveal props
export const fadeRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  fontSize: z.number(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  width: z.number(),
  height: z.number(),
  fps: z.number(),
  durationInFrames: z.number(),
  containerWidth: z.number(),
  lineHeight: z.number(),
  fontFamily: z
    .enum(Object.keys(AVAILABLE_FONTS) as [FontFamily, ...FontFamily[]])
    .default("Montserrat"),
  fadeInDuration: z.number(),
  fadeOutDuration: z.number(),
  holdDuration: z.number(),
  textAlign: z.enum(["left", "center", "right"]),
  fontWeight: z.union([z.number(), z.string()]),
  isLight: z.boolean(),
});

type FadeRevealProps = z.infer<typeof fadeRevealSchema>;

const FadeReveal: React.FC<FadeRevealProps> = ({
  text,
  fontSize = 100,
  primaryColor,
  backgroundColor,
  width = 1920,
  height = 1080,
  fps = 60,
  durationInFrames = 60,
  containerWidth = 1600,
  lineHeight = 1.2,
  fontFamily = "Montserrat",
  fadeInDuration = 15,
  fadeOutDuration = 15,
  holdDuration = 30,
  textAlign = "center",
  fontWeight = "bold",
  isLight = false,
}) => {
  const frame = useCurrentFrame();

  // Calculate opacity for fade in and out
  const opacity = interpolate(
    frame,
    [0, fadeInDuration, durationInFrames - fadeOutDuration, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: containerWidth,
          textAlign,
          opacity,
        }}
      >
        <h1
          style={{
            color: primaryColor,
            fontSize,
            lineHeight,
            fontFamily,
            margin: 0,
            fontWeight,
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </h1>
      </div>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "FadeReveal",
  name: "Fade Reveal",
  description: "A smooth fade-in text reveal animation",
  component: FadeReveal,
  schema: fadeRevealSchema,
  defaultProps: {
    text: "FADE IN",
    fontSize: 120,
    primaryColor: "#ffffff",
    backgroundColor: "bg-gradient-to-br from-blue-500 to-purple-600",
    containerWidth: 1600,
    lineHeight: 1.2,
    fontFamily: "Montserrat",
    fadeInDuration: 15,
    fadeOutDuration: 15,
    holdDuration: 30,
    textAlign: "center",
    fontWeight: "bold",
    isLight: false,
    durationInFrames: 60,
  },
  category: "Text Animations",
  thumbnail: "/thumbnails/fade-reveal.png",
});

// Export the component as before
export { FadeReveal };
