import { useCallback, useEffect, useState } from "react";
import { useVideoConfig } from "remotion";

interface AutoFontSizeOptions {
  text: string;
  maxFontSize?: number;
  minFontSize?: number;
  widthPadding?: number;
  heightPadding?: number;
}

export const useAutoFontSize = ({
  text,
  maxFontSize = 200,
  minFontSize = 20,
  widthPadding = 100,
  heightPadding = 100,
}: AutoFontSizeOptions) => {
  const { width, height } = useVideoConfig();
  const [fontSize, setFontSize] = useState(maxFontSize);

  const calculateFontSize = useCallback(() => {
    // More accurate character width calculation
    // Using different multipliers for different character types
    const getCharWidth = (char: string) => {
      if (char.match(/[A-Z]/)) return 0.85; // Capital letters
      if (char.match(/[a-z]/)) return 0.65; // Lowercase letters
      if (char.match(/[!.,]/)) return 0.3; // Punctuation
      if (char === " ") return 0.3; // Space
      return 0.8; // Other characters
    };

    // Calculate total text width based on character types
    const totalWidthMultiplier = text
      .split("")
      .reduce((sum, char) => sum + getCharWidth(char), 0);

    const textWidth = fontSize * totalWidthMultiplier;
    const textHeight = fontSize * 1.2; // Line height

    const maxWidth = width - widthPadding * 2;
    const maxHeight = height - heightPadding * 2;

    // Calculate the ideal font size
    const widthRatio = maxWidth / textWidth;
    const heightRatio = maxHeight / textHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    // Apply a safety margin of 90% to ensure text fits
    const safetyMargin = 0.9;
    const idealFontSize = Math.floor(fontSize * ratio * safetyMargin);

    // Clamp between min and max font sizes
    const newFontSize = Math.min(
      maxFontSize,
      Math.max(minFontSize, idealFontSize),
    );

    if (newFontSize !== fontSize) {
      setFontSize(newFontSize);
    }
  }, [
    text,
    fontSize,
    width,
    height,
    widthPadding,
    heightPadding,
    minFontSize,
    maxFontSize,
  ]);

  // Recalculate when any dependencies change
  useEffect(() => {
    calculateFontSize();
  }, [calculateFontSize, text, width, height]);

  // Also recalculate on mount and when calculateFontSize changes
  useEffect(() => {
    calculateFontSize();
  }, [calculateFontSize]);

  return fontSize;
};
