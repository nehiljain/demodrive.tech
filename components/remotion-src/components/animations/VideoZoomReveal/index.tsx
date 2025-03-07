import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";

// Smoothstep function for smoother easing
const smoothstep = (t: number): number => {
  // Clamp t to [0, 1]
  t = Math.max(0, Math.min(1, t));
  // Smoothstep formula: 3t² - 2t³
  return t * t * (3 - 2 * t);
};

// Enhanced cubic Bézier with smoothstep
const enhancedInterpolation = (
  t: number,
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
) => {
  // First apply smoothstep
  const smoothT = smoothstep(t);

  // Then apply cubic Bézier
  const bezierPoint = (
    t: number,
    p0: number,
    p1: number,
    p2: number,
    p3: number,
  ) => {
    const oneMinusT = 1 - t;
    return (
      Math.pow(oneMinusT, 3) * p0 +
      3 * Math.pow(oneMinusT, 2) * t * p1 +
      3 * oneMinusT * Math.pow(t, 2) * p2 +
      Math.pow(t, 3) * p3
    );
  };

  // Calculate final easing value
  return bezierPoint(smoothT, 0, p1y, p2y, 1);
};

// Single zoom configuration schema
const singleZoomConfigSchema = z.object({
  startFrame: z.number(),
  endFrame: z.number(),
  // Starting position and dimensions
  startX: z.number(),
  startY: z.number(),
  startScale: z.number().default(1),
  // Hold position (where the zoom pauses)
  holdX: z.number(),
  holdY: z.number(),
  holdScale: z.number().default(2),
  // Ending position and dimensions
  endX: z.number(),
  endY: z.number(),
  endScale: z.number().default(1),
  // Easing configuration
  easingConfig: z
    .object({
      p1x: z.number().default(0.42),
      p1y: z.number().default(0),
      p2x: z.number().default(0.58),
      p2y: z.number().default(1),
    })
    .default({}),
});

// Schema for the VideoZoomReveal component
const videoZoomRevealSchema = baseTemplateSchema.extend({
  videoUrl: z.string(),
  containerWidth: z.number(),
  containerHeight: z.number(),
  backgroundColor: z.string(),
  startFrom: z.number(),
  endAt: z.number(),
  volume: z.number(),
  playbackRate: z.number(),
  position: z.object({
    top: z.string(),
    left: z.string(),
    right: z.string(),
    bottom: z.string(),
    transform: z.string(),
  }),
  zoomConfigs: z.array(singleZoomConfigSchema),
  showZoomIndicator: z.boolean(),
});

type VideoZoomRevealProps = z.infer<typeof videoZoomRevealSchema>;

