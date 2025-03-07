import {
  AbsoluteFill,
  OffthreadVideo,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";

export const videoRevealSchema = baseTemplateSchema.extend({
  videoUrl: z.string(),
  containerWidth: z.number().optional().default(800),
  containerHeight: z.number().optional().default(450),
  backgroundColor: z.string().optional().default("#03001C"),
  startFrom: z.number().optional().default(0),
  endAt: z.number().optional(),
  volume: z.number().optional().default(1),
  playbackRate: z.number().optional().default(1.5),
  position: z
    .object({
      top: z.string().optional(),
      left: z.string().optional(),
      right: z.string().optional(),
      bottom: z.string().optional(),
    })
    .optional()
    .default({}),
  springConfig: z
    .object({
      damping: z.number().optional().default(12),
      mass: z.number().optional().default(0.5),
      stiffness: z.number().optional().default(100),
    })
    .optional(),
});

type VideoRevealProps = z.infer<typeof videoRevealSchema>;

export const VideoReveal: React.FC<VideoRevealProps> = ({
  videoUrl,
  containerWidth = 800,
  containerHeight = 450,
  backgroundColor = "#03001C",
  startFrom = 0,
  endAt,
  volume = 1,
  playbackRate = 1.5,
  position = {},
  springConfig,
}) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  const progress = spring({
    frame,
    fps: config.fps,
    config: {
      damping: springConfig?.damping ?? 12,
      mass: springConfig?.mass ?? 0.5,
      stiffness: springConfig?.stiffness ?? 100,
    },
  });

  // Calculate fade out duration and dynamic volume
  const fadeOutDurationInFrames = 30; // 0.5 seconds at 60fps
  const remainingFrames = config.durationInFrames - frame;
  const dynamicVolume = interpolate(
    Math.min(remainingFrames, fadeOutDurationInFrames),
    [0, fadeOutDurationInFrames],
    [0, volume],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Animation effects
  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Calculate outer container dimensions with margin
  const margin = 40; // Margin around the video container
  const outerWidth = containerWidth + margin * 2;
  const outerHeight = containerHeight + margin * 2;

  return (
    <AbsoluteFill
      style={{ backgroundColor }}
      className="flex items-center justify-center"
    >
      <div
        className="absolute bg-white/10 rounded-3xl shadow-xl backdrop-blur-lg p-4"
        style={{
          width: outerWidth,
          height: outerHeight,
          transform: `scale(${scale})`,
          opacity,
          ...position,
        }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-inner">
          <OffthreadVideo
            src={videoUrl}
            startFrom={startFrom}
            endAt={endAt}
            volume={dynamicVolume}
            playbackRate={playbackRate}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
