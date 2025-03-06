import React, { useMemo, useState, useEffect } from "react";
import {
  useCurrentFrame,
  interpolate,
  AbsoluteFill,
  staticFile,
  Audio,
} from "remotion";
import { getLength } from "@remotion/paths";

interface LogoPath {
  d: string;
  delay: number;
}

interface AudioConfig {
  src: string;
  volume?: number;
  playbackRate?: number;
  startFrom?: number;
  endAt?: number;
  muted?: boolean;
  loop?: boolean;
}

interface LogoAnimationProps {
  width?: number;
  height?: number;
  color?: string;
  durationInFrames?: number;
  backgroundColor?: string;
  strokeWidth?: number;
  svgPath?: string;
  delayBetweenPaths?: number;
  fillDelay?: number;
  audio?: AudioConfig;
}

const parseSvgFile = async (svgPath: string): Promise<LogoPath[]> => {
  try {
    const response = await fetch(staticFile(svgPath));
    const svgText = await response.text();

    // Create a temporary DOM element to parse SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");

    // Get all path elements
    const pathElements = doc.querySelectorAll("path");

    // Convert NodeList to array of path data
    return Array.from(pathElements).map((path, index) => ({
      d: path.getAttribute("d") || "",
      delay: index * 5, // 5 frames delay between each path
    }));
  } catch (error) {
    console.error("Error parsing SVG file:", error);
    return [];
  }
};

const getViewBox = async (svgPath: string): Promise<string> => {
  try {
    const response = await fetch(staticFile(svgPath));
    const svgText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const svg = doc.querySelector("svg");
    return svg?.getAttribute("viewBox") || "0 0 200 198";
  } catch (error) {
    console.error("Error getting viewBox:", error);
    return "0 0 200 198";
  }
};

export const LogoAnimation: React.FC<LogoAnimationProps> = ({
  width = 400,
  height = 400,
  color = "#000000",
  backgroundColor = "#FFFFFF",
  strokeWidth = 2,
  durationInFrames = 90,
  svgPath = "cravd_svg_logo.svg",
  delayBetweenPaths = 5,
  fillDelay = 1,
  audio,
}) => {
  const frame = useCurrentFrame();
  const [paths, setPaths] = useState<LogoPath[]>([]);
  const [viewBox, setViewBox] = useState("0 0 200 198");

  // Load paths and viewBox on mount
  useEffect(() => {
    const loadSvg = async () => {
      const [loadedPaths, loadedViewBox] = await Promise.all([
        parseSvgFile(svgPath),
        getViewBox(svgPath),
      ]);
      setPaths(loadedPaths);
      setViewBox(loadedViewBox);
    };

    loadSvg();
  }, [svgPath]);

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {audio && (
        <Audio
          src={staticFile(audio.src)}
          volume={audio.volume}
          playbackRate={audio.playbackRate}
          startFrom={audio.startFrom}
          endAt={audio.endAt}
          muted={audio.muted}
          loop={audio.loop}
        />
      )}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {paths.map((path, index) => {
            const totalLength = getLength(path.d);
            const drawDuration = 25; // Duration for each path to be drawn
            const fillDuration = 20; // Duration of fill animation

            // Calculate the start frame for this path's animations
            const pathStartFrame = path.delay * delayBetweenPaths;

            // Interpolate strokeDashoffset from totalLength (invisible) to 0 (fully drawn)
            const strokeDashoffset = interpolate(
              frame - pathStartFrame,
              [0, drawDuration],
              [totalLength, 0],
              {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              },
            );

            // Calculate fill opacity after stroke is drawn
            const fillOpacity = interpolate(
              frame - pathStartFrame - drawDuration - fillDelay,
              [0, fillDuration],
              [0, 1],
              {
                extrapolateRight: "clamp",
                extrapolateLeft: "clamp",
              },
            );

            return (
              <g key={index}>
                {/* Fill path */}
                <path d={path.d} fill={color} opacity={fillOpacity} />
                {/* Stroke path */}
                <path
                  d={path.d}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={totalLength}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
