import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";

// Schema for UnderlineReveal props
export const underlineRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  highlightWords: z.array(z.string()), // Words to underline
  fontSize: z.number(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  containerWidth: z.number(),
  lineHeight: z.number(),
  fontFamily: z.string().optional(),
  underlineColor: z.string(),
  underlineHeight: z.number(),
  underlineOffset: z.number(),
  animationDuration: z.number(),
  isHighlight: z.boolean().optional(),
  highlightOpacity: z.number().optional(),
  fadeOut: z.boolean().optional(),
  fadeOutStart: z.number().optional(),
  fadeOutDuration: z.number().optional(),
  delayBetweenWords: z.number().optional(),
});

type UnderlineRevealProps = z.infer<typeof underlineRevealSchema>;

export const UnderlineReveal: React.FC<UnderlineRevealProps> = ({
  text,
  highlightWords,
  fontSize,
  primaryColor,
  backgroundColor,
  containerWidth,
  lineHeight,
  fontFamily = "Montserrat",
  underlineColor = "#3b82f6",
  underlineHeight = 5,
  underlineOffset = 10,
  animationDuration = 30,
  isHighlight = false,
  highlightOpacity = 0.3,
  fadeOut = false,
  fadeOutStart = 45,
  fadeOutDuration = 15,
  delayBetweenWords = 15,
}) => {
  const frame = useCurrentFrame();

  // Split text into words and create spans
  const renderText = () => {
    const words = text.split(/(\s+)/); // Split by whitespace but keep separators
    let currentPosition = 0;

    return words.map((word, index) => {
      const isWordToHighlight = highlightWords.includes(word.trim());
      const wordRef = `word-${index}`;

      // Skip animation for spaces
      if (word.trim() === "") {
        currentPosition += 1;
        return <span key={index}>{word}</span>;
      }

      // Calculate animation start frame for this word
      const wordStartFrame = currentPosition * delayBetweenWords;

      // Animate underline width
      const underlineWidth = isWordToHighlight
        ? interpolate(
            frame - wordStartFrame,
            [0, animationDuration],
            [0, word.length * (fontSize * 0.6)], // Approximate width based on font size
            {
              extrapolateRight: "clamp",
            },
          )
        : 0;

      // Optional fade out animation
      const opacity =
        fadeOut && isWordToHighlight
          ? interpolate(
              frame - wordStartFrame,
              [fadeOutStart, fadeOutStart + fadeOutDuration],
              [1, 0],
              {
                extrapolateRight: "clamp",
              },
            )
          : 1;

      if (isWordToHighlight) {
        currentPosition += 1;
      }

      return (
        <span
          key={index}
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {word}
          {isWordToHighlight && (
            <div
              style={{
                position: "absolute",
                bottom: -underlineOffset,
                left: 0,
                height: isHighlight ? "100%" : underlineHeight,
                width: underlineWidth,
                backgroundColor: underlineColor,
                opacity: isHighlight ? highlightOpacity * opacity : opacity,
                transition: "width 0.1s linear",
                borderRadius: isHighlight ? "4px" : undefined,
                zIndex: 1,
              }}
            />
          )}
        </span>
      );
    });
  };

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
            fontFamily,
            textAlign: "center",
            whiteSpace: "pre-line",
            fontWeight: "bold",
          }}
        >
          {renderText()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
