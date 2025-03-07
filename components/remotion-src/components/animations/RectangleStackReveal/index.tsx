import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  Audio,
  staticFile,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";

// Helper function to convert Tailwind gradient to CSS
const convertTailwindToCSS = (gradientString: string) => {
  if (gradientString.includes("bg-gradient-to-br")) {
    // Extract colors from the Tailwind string
    const fromColor = gradientString.match(/from-([^\s]+)/)?.[1];
    const toColor = gradientString.match(/to-([^\s]+)/)?.[1];

    // Convert Tailwind colors to CSS colors
    const colorMap: Record<string, string> = {
      "red-600": "#dc2626",
      "orange-700": "#c2410c",
      "blue-600": "#2563eb",
      "purple-800": "#6b21a8",
      "pink-500": "#ec4899",
      "purple-600": "#9333ea",
      "indigo-500": "#6366f1",
      "cyan-500": "#06b6d4",
      // Add all other colors we might use
      "pink-600": "#db2777",
      "purple-500": "#a855f7",
      "indigo-600": "#4f46e5",
      "blue-500": "#3b82f6",
      "cyan-600": "#0891b2",
    };

    const fromCssColor = colorMap[fromColor || ""] || "#000000";
    const toCssColor = colorMap[toColor || ""] || "#000000";

    return `linear-gradient(135deg, ${fromCssColor}, ${toCssColor})`;
  }
  return gradientString; // Return as-is if not a gradient
};

// Define audio configuration schema
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

// Schema for the RectangleStackReveal props
export const rectangleStackRevealSchema = baseTemplateSchema.extend({
  rectangleColor: z.string(),
  rectangleWidth: z.number(),
  rectangleHeight: z.number(),
  numberOfRectangles: z.number().min(2).max(6),
  spacing: z.number(),
  initialWipeDuration: z.number(),
  delayAfterWipe: z.number(),
  expansionDuration: z.number(),
  collapseDuration: z.number(),
  holdDuration: z.number(),
  marginTop: z.number(),
  containerWidth: z.number(),
  springConfig: z.object({
    damping: z.number(),
    mass: z.number(),
    stiffness: z.number(),
  }),
  audio: audioConfigSchema,
});

type RectangleStackRevealProps = z.infer<typeof rectangleStackRevealSchema>;

export const RectangleStackReveal: React.FC<RectangleStackRevealProps> = ({
  rectangleColor,
  rectangleWidth,
  rectangleHeight,
  numberOfRectangles,
  spacing,
  initialWipeDuration,
  delayAfterWipe,
  expansionDuration,
  collapseDuration,
  holdDuration,
  springConfig,
  backgroundColor,
  marginTop,
  containerWidth,
  audio,
}) => {
  const frame = useCurrentFrame();

  // Convert gradient strings to CSS
  const cssBackgroundColor = convertTailwindToCSS(backgroundColor);
  const cssRectangleColor = convertTailwindToCSS(rectangleColor);

  // Calculate animation phases including initial wipe and delay
  const wipeEnd = initialWipeDuration;
  const delayEnd = wipeEnd + delayAfterWipe;
  const expansionEnd = delayEnd + expansionDuration;
  const holdEnd = expansionEnd + holdDuration;

  // Calculate initial wipe progress
  const wipeProgress = spring({
    frame: Math.min(frame, initialWipeDuration),
    fps: 60,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 120,
    },
    durationInFrames: initialWipeDuration,
  });

  // Generate rectangles
  const rectangles = Array.from({ length: numberOfRectangles }, (_, index) => {
    // Calculate spring progress for expansion, starting after delay
    const expansionProgress = spring({
      frame: Math.max(0, Math.min(frame - delayEnd, expansionDuration)),
      fps: 60,
      config: springConfig,
      durationInFrames: expansionDuration,
    });

    // Calculate spring progress for collapse
    const collapseProgress = spring({
      frame: Math.max(0, frame - holdEnd),
      fps: 60,
      config: springConfig,
      durationInFrames: collapseDuration,
    });

    // Calculate vertical offset with delay
    const targetOffset = index * (rectangleHeight + spacing);
    const currentOffset =
      frame <= delayEnd
        ? 0
        : frame <= expansionEnd
          ? targetOffset * expansionProgress
          : frame >= holdEnd
            ? targetOffset * (1 - collapseProgress)
            : targetOffset;

    // Calculate opacity with delay
    const opacity =
      index === 0 // For the first rectangle
        ? 1 // Always fully visible
        : frame <= delayEnd
          ? 0 // Other rectangles hidden during wipe and delay
          : frame <= expansionEnd
            ? interpolate(
                frame - delayEnd,
                [index * 5, index * 5 + 10],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              )
            : frame >= holdEnd
              ? interpolate(
                  frame - holdEnd,
                  [collapseDuration - 10, collapseDuration],
                  [1, 0],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                )
              : 1;

    // Calculate current width for wipe effect
    const currentWidth =
      index === 0 && frame <= wipeEnd
        ? rectangleWidth * wipeProgress
        : rectangleWidth;

    return {
      y: currentOffset,
      opacity,
      width: currentWidth,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: cssBackgroundColor,
      }}
    >
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
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: marginTop,
          width: containerWidth,
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Render additional rectangles first (they'll be behind) */}
          {rectangles.slice(1).map((rect, index) => (
            <div
              key={index + 1}
              style={{
                position: "absolute",
                width: rect.width,
                height: rectangleHeight,
                background: cssRectangleColor,
                opacity: rect.opacity,
                transform: `translateY(${rect.y}px)`,
                transition: "transform 0.1s ease-out",
                borderRadius: 8,
                left: "50%",
                marginLeft: -(rectangleWidth / 2),
                zIndex: 1,
              }}
            />
          ))}
          {/* Render first rectangle last (it'll be on top) */}
          <div
            style={{
              position: "absolute",
              width: rectangles[0].width,
              height: rectangleHeight,
              background: cssRectangleColor,
              opacity: rectangles[0].opacity,
              transform: `translateY(${rectangles[0].y}px)`,
              transition: "transform 0.1s ease-out",
              borderRadius: 8,
              left: "50%",
              marginLeft: -(rectangleWidth / 2),
              zIndex: 2, // Higher z-index to stay on top
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "RectangleStackReveal",
  name: "Rectangle Stack Reveal",
  description:
    "A dynamic animation of stacked rectangles that expand and collapse",
  component: RectangleStackReveal,
  schema: rectangleStackRevealSchema,
  defaultProps: {
    rectangleColor: "#ffffff",
    rectangleWidth: 400,
    rectangleHeight: 100,
    numberOfRectangles: 4,
    spacing: 20,
    initialWipeDuration: 15,
    delayAfterWipe: 10,
    expansionDuration: 30,
    collapseDuration: 30,
    holdDuration: 30,
    marginTop: 40,
    containerWidth: 800,
    backgroundColor:
      "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800",
    springConfig: {
      damping: 12,
      mass: 0.5,
      stiffness: 100,
    },
  },
  category: "Shape Animations",
  // thumbnail: "/thumbnails/rectangle-stack-reveal.png", // You'll need to create this thumbnail
});
