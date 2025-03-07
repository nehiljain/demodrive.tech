import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";

// Schema for OpacityFlashReveal props
export const opacityFlashRevealSchema = baseTemplateSchema.extend({
  text: z.string(),
  fontSize: z.number(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  containerWidth: z.number(),
  lineHeight: z.number(),
  fontFamily: z.string().optional(),
  flashSpeed: z.number(),
  minOpacity: z.number(),
  shake: z.boolean().optional(),
  shakeIntensity: z.number().optional(),
  motionBlur: z.boolean().optional(),
  blurIntensity: z.number().optional(),
});

type OpacityFlashRevealProps = z.infer<typeof opacityFlashRevealSchema>;

export const OpacityFlashReveal: React.FC<OpacityFlashRevealProps> = ({
  text,
  fontSize,
  primaryColor,
  backgroundColor,
  containerWidth,
  lineHeight,
  fontFamily = "Montserrat",
  flashSpeed = 6,
  minOpacity = 0.4,
  shake = false,
  shakeIntensity = 2,
  motionBlur = false,
  blurIntensity = 2,
}) => {
  const frame = useCurrentFrame();

  // Create smooth flicker effect using sine wave
  const flicker = Math.sin((frame / 60) * Math.PI * flashSpeed);

  // Map flicker to opacity
  const opacity = interpolate(flicker, [-1, 1], [minOpacity, 1], {
    extrapolateRight: "clamp",
  });

  // Optional shake effect
  const translateX = shake
    ? interpolate(flicker, [-1, 1], [-shakeIntensity, shakeIntensity])
    : 0;

  // Optional motion blur
  const blurAmount = motionBlur
    ? interpolate(flicker, [-1, 1], [1, blurIntensity])
    : 0;

  return (
    <AbsoluteFill className={backgroundColor}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
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
            opacity,
            transform: `translateX(${translateX}px)`,
            filter: motionBlur ? `blur(${blurAmount}px)` : undefined,
            transition: "opacity 0.1s ease-in-out",
          }}
        >
            {text}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