const VideoZoomReveal: React.FC<VideoZoomRevealProps> = ({
  videoUrl,
  containerWidth = 800,
  containerHeight = 450,
  backgroundColor = "#03001C",
  startFrom = 0,
  endAt,
  volume = 1,
  playbackRate = 1,
  position = {},
  zoomConfigs = [],
  showZoomIndicator = false,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find the active zoom configuration based on current frame
  const activeZoomConfig = zoomConfigs.find(
    (config) => frame >= config.startFrame && frame <= config.endFrame,
  );

  // Default values for when no zoom is active
  let currentX = containerWidth / 2;
  let currentY = containerHeight / 2;
  let currentScale = 1;

  // If no active zoom config is found, check if there was a previous zoom
  if (!activeZoomConfig) {
    // Find the last completed zoom config
    const lastConfig = zoomConfigs
      .filter((config) => frame > config.endFrame)
      .sort((a, b) => b.endFrame - a.endFrame)[0];

    // If there was a previous zoom, stay at its end position
    if (lastConfig) {
      currentX = lastConfig.endX;
      currentY = lastConfig.endY;
      currentScale = lastConfig.endScale;
    }
  } else {
    // Constants for timing
    const zoomInDuration = fps; // 1 second for zoom in
    const zoomOutDuration = fps; // 1 second for zoom out

    // Calculate phase boundaries
    const ZOOM_IN_START = activeZoomConfig.startFrame;
    const ZOOM_IN_END = ZOOM_IN_START + zoomInDuration;
    const HOLD_START = ZOOM_IN_END;
    const HOLD_END = activeZoomConfig.endFrame - zoomOutDuration;
    const ZOOM_OUT_START = HOLD_END;
    const ZOOM_OUT_END = activeZoomConfig.endFrame;

    // Determine which phase we're in
    const isBeforeZoom = frame < ZOOM_IN_START;
    const isZoomingIn = frame >= ZOOM_IN_START && frame < ZOOM_IN_END;
    const isHolding = frame >= HOLD_START && frame < HOLD_END;
    const isZoomingOut = frame >= ZOOM_OUT_START && frame <= ZOOM_OUT_END;
    const isAfterZoom = frame > ZOOM_OUT_END;

    // Calculate progress based on current phase
    let normalizedTime = 0;
    if (isBeforeZoom) {
      normalizedTime = 0;
    } else if (isZoomingIn) {
      normalizedTime = interpolate(
        frame,
        [ZOOM_IN_START, ZOOM_IN_END],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      );
    } else if (isHolding) {
      normalizedTime = 1;
    } else if (isZoomingOut) {
      normalizedTime = interpolate(
        frame,
        [ZOOM_OUT_START, ZOOM_OUT_END],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      );
    } else if (isAfterZoom) {
      normalizedTime = 1;
    }

    // Apply enhanced interpolation
    const easedProgress = enhancedInterpolation(
      normalizedTime,
      activeZoomConfig.easingConfig.p1x,
      activeZoomConfig.easingConfig.p1y,
      activeZoomConfig.easingConfig.p2x,
      activeZoomConfig.easingConfig.p2y,
    );

    // Calculate intermediate values with double smoothing for extra smoothness
    const smoothProgress = smoothstep(easedProgress);

    // Get current position and scale based on phase
    if (isBeforeZoom) {
      currentX = activeZoomConfig.startX;
      currentY = activeZoomConfig.startY;
      currentScale = activeZoomConfig.startScale;
    } else if (isZoomingIn) {
      currentX = interpolate(
        smoothProgress,
        [0, 1],
        [activeZoomConfig.startX, activeZoomConfig.holdX],
      );
      currentY = interpolate(
        smoothProgress,
        [0, 1],
        [activeZoomConfig.startY, activeZoomConfig.holdY],
      );
      currentScale = interpolate(
        smoothProgress,
        [0, 1],
        [activeZoomConfig.startScale, activeZoomConfig.holdScale],
      );
    } else if (isHolding) {
      currentX = activeZoomConfig.holdX;
      currentY = activeZoomConfig.holdY;
      currentScale = activeZoomConfig.holdScale;
    } else if (isZoomingOut) {
      currentX = interpolate(
        smoothProgress,
        [0, 1],
        [activeZoomConfig.holdX, activeZoomConfig.endX],
      );
      currentY = interpolate(
        smoothProgress,
        [0, 1],
        [activeZoomConfig.holdY, activeZoomConfig.endY],
      );
      currentScale = interpolate(
        smoothProgress,
        [0, 1],
        [activeZoomConfig.holdScale, activeZoomConfig.endScale],
      );
    } else {
      currentX = activeZoomConfig.endX;
      currentY = activeZoomConfig.endY;
      currentScale = activeZoomConfig.endScale;
    }
  }

  // Calculate fade out duration and dynamic volume
  const fadeOutDurationInFrames = 30; // 0.5 seconds at 60fps
  const remainingFrames = durationInFrames - frame;
  const dynamicVolume = interpolate(
    Math.min(remainingFrames, fadeOutDurationInFrames),
    [0, fadeOutDurationInFrames],
    [0, volume],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Calculate the offset needed to keep the focal point centered while zooming
  const offsetX = (containerWidth / 2 - currentX) * (currentScale - 1);
  const offsetY = (containerHeight / 2 - currentY) * (currentScale - 1);

  // Apply the transform with smooth scaling
  const transform = `
    scale(${currentScale})
    translate(${offsetX / currentScale}px, ${offsetY / currentScale}px)
  `;

  // Function to get point color based on current position
  const getPointColor = (pointX: number, pointY: number) => {
    const isCurrentPoint =
      Math.abs(currentX - pointX) < 5 && Math.abs(currentY - pointY) < 5;
    return isCurrentPoint ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 0, 0, 0.4)";
  };

  return (
    <AbsoluteFill
      style={{ backgroundColor }}
      className="flex items-center justify-center"
    >
      <div
        className="absolute rounded-3xl shadow-xl backdrop-blur-lg p-4"
        style={{
          width: containerWidth,
          height: containerHeight,
          ...position,
        }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-inner">
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform,
              transformOrigin: "50% 50%",
              transition: "transform 0.05s ease-out",
              willChange: "transform",
            }}
          >
            <OffthreadVideo
              src={videoUrl}
              startFrom={startFrom}
              endAt={endAt}
              volume={dynamicVolume}
              playbackRate={playbackRate}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Show zoom indicator if enabled */}
          {showZoomIndicator && activeZoomConfig && (
            <>
              {/* Current position indicator */}
              <div
                style={{
                  position: "absolute",
                  left: currentX - 30,
                  top: currentY - 30,
                  width: 60,
                  height: 60,
                  border: "4px solid rgba(255, 0, 0, 0.9)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  zIndex: 1000,
                  opacity: 0.9,
                  transform: `scale(${1 / currentScale})`,
                  background:
                    "radial-gradient(circle, rgba(255,50,50,0.9) 0%, rgba(255,0,0,0.4) 60%, transparent 70%)",
                  boxShadow:
                    "0 0 10px rgba(255, 0, 0, 0.7), inset 0 0 10px rgba(255, 0, 0, 0.7)",
                }}
              />

              {/* Path visualization */}
              {[
                {
                  x: activeZoomConfig.startX,
                  y: activeZoomConfig.startY,
                  label: "S",
                },
                {
                  x: activeZoomConfig.holdX,
                  y: activeZoomConfig.holdY,
                  label: "H",
                },
                {
                  x: activeZoomConfig.endX,
                  y: activeZoomConfig.endY,
                  label: "E",
                },
              ].map((point, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: point.x - 15,
                    top: point.y - 15,
                    width: 30,
                    height: 30,
                    border: `2px solid ${getPointColor(point.x, point.y)}`,
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 999,
                    opacity: 0.8,
                    transform: `scale(${1 / currentScale})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: getPointColor(point.x, point.y),
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {point.label}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

registerAnimation({
  id: "VideoZoomReveal",
  name: "Video Zoom Reveal",
  description: "A video player with configurable zoom and pan effects",
  component: VideoZoomReveal as React.FC<unknown>,
  schema: videoZoomRevealSchema,
  defaultProps: {
    videoUrl: `https://app.demodrive.tech/static/placeholder_video.mp4`,
    containerWidth: 800,
    containerHeight: 450,
    backgroundColor: "#03001C",
    startFrom: 0,
    volume: 1,
    playbackRate: 1,
    position: {},
    zoomConfigs: [],
    showZoomIndicator: false,
  },
  thumbnail: "/thumbnails/video-zoom-reveal.png",
  category: "Video Effects",
});

export { VideoZoomReveal, videoZoomRevealSchema };
