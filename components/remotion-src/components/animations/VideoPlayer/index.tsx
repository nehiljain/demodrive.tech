import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";

// Schema for VideoPlayer props
export const videoPlayerSchema = baseTemplateSchema.extend({
  videoUrl: z.string(),
  startFrom: z.number(),
  endAt: z.number().optional(),
  volume: z.number(),
  playbackRate: z.number(),
  muted: z.boolean(),
  loop: z.boolean(),
  objectFit: z.enum(["cover", "contain", "fill"]).default("cover"),
  backgroundColor: z.string().default("#000000"),
});

type VideoPlayerProps = z.infer<typeof videoPlayerSchema>;

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  startFrom,
  endAt,
  volume,
  playbackRate,
  muted,
  objectFit,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();

  // Fade in animation
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        opacity,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full overflow-hidden">
          <OffthreadVideo
            src={videoUrl}
            startFrom={startFrom}
            endAt={endAt}
            volume={volume}
            playbackRate={playbackRate}
            muted={muted}
            style={{
              width: "100%",
              height: "100%",
              objectFit,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Register the animation directly in the component file
registerAnimation({
  id: "VideoPlayer",
  name: "Video Player",
  description: "A simple video player with configuration options",
  component: VideoPlayer as React.FC<unknown>,
  schema: videoPlayerSchema,
  defaultProps: {
    videoUrl: "http://127.0.0.1:8000/static/placeholder_video.mp4",
    startFrom: 0,
    volume: 1,
    playbackRate: 1,
    muted: false,
    loop: false,
    objectFit: "cover",
    backgroundColor: "#000000",
  },
  category: "Media",
  thumbnail: "/thumbnails/video-player.jpg",
});

// Export the component
export { VideoPlayer };
