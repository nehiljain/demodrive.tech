import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Audio,
  staticFile,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";

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

// Schema for TypewriterReveal props
export const typewriterRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  fontSize: z.number(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  containerWidth: z.number(),
  lineHeight: z.number(),
  fontFamily: z.string().optional(),
  typingSpeed: z.number().optional(),
  showCursor: z.boolean().optional(),
  cursorColor: z.string().optional(),
  cursorBlinkSpeed: z.number().optional(),
  coloredWords: z.array(coloredWordSchema).optional(),
  audio: audioConfigSchema,
});

type TypewriterRevealProps = z.infer<typeof typewriterRevealSchema>;

const TypewriterReveal: React.FC<TypewriterRevealProps> = ({
  text,
  fontSize,
  primaryColor,
  backgroundColor,
  containerWidth,
  lineHeight,
  fontFamily = "monospace",
  typingSpeed = 2, // Default typing speed
  showCursor = true,
  cursorColor,
  cursorBlinkSpeed = 30,
  coloredWords = [],
  audio,
}) => {
  const frame = useCurrentFrame();

  // Calculate how many characters to show based on typing speed
  const charsToShow = Math.floor(frame * typingSpeed);

  // Function to render text with colored words while respecting typewriter effect
  const renderColoredText = () => {
    if (!coloredWords || coloredWords.length === 0) {
      return text.slice(0, charsToShow);
    }

    // Create a map of words to their colors for efficient lookup
    const colorMap = new Map(
      coloredWords.map(({ word, color }) => [word, color]),
    );

    // Split the text into words while preserving whitespace
    const words = text.split(/(\s+)/);
    let currentCharCount = 0;

    return words.map((word, index) => {
      const color = colorMap.get(word);
      const wordStart = currentCharCount;
      const wordEnd = currentCharCount + word.length;
      currentCharCount = wordEnd;

      // If we haven't reached this word in the typewriter effect
      if (wordStart >= charsToShow) {
        return null;
      }

      // If we're partially through this word
      if (wordEnd > charsToShow) {
        const visiblePart = word.slice(0, charsToShow - wordStart);
        return (
          <span
            key={index}
            style={{
              color: color || primaryColor,
              display: "inline",
            }}
          >
            {visiblePart}
          </span>
        );
      }

      // If we've fully typed this word
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

  // Blinking cursor effect
  const cursorOpacity = showCursor
    ? interpolate(
        frame % cursorBlinkSpeed,
        [0, cursorBlinkSpeed / 2, cursorBlinkSpeed],
        [1, 1, 0],
        {
          extrapolateRight: "clamp",
        },
      )
    : 0;

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
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: containerWidth,
            fontSize,
            lineHeight,
            fontFamily,
            textAlign: "center",
            whiteSpace: "pre-line",
            fontWeight: "bold",
            color: primaryColor,
          }}
        >
          {renderColoredText()}
          <span
            style={{
              opacity: cursorOpacity,
              color: cursorColor || primaryColor,
            }}
          >
            |
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "TypewriterReveal",
  name: "Typewriter Reveal",
  description: "A typewriter-style text reveal animation",
  component: TypewriterReveal,
  schema: typewriterRevealSchema,
  defaultProps: {
    text: "Typewriter Reveal....",
    fontSize: 80,
    primaryColor: "#ffffff",
    backgroundColor: "bg-gradient-to-br from-gray-900 to-blue-900",
    containerWidth: 800,
    lineHeight: 1.5,
    fontFamily: "Courier Prime",
    typingSpeed: 2,
    showCursor: true,
    cursorColor: "#ffffff",
    cursorBlinkSpeed: 30,
    coloredWords: [],
  },
  category: "Text Animations",
  thumbnail: "/thumbnails/typewriter-reveal.png",
});

// Export the component
export { TypewriterReveal };
