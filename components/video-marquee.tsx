import { cn } from "@/lib/utils"
import { Marquee } from "@/components/magicui/marquee"
import { CSSProperties, useEffect, useRef, useState } from "react"

const MOBILE_HEIGHT = 250
const DESKTOP_HEIGHT = 350

const VIDEOS = [
  {
    video_url: "https://dev-assets.demodrive.tech/renders/a6ce3c29-e096-40e4-9219-f92957f14f24/a6ce3c29-e096-40e4-9219-f92957f14f24.mp4",
    aspect_ratio: "16/9",
    mobileWidth: (16/9) * MOBILE_HEIGHT, // 16:9 ratio with mobile height
    desktopWidth: (16/9) * DESKTOP_HEIGHT, // 16:9 ratio with desktop height
  },
  {
    video_url: "https://stage-assets.demodrive.tech/renders/f04ff643-c7eb-40d8-ba8b-fb955f00ae36/f04ff643-c7eb-40d8-ba8b-fb955f00ae36.mp4",
    aspect_ratio: "16/9",
    mobileWidth: (16/9) * MOBILE_HEIGHT, // 16:9 ratio with mobile height
    desktopWidth: (16/9) * DESKTOP_HEIGHT, // 16:9 ratio with desktop height
  },
  {
    video_url: "https://stage-assets.demodrive.tech/renders/ef1b0268-64fa-4127-b1e6-72e6cace6e83/ef1b0268-64fa-4127-b1e6-72e6cace6e83.mp4",
    aspect_ratio: "9/16", // Keeping original aspect ratio for this one
    mobileWidth: (9/16) * MOBILE_HEIGHT, // 9:16 ratio with mobile height
    desktopWidth: (9/16) * DESKTOP_HEIGHT, // 9:16 ratio with desktop height
  },
  {
    video_url: "https://prod-assets.demodrive.tech/renders/96434281-5667-433d-809a-67273ad1de05/96434281-5667-433d-809a-67273ad1de05.mp4",
    aspect_ratio: "16/9", // Assuming 16:9 aspect ratio
    mobileWidth: (16/9) * MOBILE_HEIGHT, // 16:9 ratio with mobile height
    desktopWidth: (16/9) * DESKTOP_HEIGHT, // 16:9 ratio with desktop height
  },
  {
    video_url: "https://prod-assets.demodrive.tech/renders/43331d38-62d4-4d41-84ff-79a7a5c99a37/43331d38-62d4-4d41-84ff-79a7a5c99a37.mp4",
    aspect_ratio: "16/9", // Assuming 16:9 aspect ratio
    mobileWidth: (16/9) * MOBILE_HEIGHT, // 16:9 ratio with mobile height
    desktopWidth: (16/9) * DESKTOP_HEIGHT, // 16:9 ratio with desktop height
  }
]

/**
 {
  {
    "id": "57f75871-d796-4905-b7bc-7c59e6f5587a",
    "name": "Video Pipeline Run 2025-04-08 20:05:26 - Auto Render",
    "video_url": "https://dev-assets.demodrive.tech/renders/57f75871-d796-4905-b7bc-7c59e6f5587a/57f75871-d796-4905-b7bc-7c59e6f5587a.mp4",
    "thumbnail_url": null,
    "aspect_ratio": "9:16"
  },

 */
interface IVideo{
  id?: string;
  name?: string;
  video_url: string;
  thumbnail_url?: string;
  aspect_ratio: string;
  mobileWidth: number;
  desktopWidth: number;
}
const VideoCard = ({ video }: {
  video: IVideo;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleTimeUpdate = () => {
      if (videoElement.duration && videoElement.currentTime >= videoElement.duration - 2.5) {
        videoElement.currentTime = 0
        videoElement.play().catch(() => {
          // Handle any play promise rejection silently
        })
      }
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      videoElement.play().catch(() => {
        // Handle any play promise rejection silently
      })
    }

    const handleError = () => {
      setHasError(true)
      setIsLoading(false)
      console.error(`Error loading video: ${video.video_url}`)
    }

    // Try loading the video explicitly
    videoElement.load()

    // Set up event listeners
    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('loadeddata', handleLoadedData)
    videoElement.addEventListener('error', handleError)

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('loadeddata', handleLoadedData)
      videoElement.removeEventListener('error', handleError)
    }
  }, [video.video_url])

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-xl border mx-2",
      )}
      style={{
        width: `var(--card-width)`,
        "--card-width": `${video.mobileWidth}px`,
        "@media(minWidth: 768px)": {
          "--card-width": `${video.desktopWidth}px`
        }
      } as CSSProperties}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        className="h-[250px] md:h-[350px] w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ aspectRatio: video.aspect_ratio }}
        src={video.video_url}
        onCanPlay={() => setIsLoading(false)}
      />

      {hasError && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <p className="text-sm text-red-400">Failed to load video</p>
        </div>
      )}
    </div>
  )
}

// const getAspectRatio = (aspect_ratio: string) => {
//   const [width, height] = aspect_ratio.split(':').map(Number);
//   return width / height;
// }


export function VideoMarquee() {
  // const [videos, setVideos] = useState<IVideo[]>([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/render-videos/featured/public/", {
  //     method: "GET",
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       data.forEach((video: IVideo) => {
  //         video.mobileWidth = getAspectRatio(video.aspect_ratio) * MOBILE_HEIGHT;
  //         video.desktopWidth = getAspectRatio(video.aspect_ratio) * DESKTOP_HEIGHT;
  //       });
  //       setVideos(data);
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching featured videos:', error);
  //     });
  // }, []);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-4 bg-background/10 backdrop-blur-sm rounded-xl">
      <Marquee pauseOnHover className="[--duration:30s]">
        {VIDEOS.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#363034] to-transparent z-10" /> */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent z-10 opacity-70 rounded-xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent z-10 opacity-70 rounded-xl" />
    </div>
  )
}

