import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Audio,
  staticFile,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { AVAILABLE_FONTS, FontFamily } from "../../../shared/fonts";
import { registerAnimation } from "../registry";

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

// Schema for BounceReveal specific props
export const bounceRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  fontSize: z.number().default(140),
  primaryColor: z.string().default("#ffffff"),
  backgroundColor: z
    .string()
    .default("bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"),
  stiffness: z.number().default(100),
  damping: z.number().default(10),
  mass: z.number().default(0.5),
  startY: z.number().default(-100),
  overshoot: z.boolean().default(true),
  containerWidth: z.number().default(800),
  lineHeight: z.number().default(1.2),
  // Font selection
  fontFamily: z
    .enum(Object.keys(AVAILABLE_FONTS) as [FontFamily, ...FontFamily[]])
    .default("Montserrat"),
  audio: audioConfigSchema,
});

type BounceRevealProps = z.infer<typeof bounceRevealSchema>;

const BounceReveal: React.FC<BounceRevealProps> = ({
  text,
  fontSize = 140,
  primaryColor = "#ffffff",
  backgroundColor = "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800",
  stiffness = 100,
  damping = 10,
  mass = 0.5,
  startY = -100,
  overshoot = true,
  containerWidth = 800,
  lineHeight = 1.2,
  fontFamily = "Montserrat",
  audio,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for bounce effect
  const bounce = spring({
    frame,
    fps,
    config: {
      stiffness,
      damping,
      mass,
    },
  });

  // Interpolate Y position with optional overshoot
  const translateY = overshoot
    ? interpolate(bounce, [0, 0.7, 1], [startY, 10, 0], {
        extrapolateRight: "clamp",
      })
    : interpolate(bounce, [0, 1], [startY, 0], {
        extrapolateRight: "clamp",
      });

  // Add opacity fade-in
  const opacity = interpolate(bounce, [0, 0.5, 1], [0, 1, 1]);

  // Add slight horizontal movement for more dynamic effect
  const translateX = interpolate(bounce, [0, 1], [-30, 0]);

  const textStyle = {
    fontSize: `${fontSize}px`,
    fontFamily: AVAILABLE_FONTS[fontFamily],
    fontWeight: 900,
    color: primaryColor,
    transform: `translate(${translateX}px, ${translateY}px)`,
    opacity,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as const,
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
    lineHeight: lineHeight,
    maxWidth: `${containerWidth}px`,
    margin: "0 auto",
  };

  return (
    <AbsoluteFill
      className={`${backgroundColor} flex items-center justify-center`}
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
        className="relative flex items-center justify-center"
        style={{ width: `${containerWidth}px` }}
      >
        <div style={textStyle}>{text}</div>
      </div>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "BounceReveal",
  name: "Bounce Reveal",
  description: "A dynamic bouncing text reveal with physics-based animation",
  component: BounceReveal,
  schema: bounceRevealSchema,
  defaultProps: {
    text: "BOUNCE IN",
    fontSize: 140,
    primaryColor: "#ffffff",
    backgroundColor:
      "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800",
    stiffness: 100,
    damping: 10,
    mass: 0.5,
    startY: -100,
    overshoot: true,
    containerWidth: 800,
    lineHeight: 1.2,
    fontFamily: "Montserrat",
  },
  category: "Text Animations",
  thumbnail: "/thumbnails/bounce-reveal.png", // Optional
});

// Export the component as before
export { BounceReveal };
