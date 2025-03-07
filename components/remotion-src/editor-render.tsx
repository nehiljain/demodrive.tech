import { registerRoot, Composition } from "remotion";
import { AbsoluteFill, Sequence, OffthreadVideo, Audio } from "remotion";
import React from "react";
import { getAnimationById } from "@/components/remotion-src/components/animations/registry";

// Import all animations to ensure they're registered
import "@/components/remotion-src/components/animations";

// Types for timeline items (same as in your editor)
type BaseItem = {
  from: number;
  durationInFrames: number;
  id: string;
};

type SolidItem = BaseItem & {
  type: "solid";
  color: string;
};

type TextItem = BaseItem & {
  type: "text";
  text: string;
  color: string;
};

type VideoItem = BaseItem & {
  type: "video";
  src: string;
};

// Generic type for dynamically registered animations
type AnimationItem = BaseItem & {
  type: string;
  [key: string]: unknown;
};

type VoiceItem = BaseItem & {
  type: "voice";
  src: string;
  volume: number;
};

type Item = SolidItem | TextItem | VideoItem | AnimationItem | VoiceItem;

type Track = {
  name: string;
  items: Item[];
};

// Components to render items
const ItemComp: React.FC<{
  item: Item;
}> = ({ item }) => {
  if (item.type === "solid") {
    return <AbsoluteFill style={{ backgroundColor: item.color }} />;
  }

  if (item.type === "text") {
    return (
      <AbsoluteFill className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">{item.text}</h1>
      </AbsoluteFill>
    );
  }

  if (item.type === "video") {
    return (
      <AbsoluteFill>
        <OffthreadVideo
          src={item.src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </AbsoluteFill>
    );
  }

  if (item.type === "voice") {
    return (
      <AbsoluteFill>
        <Audio src={item.src} volume={item.volume || 1} />
      </AbsoluteFill>
    );
  }
  // For registered animations, look up the component in the registry
  const animationEntry = getAnimationById(item.type);
  if (animationEntry) {
    const AnimationComponent = animationEntry.component;
    return (
      <AbsoluteFill>
        <AnimationComponent {...item} />
      </AbsoluteFill>
    );
  }

  throw new Error(`Unknown item type: ${JSON.stringify(item)}`);
};

// Track component
const TrackRenderer: React.FC<{
  track: Track;
}> = ({ track }) => {
  return (
    <AbsoluteFill>
      {track.items.map((item) => (
        <Sequence
          key={item.id}
          from={item.from}
          durationInFrames={item.durationInFrames}
        >
          <ItemComp item={item} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// Main composition component
const EditorVideoComposition: React.FC<{
  tracks: Track[];
}> = ({ tracks }) => {
  return (
    <AbsoluteFill className="bg-gray-900">
      {tracks.map((track) => (
        <TrackRenderer track={track} key={track.name} />
      ))}
    </AbsoluteFill>
  );
};

// Register the root component
const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EditorVideoComposition"
        component={EditorVideoComposition}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          tracks: [],
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
