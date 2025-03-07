import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";
import { AVAILABLE_FONTS, FontFamily } from "../../../shared/fonts";

// Schema for DirectionalBlurReveal props
export const directionalBlurRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  fontSize: z.number().default(120),
  primaryColor: z.string().default("#ffffff"),
  backgroundColor: z
    .string()
    .default("bg-gradient-to-br from-indigo-500 to-purple-600"),
  containerWidth: z.number().default(800),
  lineHeight: z.number().default(1.2),
  fontFamily: z
    .enum(Object.keys(AVAILABLE_FONTS) as [FontFamily, ...FontFamily[]])
    .default("Montserrat"),
  direction: z.enum(["left", "right", "top", "bottom"]).default("left"),
  blurAmount: z.number().default(15),
  animationDuration: z.number().default(30),
  easing: z.boolean().default(true),
});

type DirectionalBlurRevealProps = z.infer<typeof directionalBlurRevealSchema>;

export const DirectionalBlurReveal: React.FC<DirectionalBlurRevealProps> = ({
  text,
  fontSize,
  primaryColor,
  backgroundColor,
  containerWidth,
  lineHeight,
  fontFamily = "Montserrat",
  direction = "left",
  blurAmount = 15,
  animationDuration = 30,
  easing = true,
}) => {
  const frame = useCurrentFrame();

  // Calculate progress with optional easing
  const progress = easing
    ? interpolate(frame, [0, animationDuration], [0, 1], {
        extrapolateRight: "clamp",
        easing: (t) => t * (2 - t), // Ease-in-out
      })
    : interpolate(frame, [0, animationDuration], [0, 1], {
        extrapolateRight: "clamp",
      });

  // Calculate transform based on direction
  const getTransform = () => {
    const distance =
      direction === "left" || direction === "right"
        ? containerWidth
        : fontSize * 3;
    const start =
      direction === "right" || direction === "bottom" ? distance : -distance;
    const end = 0;

    const offset = interpolate(progress, [0, 1], [start, end]);

    switch (direction) {
      case "left":
      case "right":
        return `translateX(${offset}px)`;
      case "top":
      case "bottom":
        return `translateY(${offset}px)`;
    }
  };

  // Calculate blur effect
  const blur = interpolate(
    progress,
    [0, 0.7, 1],
    [blurAmount, blurAmount / 3, 0],
    {
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill className={backgroundColor}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: containerWidth,
            color: primaryColor,
            fontSize,
            lineHeight,
            fontFamily: AVAILABLE_FONTS[fontFamily],
            textAlign: "center",
            whiteSpace: "pre-line",
            fontWeight: "bold",
            transform: getTransform(),
            filter: `blur(${blur}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "directional-blur-reveal",
  name: "Directional Blur Reveal",
  description: "A text reveal animation with directional blur effect",
  component: DirectionalBlurReveal as React.FC<unknown>,
  schema: directionalBlurRevealSchema,
  defaultProps: {
    text: "BLUR REVEAL",
    fontSize: 120,
    primaryColor: "#ffffff",
    backgroundColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
    containerWidth: 800,
    lineHeight: 1.2,
    fontFamily: "Montserrat",
    direction: "left",
    blurAmount: 15,
    animationDuration: 30,
    easing: true,
  },
  category: "Text Animations",
  thumbnail: "/thumbnails/directional-blur-reveal.png",
});
