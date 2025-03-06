import { AnimatedEmoji } from "@remotion/animated-emoji";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";
import { AbsoluteFill } from "remotion";

// Create a type that extracts the valid emoji values
type ValidEmoji = AnimatedEmoji["emoji"];

export const emojiRevealSchema = baseTemplateSchema.extend({
  emoji: z.string().default("smile"),
  emojiSize: z.number().default(200),
  backgroundColor: z.string().default("bg-black"),
});

type EmojiRevealProps = z.infer<typeof emojiRevealSchema>;

export const EmojiReveal: React.FC<EmojiRevealProps> = ({
  emoji,
  emojiSize,
  backgroundColor,
}) => {
  return (
    <AbsoluteFill className={backgroundColor}>
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedEmoji emoji={emoji} size={emojiSize} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "EmojiReveal",
  name: "Emoji Reveal",
  description: "An animated emoji reveal",
  component: EmojiReveal,
  schema: emojiRevealSchema,
  defaultProps: {
    emoji: "smile",
    emojiSize: 200,
    backgroundColor: "bg-black",
  },
  category: "Simple Animations",
  thumbnail: "/thumbnails/emoji-reveal.png",
});
