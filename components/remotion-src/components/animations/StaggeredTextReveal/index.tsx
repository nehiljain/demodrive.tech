import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  staticFile,
  Sequence,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { Instagram, Youtube, Linkedin, Twitter, Rss } from "lucide-react";

// Schema for icon configuration
const IconConfig = z.object({
  name: z.enum(["instagram", "youtube", "linkedin", "twitter", "rss"]), // Add more icons as needed
  delay: z.number(),
  size: z.number().optional().default(32),
  color: z.string().optional(),
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

// Schema for colored word
const ColoredWordSchema = z.object({
  word: z.string(),
  color: z.string(),
});

// Schema for individual text item with optional icons and colored words
const TextItemSchema = z.object({
  text: z.string(),
  delay: z.number(),
  icons: z.array(IconConfig).optional(),
  coloredWords: z.array(ColoredWordSchema).optional(),
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

export const staggeredTextRevealSchema = baseTemplateSchema.extend({
  texts: z.array(TextItemSchema),
  fontSize: z.number().optional().default(80),
  primaryColor: z.string().optional().default("#000000"),
  backgroundColor: z.string().optional().default("bg-white"),
  containerWidth: z.number().optional().default(800),
  fontFamily: z.string().optional().default("Inter"),
  fontWeight: z.number().optional().default(800),
  springConfig: z
    .object({
      damping: z.number().optional().default(12),
      mass: z.number().optional().default(0.5),
      stiffness: z.number().optional().default(100),
    })
    .optional(),
});

type StaggeredTextRevealProps = z.infer<typeof staggeredTextRevealSchema>;

// Map icon names to components
const IconMap = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  rss: Rss,
  // Add more icons here as needed
};

const Icon: React.FC<{
  name: keyof typeof IconMap;
  frame: number;
  config: ReturnType<typeof useVideoConfig>;
  size?: number;
  color?: string;
  audio?: {
    src: string;
    volume?: number;
    playbackRate?: number;
    startFrom?: number;
    endAt?: number;
    muted?: boolean;
    loop?: boolean;
  };
}> = ({ name, frame, config, size = 32, color, audio }) => {
  const progress = spring({
    frame,
    fps: config.fps,
    config: {
      damping: 8,
      mass: 0.3,
      stiffness: 200,
    },
  });

  const opacity = interpolate(progress, [0, 0.5, 1], [0, 0.8, 1]);
  const scale = interpolate(progress, [0, 0.7, 1], [0.5, 1.2, 1]);
  const IconComponent = IconMap[name];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        margin: "2px 6px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
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
        />
      )}
      <IconComponent size={size} color={color} />
    </div>
  );
};

// Function to render text with colored words
const renderColoredText = (
  text: string,
  coloredWords: { word: string; color: string }[] = [],
  defaultColor: string,
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

const TextContainer: React.FC<{
  text: string;
  icons?: {
    name: keyof typeof IconMap;
    delay: number;
    size?: number;
    color?: string;
    audio?: {
      src: string;
      volume?: number;
      playbackRate?: number;
      startFrom?: number;
      endAt?: number;
      muted?: boolean;
      loop?: boolean;
    };
  }[];
  coloredWords?: { word: string; color: string }[];
  frame: number;
  config: ReturnType<typeof useVideoConfig>;
  springConfig: StaggeredTextRevealProps["springConfig"];
  style: React.CSSProperties;
  audio?: {
    src: string;
    volume?: number;
    playbackRate?: number;
    startFrom?: number;
    endAt?: number;
    muted?: boolean;
    loop?: boolean;
  };
}> = ({
  text,
  icons = [],
  coloredWords = [],
  frame,
  config,
  springConfig,
  style,
  audio,
}) => {
  const progress = spring({
    frame,
    fps: config.fps,
    config: {
      damping: springConfig?.damping ?? 12,
      mass: springConfig?.mass ?? 0.5,
      stiffness: springConfig?.stiffness ?? 100,
    },
  });

  const translateY = interpolate(progress, [0, 1], [200, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Calculate total width needed for icons with proper spacing
  const iconSpacing = 24; // Space between icons
  const totalIconWidth = icons.reduce(
    (total, icon) => total + (icon.size || 32) + iconSpacing,
    0,
  );

  return (
    <div
      style={{
        ...style,
        transform: `translateY(${translateY}px)`,
        opacity,
        padding: "20px 40px",
        position: "absolute",
        transition: "all 0.5s ease-out",
        display: "flex",
        alignItems: "center",
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
        />
      )}
      <h1
        style={{
          margin: 0,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight ?? 800,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>
          {renderColoredText(text, coloredWords, style.color as string)}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "32px",
            position: "relative",
            height: style.fontSize,
            width: totalIconWidth,
          }}
        >
          {icons.map((icon, index) => {
            // Calculate position for each icon
            const previousIconsWidth = icons
              .slice(0, index)
              .reduce(
                (width, prevIcon) =>
                  width + (prevIcon.size || 32) + iconSpacing,
                0,
              );

            return (
              <Sequence key={index} from={icon.delay}>
                <div
                  style={{
                    position: "absolute",
                    left: `${previousIconsWidth}px`,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name={icon.name}
                    frame={frame}
                    config={config}
                    size={icon.size}
                    color={icon.color || style.color}
                    audio={icon.audio}
                  />
                </div>
              </Sequence>
            );
          })}
        </div>
      </h1>
    </div>
  );
};

export const StaggeredTextReveal: React.FC<StaggeredTextRevealProps> = ({
  texts,
  fontSize = 80,
  primaryColor = "#000000",
  backgroundColor = "bg-white",
  containerWidth = 800,
  fontFamily = "Inter",
  fontWeight = 800,
  springConfig,
}) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  // Calculate positions for the three containers
  const positions = [
    { top: "10%", left: "10%" },
    { top: "40%", right: "10%" },
    { top: "70%", left: "10%" },
  ];

  return (
    <AbsoluteFill
      className={backgroundColor}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {texts.map((textItem, index) => (
        <Sequence key={index} from={textItem.delay}>
          <TextContainer
            text={textItem.text}
            icons={textItem.icons}
            coloredWords={textItem.coloredWords}
            frame={frame}
            config={config}
            springConfig={springConfig}
            style={{
              color: primaryColor,
              fontSize,
              fontFamily,
              fontWeight,
              width: containerWidth,
              ...positions[index],
            }}
            audio={textItem.audio}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
