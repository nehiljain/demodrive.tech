import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";

// Reuse the smoothstep and enhanced interpolation functions
const smoothstep = (t: number): number => {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
};

const enhancedInterpolation = (
  t: number,
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
) => {
  const smoothT = smoothstep(t);
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
  return bezierPoint(smoothT, 0, p1y, p2y, 1);
};

// Schema definitions
const singleZoomConfigSchema = z.object({
  startFrame: z.number(),
  endFrame: z.number(),
  startX: z.number(),
  startY: z.number(),
  startScale: z.number().default(1),
  holdX: z.number(),
  holdY: z.number(),
  holdScale: z.number().default(2),
  endX: z.number(),
  endY: z.number(),
  endScale: z.number().default(1),
  easingConfig: z
    .object({
      p1x: z.number().default(0.42),
      p1y: z.number().default(0),
      p2x: z.number().default(0.58),
      p2y: z.number().default(1),
    })
    .default({}),
});

const boundingBoxSchema = z.object({
  startFrame: z.number(),
  endFrame: z.number(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  thickness: z.string().default("2px"),
  borderColor: z.string().default("rgba(255, 0, 0, 0.8)"),
  borderRadius: z.string().default("8px"),
  animationDuration: z.number().default(20), // Frames for the drawing animation
  springConfig: z
    .object({
      damping: z.number().default(15),
      mass: z.number().default(0.8),
      stiffness: z.number().default(150),
    })
    .default({}),
});

const blurRegionSchema = z.object({
  startFrame: z.number(),
  endFrame: z.number(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  blurAmount: z.number().default(10),
  fadeInDuration: z.number().default(15),
  fadeOutDuration: z.number().default(15),
});

const clickAnimationSchema = z.object({
  startFrame: z.number(),
  x: z.number(),
  y: z.number(),
  duration: z.number().default(20), // Duration in frames
  type: z.enum(["short", "long"]).default("short"),
  color: z.string().default("rgba(255, 255, 255, 0.8)"),
});

// Combined schema for all effects
export const videoCombinedEffectsSchema = baseTemplateSchema.extend({
  videoUrl: z.string(),
  containerWidth: z.number().optional().default(800),
  containerHeight: z.number().optional().default(450),
  backgroundColor: z.string().optional().default("#03001C"),
  startFrom: z.number().optional().default(0),
  endAt: z.number().optional(),
  volume: z.number().optional().default(1),
  playbackRate: z.number().optional().default(1),
  position: z
    .object({
      top: z.string().optional(),
      left: z.string().optional(),
      right: z.string().optional(),
      bottom: z.string().optional(),
      transform: z.string().optional(),
    })
    .optional()
    .default({}),
  zoomConfigs: z.array(singleZoomConfigSchema).default([]),
  boundingBoxes: z.array(boundingBoxSchema).default([]),
  blurRegions: z.array(blurRegionSchema).default([]),
  clickAnimations: z.array(clickAnimationSchema).default([]),
  showZoomIndicator: z.boolean().default(false),
});

type VideoCombinedEffectsProps = z.infer<typeof videoCombinedEffectsSchema>;

export const VideoCombinedEffects: React.FC<VideoCombinedEffectsProps> = ({
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
  boundingBoxes = [],
  blurRegions = [],
  clickAnimations = [],
  showZoomIndicator = false,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Find active zoom configuration
  const activeZoomConfig = zoomConfigs.find(
    (config) => frame >= config.startFrame && frame <= config.endFrame,
  );

  // Calculate zoom and pan transforms
  let currentX = containerWidth / 2;
  let currentY = containerHeight / 2;
  let currentScale = 1;

  if (activeZoomConfig) {
    const totalDuration =
      activeZoomConfig.endFrame - activeZoomConfig.startFrame;
    const zoomInDuration = fps;
    const zoomOutDuration = fps;
    const holdDuration = totalDuration - (zoomInDuration + zoomOutDuration);

    const ZOOM_IN_START = activeZoomConfig.startFrame;
    const ZOOM_IN_END = ZOOM_IN_START + zoomInDuration;
    const HOLD_START = ZOOM_IN_END;
    const HOLD_END = activeZoomConfig.endFrame - zoomOutDuration;
    const ZOOM_OUT_START = HOLD_END;
    const ZOOM_OUT_END = activeZoomConfig.endFrame;

    let normalizedTime = 0;
    if (frame < ZOOM_IN_START) {
      normalizedTime = 0;
    } else if (frame < ZOOM_IN_END) {
      normalizedTime = interpolate(frame, [ZOOM_IN_START, ZOOM_IN_END], [0, 1]);
    } else if (frame < HOLD_END) {
      normalizedTime = 1;
    } else {
      normalizedTime = interpolate(
        frame,
        [ZOOM_OUT_START, ZOOM_OUT_END],
        [0, 1],
      );
    }

    const easedProgress = enhancedInterpolation(
      normalizedTime,
      activeZoomConfig.easingConfig.p1x,
      activeZoomConfig.easingConfig.p1y,
      activeZoomConfig.easingConfig.p2x,
      activeZoomConfig.easingConfig.p2y,
    );

    const smoothProgress = smoothstep(easedProgress);

    if (frame < ZOOM_IN_END) {
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
    } else if (frame < HOLD_END) {
      currentX = activeZoomConfig.holdX;
      currentY = activeZoomConfig.holdY;
      currentScale = activeZoomConfig.holdScale;
    } else {
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
    }
  } else {
    // If no active zoom config, check for the last completed one
    const lastConfig = zoomConfigs
      .filter((config) => frame > config.endFrame)
      .sort((a, b) => b.endFrame - a.endFrame)[0];

    // If there was a previous zoom, stay at its end position
    if (lastConfig) {
      currentX = lastConfig.endX;
      currentY = lastConfig.endY;
      currentScale = lastConfig.endScale;
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

  // Calculate transform offsets
  const offsetX = (containerWidth / 2 - currentX) * (currentScale - 1);
  const offsetY = (containerHeight / 2 - currentY) * (currentScale - 1);
  const transform = `scale(${currentScale}) translate(${offsetX / currentScale}px, ${offsetY / currentScale}px)`;

  // Function to get point color based on current position
  const getPointColor = (pointX: number, pointY: number) => {
    const isCurrentPoint =
      Math.abs(currentX - pointX) < 5 && Math.abs(currentY - pointY) < 5;
    return isCurrentPoint ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 0, 0, 0.4)";
  };

  // Render bounding box function
  const renderBoundingBox = (
    box: z.infer<typeof boundingBoxSchema>,
    index: number,
  ) => {
    // If we're past the endFrame or haven't reached startFrame, don't render anything
    if (frame > box.endFrame || frame < box.startFrame) {
      return null;
    }

    const springConfig = {
      damping: box.springConfig.damping,
      mass: box.springConfig.mass,
      stiffness: box.springConfig.stiffness,
      overshootClamping: false,
    };

    // Calculate progress based on animationDuration
    const animationProgress = spring({
      frame: frame - box.startFrame,
      fps,
      durationInFrames: box.animationDuration,
      config: springConfig,
    });

    // Only start showing the border when animation begins
    const borderProgress = animationProgress * 100;

    // Smooth fade in animation with custom duration
    const opacity = spring({
      frame: frame - box.startFrame,
      fps,
      durationInFrames: Math.floor(box.animationDuration * 0.5), // Faster fade-in to prevent flicker
      config: {
        damping: 30, // Higher damping for smoother fade
        mass: 0.4, // Lower mass for faster response
        stiffness: 220, // Higher stiffness for quicker start
        overshootClamping: true, // Prevent opacity overshoot
      },
    });

    // Add a subtle scale animation
    const scale = spring({
      frame: frame - box.startFrame,
      fps,
      durationInFrames: box.animationDuration,
      config: {
        damping: 25,
        mass: 0.5,
        stiffness: 200,
      },
    });

    // Only render when animation has actually started
    if (opacity < 0.01) return null;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: box.x,
          top: box.y,
          width: box.width,
          height: box.height,
          transform: `scale(${0.95 + scale * 0.05})`,
          pointerEvents: "none",
          opacity,
          zIndex: 1000,
        }}
      >
        {/* Container for the animated border */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: `${box.thickness} solid ${box.borderColor}`,
            borderRadius: box.borderRadius,
            clipPath: `
              polygon(
                0 0,
                ${borderProgress}% 0,
                ${borderProgress}% ${borderProgress}%,
                ${100 - borderProgress}% ${borderProgress}%,
                ${100 - borderProgress}% ${100 - borderProgress}%,
                ${borderProgress}% ${100 - borderProgress}%,
                ${borderProgress}% 100%,
                0 100%,
                0 ${100 - borderProgress}%,
                0 ${borderProgress}%
              )
            `,
            transition: "clip-path 0.1s ease-out",
          }}
        />
      </div>
    );
  };

  // Render blur region function
  const renderBlurRegion = (
    region: z.infer<typeof blurRegionSchema>,
    index: number,
  ) => {
    if (frame < region.startFrame || frame > region.endFrame) {
      return null;
    }

    const fadeInOpacity = interpolate(
      frame - region.startFrame,
      [0, region.fadeInDuration],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    const fadeOutOpacity = interpolate(
      frame - (region.endFrame - region.fadeOutDuration),
      [0, region.fadeOutDuration],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    const opacity = Math.min(fadeInOpacity, fadeOutOpacity);

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: region.x,
          top: region.y,
          width: region.width,
          height: region.height,
          opacity,
          backdropFilter: `blur(${region.blurAmount}px) contrast(0.9) brightness(1.1)`,
          WebkitBackdropFilter: `blur(${region.blurAmount}px) contrast(0.9) brightness(1.1)`,
          backgroundColor: "rgba(240, 240, 240, 0.25)",
          borderRadius: "0px",
          border: "none",
          boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
          zIndex: 2000,
        }}
      />
    );
  };

  // Render click animation function
  const renderClickAnimation = (
    click: z.infer<typeof clickAnimationSchema>,
    index: number,
  ) => {
    // Don't render if we haven't reached the start frame
    if (frame < click.startFrame || frame > click.startFrame + click.duration) {
      return null;
    }

    const progress = spring({
      frame: frame - click.startFrame,
      fps,
      durationInFrames: click.duration,
      config: {
        damping: click.type === "short" ? 15 : 10,
        mass: click.type === "short" ? 0.3 : 0.4,
        stiffness: click.type === "short" ? 180 : 140,
      },
    });

    // Scale for the outer rings (multiple rings for emphasis)
    const outerScale1 = interpolate(
      progress,
      [0, 1],
      [0.2, click.type === "short" ? 2.5 : 3.5],
    );
    const outerScale2 = interpolate(
      progress,
      [0, 1],
      [0.1, click.type === "short" ? 2 : 3],
    );

    // Cursor bounce effect
    const cursorBounce = spring({
      frame: frame - click.startFrame,
      fps,
      durationInFrames: click.duration,
      config: {
        damping: 12,
        mass: 0.4,
        stiffness: 200,
      },
    });

    const cursorScale = interpolate(cursorBounce, [0, 0.5, 1], [1, 0.85, 1]);

    // Opacity that fades out
    const opacity = interpolate(progress, [0.6, 1], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    if (opacity < 0.01) return null;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: click.x,
          top: click.y,
          transform: `translate(-50%, -50%)`,
          pointerEvents: "none",
          opacity,
          zIndex: 3000,
        }}
      >
        {/* Multiple outer rings for emphasis */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: click.type === "short" ? "100px" : "140px",
            height: click.type === "short" ? "100px" : "140px",
            transform: `translate(-50%, -50%) scale(${outerScale1})`,
            border: `3px solid ${click.color}`,
            borderRadius: "50%",
            opacity: opacity * 0.4,
            boxShadow: `0 0 15px ${click.color}, inset 0 0 15px ${click.color}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: click.type === "short" ? "80px" : "120px",
            height: click.type === "short" ? "80px" : "120px",
            transform: `translate(-50%, -50%) scale(${outerScale2})`,
            border: `2px solid ${click.color}`,
            borderRadius: "50%",
            opacity: opacity * 0.6,
            boxShadow: `0 0 12px ${click.color}`,
          }}
        />

        {/* Cursor with click effect */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-12px, -12px) scale(${cursorScale})`,
            opacity: opacity,
            color: "#3d3d3d",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="white"
            strokeWidth="1"
          >
            <path d="M5.5,2C5.372,2,5.244,2.028,5.146,2.083L5.146,2.083c-0.101,0.056-0.184,0.138-0.242,0.239c-0.058,0.101-0.088,0.217-0.088,0.333v18.689c-0.001,0.156,0.069,0.303,0.19,0.401c0.121,0.098,0.28,0.139,0.435,0.112c0.155-0.027,0.294-0.123,0.38-0.26l3.722-5.961l3.681,7.739c0.065,0.135,0.178,0.242,0.317,0.3c0.139,0.058,0.292,0.066,0.435,0.024l2.695-0.79c0.181-0.052,0.328-0.187,0.394-0.364c0.066-0.177,0.052-0.375-0.039-0.54l-3.459-7.295l6.604-0.042c0.16-0.001,0.309-0.075,0.406-0.204c0.098-0.129,0.132-0.297,0.092-0.453c-0.04-0.157-0.147-0.29-0.292-0.365L6.288,2.18C6.042,2.06,5.772,2.001,5.5,2z" />
          </svg>
        </div>

        {/* Click ripple effect */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: click.type === "short" ? "60px" : "80px",
            height: click.type === "short" ? "60px" : "80px",
            transform: `translate(-50%, -50%) scale(${outerScale2 * 0.7})`,
            background: `radial-gradient(circle, ${click.color} 0%, transparent 70%)`,
            borderRadius: "50%",
            opacity: opacity * 0.4,
            filter: "blur(2px)",
          }}
        />
      </div>
    );
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
          {/* Video container with zoom and pan */}
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

          {/* Bounding boxes overlay */}
          {boundingBoxes.map((box, index) => renderBoundingBox(box, index))}

          {/* Blur regions overlay */}
          {blurRegions.map((region, index) => renderBlurRegion(region, index))}

          {/* Click animations overlay */}
          {clickAnimations.map((click, index) =>
            renderClickAnimation(click, index),
          )}

          {/* Current position indicator for zoom/pan */}
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
                  zIndex: 3000,
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
                    zIndex: 2999,
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
