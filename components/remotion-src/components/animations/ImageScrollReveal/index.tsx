import {
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  AbsoluteFill,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";

export const imageScrollRevealSchema = baseTemplateSchema.extend({
  imagePath: z.string(),
  targetYPosition: z.number().default(1000),
  startFrame: z.number().default(0),
  scrollDuration: z.number().default(90),
  pauseDuration: z.number().default(60),
  containerClassName: z.string().optional().default(""),
});

type ImageScrollRevealProps = z.infer<typeof imageScrollRevealSchema>;

export const ImageScrollReveal: React.FC<ImageScrollRevealProps> = ({
  imagePath,
  targetYPosition,
  startFrame = 0,
  scrollDuration = 90,
  pauseDuration = 60,
  containerClassName = "",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  // Create a spring animation with adjusted timing and smoother settling
  const springProgress = spring({
    frame: relativeFrame,
    fps: 30,
    config: {
      damping: 35,
      mass: 0.8,
      stiffness: 12,
      overshootClamping: true,
    },
    durationInFrames: scrollDuration,
  });

  // Map the spring progress to our scroll position with easing at the end
  const scrollProgress = interpolate(
    springProgress,
    [0, 0.95, 1],
    [0, targetYPosition * 0.98, targetYPosition],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill>
      <div
        className={`w-full h-full flex items-center justify-center p-12 ${containerClassName}`}
      >
        <div
          className="w-[95%] h-[90%] relative overflow-hidden rounded-xl bg-white"
          style={{
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            className="absolute left-1/2 transform origin-top"
            style={{
              transform: `translateX(-50%) translateY(-${scrollProgress}px)`,
              width: "100%",
              maxWidth: "2542px",
            }}
          >
            <img
              src={staticFile(imagePath)}
              alt="Scrolling content"
              className="w-full h-auto"
              style={{
                transformOrigin: "top center",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "ImageScrollReveal",
  name: "Image Scroll Reveal",
  description:
    "A smooth scrolling animation for showcasing long images or screenshots",
  component: ImageScrollReveal,
  schema: imageScrollRevealSchema,
  defaultProps: {
    imagePath: "screenshots/website-screenshot.png",
    targetYPosition: 1000,
    startFrame: 0,
    scrollDuration: 90,
    pauseDuration: 60,
  },
  category: "Content Animations",
  thumbnail: "/thumbnails/image-scroll-reveal.png",
});
