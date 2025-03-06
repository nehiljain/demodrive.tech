// Export all animation components for reuse
export { FadeReveal } from "./FadeReveal";
export { WipeReveal } from "./WipeReveal";
export { VideoReveal } from "./VideoReveal";
export { LogoReveal } from "./LogoReveal";
export { LogoAnimation } from "./LogoAnimation";
export { ImageScrollReveal } from "./ImageScrollReveal";
export { BounceReveal } from "./BounceReveal";
export { TypewriterReveal } from "./TypewriterReveal";
export { DirectionalBlurReveal } from "./DirectionalBlurReveal";
export { OpacityFlashReveal } from "./OpacityFlashReveal";
export { UnderlineReveal } from "./UnderlineReveal";
export { RectangleStackReveal } from "./RectangleStackReveal";
export { MetricReveal } from "./MetricReveal";
// export { EmojiReveal } from "./EmojiReveal";
export { StaggeredTextReveal } from "./StaggeredTextReveal";
export { D3BarChart } from "./D3BarChart";
export { D3LineChart } from "./D3LineChart";
export { VideoZoomReveal } from "./VideoZoomReveal";

// This file ensures all animations are registered

// Import all animations to trigger their registration
import "./BounceReveal";
import "./D3BarChart";
import "./D3LineChart";
import "./DirectionalBlurReveal";
// import "./EmojiReveal";
import "./FadeReveal";
import "./ImageScrollReveal";
import "./LogoAnimation";
import "./LogoReveal";
import "./MetricReveal";
import "./OpacityFlashReveal";
import "./RectangleStackReveal";
import "./StaggeredTextReveal";
import "./TypewriterReveal";
import "./UnderlineReveal";
import "./VideoReveal";
import "./WipeReveal";
import "./VideoZoomReveal";
// Re-export the registry functions for use elsewhere
export {
  getAllAnimations,
  getAnimationById,
  getAnimationsByCategory,
} from "./registry";
