import { z } from "zod";

// Base configuration that all animations will share
export const BaseAnimationSchema = z.object({
  width: z.number().default(1080),
  height: z.number().default(1920),
  durationInFrames: z.number().default(120),
  fps: z.number().default(60),
});

// Common text styling options
export const TextStyleSchema = z.object({
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  fontFamily: z.string().optional(),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
});

// Wipe Reveal specific schema
export const WipeRevealSchema = BaseAnimationSchema.extend({
  text: z.string(),
  direction: z
    .enum(["left-to-right", "right-to-left", "top-to-bottom", "bottom-to-top"])
    .default("left-to-right"),
  textStyle: TextStyleSchema.optional(),
  wipeColor: z.string().optional(),
  audio: z
    .object({
      src: z.string(),
      volume: z.number().optional(),
      playbackRate: z.number().optional(),
      startFrom: z.number().optional(),
      endAt: z.number().optional(),
      muted: z.boolean().optional(),
      loop: z.boolean().optional(),
    })
    .optional(),
});

// Export types for TypeScript
export type BaseAnimationConfig = z.infer<typeof BaseAnimationSchema>;
export type TextStyle = z.infer<typeof TextStyleSchema>;
export type WipeRevealConfig = z.infer<typeof WipeRevealSchema>;

// Base schema that all templates should extend
export const baseTemplateSchema = z.object({
  width: z.number().default(1080),
  height: z.number().default(1920),
  fps: z.number().default(60),
  durationInFrames: z.number().default(120),
});

// Common interface for all template props
export interface BaseTemplateProps {
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
}

// Template configuration type for registering templates
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  component: React.FC<any>;
  schema: z.ZodType<any>;
  defaultProps: any;
  variants?: Record<string, any>;
}
