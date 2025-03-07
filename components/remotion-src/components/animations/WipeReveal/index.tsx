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
import { baseTemplateSchema, TemplateConfig } from "../../../shared/types";
import { AVAILABLE_FONTS, FontFamily } from "../../../shared/fonts";

// Schema for colored word
const coloredWordSchema = z.object({
  word: z.string(),
  color: z.string(),
});

// Schema for WipeReveal specific props
export const wipeRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  direction: z
    .enum(["left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top"])
    .default("left-to-right"),
  fontSize: z.number().default(140),
  primaryColor: z.string().default("#1e293b"),
  backgroundColor: z
    .string()
    .default("bg-gradient-to-br from-amber-300 via-orange-400 to-yellow-500"),
  containerWidth: z.number().default(800),
  lineHeight: z.number().default(1.2),
  // Font selection
  fontFamily: z
    .enum(Object.keys(AVAILABLE_FONTS) as [FontFamily, ...FontFamily[]])
    .default("Montserrat"),
  // Animation controls
  startDelay: z.number().default(0),
  springConfig: z
    .object({
      damping: z.number().default(15),
      mass: z.number().default(0.8),
      stiffness: z.number().default(100),
    })
    .default({}),
  duration: z.number().default(30),
  coloredWords: z.array(coloredWordSchema).optional(),
  audio: z
    .object({
      src: z.string(),
      volume: z.number().optional(),
      playbackRate: z.number().optional(),
      startFrom: z.number().optional(),
      endAt: z.number().optional(),
      muted: z.boolean().optional(),
      loop: z.boolean().optional(),
    })
    .optional(),
});

type WipeRevealProps = z.infer<typeof wipeRevealSchema>;

export const WipeReveal: React.FC<WipeRevealProps> = ({
  text,
  fontSize = 140,
  primaryColor = "#1e293b",
  backgroundColor = "bg-gradient-to-br from-amber-300 via-orange-400 to-yellow-500",
  containerWidth = 800,
  lineHeight = 1.2,
  fontFamily = "Montserrat",
  startDelay = 0,
  springConfig = {
    damping: 15,
    mass: 0.8,
    stiffness: 100,
  },
  duration = 30,
  coloredWords = [],
  audio,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Calculate progress with configurable delay and duration
  const progress = spring({
    frame: Math.max(0, frame - startDelay),
    fps,
    config: {
      damping: springConfig.damping,
      mass: springConfig.mass,
      stiffness: springConfig.stiffness,
    },
    durationInFrames: duration,
  });

  // Calculate dimensions
  const cursorHeight = fontSize * lineHeight * 3;
  const cursorWidth = 12;
  const cursorGlowWidth = 100;

  // Calculate text container dimensions
  const textStyle = {
    fontSize: `${fontSize}px`,
    fontFamily: AVAILABLE_FONTS[fontFamily],
    fontWeight: 900,
    textAlign: "center" as const,
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
    lineHeight: lineHeight,
    userSelect: "none" as const,
    maxWidth: `${containerWidth}px`,
    margin: "0 auto",
  };

  // Calculate cursor position based on progress
  const cursorProgress = interpolate(progress, [0, 1], [0, 100]);
  const cursorX = interpolate(
    cursorProgress,
    [0, 100],
    [-cursorWidth, width + cursorWidth],
  );

  // Function to render text with colored words
  const renderColoredText = () => {
    if (!coloredWords || coloredWords.length === 0) {
      return text;
    }

    // Create a map of words to their colors for efficient lookup
    const colorMap = new Map(
      coloredWords.map(({ word, color }) => [word, color]),
    );

    // Split the text into words while preserving whitespace and newlines
    return text.split(/(\s+)/).map((word, index) => {
      const color = colorMap.get(word);
      return (
        <span
          key={index}
          style={{
            color: color || primaryColor,
            display: "inline",
          }}
        >
          {word}
        </span>
      );
    });
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
      <div className="relative flex items-center justify-center w-full overflow-hidden">
        {/* Cursor effect */}
        <div
          className="absolute"
          style={{
            left: `${cursorX}px`,
            width: `${cursorWidth}px`,
            height: `${cursorHeight}px`,
            background:
              "linear-gradient(to right, transparent, #f8fafc, transparent)",
            boxShadow: "0 0 30px 8px rgba(248, 250, 252, 0.5)",
            filter: "blur(2px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            opacity: frame > startDelay ? 1 : 0,
          }}
        />

        {/* Trailing effect */}
        <div
          className="absolute"
          style={{
            left: `${cursorX - cursorGlowWidth / 2}px`,
            width: `${cursorGlowWidth}px`,
            height: `${cursorHeight}px`,
            background:
              "linear-gradient(to right, transparent, rgba(248, 250, 252, 0.2), transparent)",
            filter: "blur(8px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 9,
            opacity: frame > startDelay ? 1 : 0,
          }}
        />

        {/* Text container */}
        <div className="relative" style={{ width: `${containerWidth}px` }}>
          {/* Revealed text */}
          <div
            className="relative"
            style={{
              ...textStyle,
              clipPath: `inset(0 ${100 - cursorProgress}% 0 0)`,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {renderColoredText()}
          </div>

          {/* Outline text (background) */}
          <div
            className="absolute inset-0"
            style={{
              ...textStyle,
              WebkitTextStroke: `2px ${primaryColor}`,
              color: "transparent",
              filter: "blur(1px)",
              clipPath: `inset(0 0 0 ${cursorProgress}%)`,
              opacity: 0.7,
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Export template configuration
export const templateConfig: TemplateConfig = {
  id: "WipeReveal",
  name: "Wipe Reveal",
  description: "A sleek text reveal animation with a wipe effect",
  component: WipeReveal as React.FC<unknown>,
  schema: wipeRevealSchema,
  defaultProps: {
    text: "WELCOME",
    direction: "left-to-right",
    fontSize: 140,
    primaryColor: "#1e293b",
    backgroundColor:
      "bg-gradient-to-br from-amber-300 via-orange-400 to-yellow-500",
    containerWidth: 800,
    lineHeight: 1.2,
    fontFamily: "Montserrat",
    startDelay: 0,
    springConfig: {
      damping: 15,
      mass: 0.8,
      stiffness: 100,
    },
    duration: 30,
  },
};
