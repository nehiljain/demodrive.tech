import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"
import { CSSProperties } from "react"

const MOBILE_HEIGHT = 250
const DESKTOP_HEIGHT = 350

const VIDEOS = [
  {
    url: "https://storage.googleapis.com/demodrive-media/video_assets/real-estate-mls-listing/Real%20Estate%20Video%20Re%20Music.mp4",
    aspectRatio: "16/9",
    mobileWidth: (16/9) * MOBILE_HEIGHT, // 16:9 ratio with mobile height
    desktopWidth: (16/9) * DESKTOP_HEIGHT, // 16:9 ratio with desktop height
  },
  {
    url: "https://storage.googleapis.com/demodrive-media/20250128/output/www_getmaple_ca__2025_01_28_134124/istockphoto-2068759257-640_adpp_is.mp4",
    aspectRatio: "16/9",
    mobileWidth: (16/9) * MOBILE_HEIGHT, // 16:9 ratio with mobile height
    desktopWidth: (16/9) * DESKTOP_HEIGHT, // 16:9 ratio with desktop height
  },
  {
    url: "https://storage.googleapis.com/demodrive-media/20250128/output/www_getmaple_ca__2025_01_28_134124/161455-823541644_small.mp4",
    aspectRatio: "9/16",
    mobileWidth: (9/16) * MOBILE_HEIGHT, // 9:16 ratio with mobile height
    desktopWidth: (9/16) * DESKTOP_HEIGHT, // 9:16 ratio with desktop height
  }
]

const VideoCard = ({ url, aspectRatio, mobileWidth, desktopWidth }: {
  url: string;
  aspectRatio: string;
  mobileWidth: number;
  desktopWidth: number;
}) => {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-xl border mx-2",
      )}
      style={{
        width: `var(--card-width)`,
        "--card-width": `${mobileWidth}px`,
        "@media(minWidth: 768px)": {
          "--card-width": `${desktopWidth}px`
        }
      } as CSSProperties}
    >
      <video
        className="h-[250px] md:h-[350px] w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ aspectRatio }}
        src={url}
      />
    </div>
  )
}

const videos = VIDEOS

export function VideoMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-4 bg-background/10 backdrop-blur-sm rounded-xl">
      <Marquee pauseOnHover className="[--duration:30s]">
        {videos.map((video, idx) => (
          <VideoCard key={idx} {...video} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#363034] to-transparent z-10" /> */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10 opacity-70 rounded-xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10 opacity-70 rounded-xl" />
    </div>
  )
}