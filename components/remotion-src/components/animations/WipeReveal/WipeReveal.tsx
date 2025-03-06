import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Audio,
  staticFile,
} from "remotion";
import { WipeRevealConfig } from "@/remotion-src/shared/types";

export const WipeReveal: React.FC<WipeRevealConfig> = ({
  text,
  direction = "left-to-right",
  textStyle = {},
  wipeColor = "#000000",
  audio,
}) => {
  const frame = useCurrentFrame();

  // Calculate animation progress
  const progress = interpolate(frame, [0, 30], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Define wipe styles based on direction
  const getWipeStyles = () => {
    const baseStyles = {
      position: "absolute",
      backgroundColor: wipeColor,
    } as const;

    switch (direction) {
      case "left-to-right":
        return {
          ...baseStyles,
          left: 0,
          top: 0,
          bottom: 0,
          width: `${100 - progress}%`,
        };
      case "right-to-left":
        return {
          ...baseStyles,
          right: 0,
          top: 0,
          bottom: 0,
          width: `${100 - progress}%`,
        };
      case "top-to-bottom":
        return {
          ...baseStyles,
          left: 0,
          right: 0,
          top: 0,
          height: `${100 - progress}%`,
        };
      case "bottom-to-top":
        return {
          ...baseStyles,
          left: 0,
          right: 0,
          bottom: 0,
          height: `${100 - progress}%`,
        };
    }
  };

  return (
    <AbsoluteFill className="bg-white flex items-center justify-center">
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
      <div className="relative w-full h-full flex items-center justify-center">
        <h1
          className="text-6xl font-bold z-10"
          style={{
            fontSize: textStyle.fontSize ?? "6rem",
            fontWeight: textStyle.fontWeight ?? 700,
            fontFamily: textStyle.fontFamily ?? "sans-serif",
            color: textStyle.color ?? "#000000",
          }}
        >
          {text}
        </h1>
        <div style={getWipeStyles()} />
      </div>
    </AbsoluteFill>
  );
};
