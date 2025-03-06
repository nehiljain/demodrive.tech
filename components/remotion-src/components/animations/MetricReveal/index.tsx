import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { AnimatedEmoji } from "@remotion/animated-emoji";

// Helper function to convert Tailwind gradient to CSS
const convertTailwindToCSS = (gradientString: string) => {
  if (gradientString.includes("bg-gradient-to-br")) {
    const fromColor = gradientString.match(/from-([^\s]+)/)?.[1];
    const toColor = gradientString.match(/to-([^\s]+)/)?.[1];

    const colorMap: Record<string, string> = {
      "pink-200": "#fbcfe8",
      "purple-200": "#e9d5ff",
      "violet-200": "#ddd6fe",
    };

    const fromCssColor = colorMap[fromColor || ""] || "#000000";
    const toCssColor = colorMap[toColor || ""] || "#000000";

    return `linear-gradient(135deg, ${fromCssColor}, ${toCssColor})`;
  }
  return gradientString;
};

export const metricRevealSchema = baseTemplateSchema.extend({
  startNumber: z.number().default(0),
  endNumber: z.number().default(111),
  fontSize: z.number().default(180),
  labelText: z.string().default("Replies"),
  labelFontSize: z.number().default(60),
  fontFamily: z.string().default("Inter"),
  textColor: z.string().default("#ffffff"),
  backgroundImage: z.string().default("vertical_bg1.jpg"),
  backgroundColor: z
    .string()
    .default("bg-gradient-to-br from-pink-200 via-purple-200 to-violet-200"),
  emoji: z.string().default("smile"),
  emojiSize: z.number().default(80),
});

type MetricRevealProps = z.infer<typeof metricRevealSchema>;

// Custom easing function with slowdown at the end
const customEasing = (t: number): number => {
  // Fast at start, slow at end
  if (t >= 0.85) {
    // Slow down for last 15%
    return interpolate(t, [0.85, 1], [0.85, 1], {
      easing: (x) => 1 - Math.pow(1 - x, 3),
    });
  }
  // Faster in the middle
  return interpolate(t, [0, 0.85], [0, 0.85], {
    easing: (x) => x * x * (3 - 2 * x),
  });
};

export const MetricReveal: React.FC<MetricRevealProps> = ({
  startNumber,
  endNumber,
  fontSize,
  labelText,
  labelFontSize,
  fontFamily,
  textColor,
  backgroundImage,
  backgroundColor,
  durationInFrames,
  emoji,
  emojiSize,
}) => {
  const frame = useCurrentFrame();
  const cssBackgroundColor = convertTailwindToCSS(backgroundColor);

  // Calculate animation duration (total duration minus pause)
  const animationDuration = durationInFrames - 180;

  // Calculate base progress (only for the animation part)
  const progress = Math.min(frame / animationDuration, 1);
  const easedProgress = customEasing(progress);

  // Calculate current number
  const currentNumber = Math.floor(
    interpolate(easedProgress, [0, 1], [startNumber, endNumber], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const digits = currentNumber.toString().split("");

  return (
    <AbsoluteFill
      style={{
        background: `url(${staticFile(backgroundImage)}) center center / cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          position: "absolute",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.2em",
            fontSize,
            color: textColor,
            fontWeight: "700",
            lineHeight: 1,
          }}
        >
          {digits.map((digit, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                width: "0.7em",
                textAlign: "center",
              }}
            >
              {digit}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "0.5em",
          }}
        >
          <div
            style={{
              fontSize: labelFontSize,
              color: textColor,
              fontWeight: "500",
              opacity: 0.9,
            }}
          >
            {labelText}
          </div>
          <div style={{ position: "relative" }}>
            <AnimatedEmoji
              emoji="yawn"
              size={emojiSize}
              style={{
                display: "block",
                transform: "scale(1.5)",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
