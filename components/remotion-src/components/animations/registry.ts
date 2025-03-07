import { z } from "zod";
import { ReactNode } from "react";
import { ZodRawShape } from "zod";
// import { VideoZoomReveal, videoZoomRevealSchema } from "./VideoZoomReveal";

// Define the animation registry type
export interface AnimationRegistryEntry {
  id: string;
  name: string;
  description: string;
  component: React.FC<unknown>;
  schema: z.ZodObject<ZodRawShape>;
  defaultProps: Record<string, unknown>;
  thumbnail?: string; // Optional thumbnail for UI display
  category?: string; // Optional category for grouping
}

// Store for all registered animations
const animationRegistry: AnimationRegistryEntry[] = [];

// Register an animation
export function registerAnimation(entry: AnimationRegistryEntry) {
  // Check if animation with this ID already exists
  const existingIndex = animationRegistry.findIndex((a) => a.id === entry.id);

  if (existingIndex >= 0) {
    // Replace existing animation
    animationRegistry[existingIndex] = entry;
  } else {
    // Add new animation
    animationRegistry.push(entry);
  }
}

// Get all registered animations
export function getAllAnimations(): AnimationRegistryEntry[] {
  return [...animationRegistry];
}

// Get animation by ID
export function getAnimationById(
  id: string,
): AnimationRegistryEntry | undefined {
  return animationRegistry.find((a) => a.id === id);
}

// Get animations by category
export function getAnimationsByCategory(
  category: string,
): AnimationRegistryEntry[] {
  return animationRegistry.filter((a) => a.category === category);
}

// Helper to generate property controls based on schema
export function generatePropertyControls(
): ReactNode {
  // This would be implemented to dynamically generate UI controls
  // based on the schema types (string, number, boolean, etc.)
  // We'll implement this in a separate file
  return null;
}

// registerAnimation({
//   id: "video-zoom-reveal",
//   name: "Video Zoom Reveal",
//   description: "Reveal content with dynamic video zooming effects",
//   component: VideoZoomReveal,
//   schema: videoZoomRevealSchema,
//   defaultProps: videoZoomRevealConfig.defaultProps,
// });
