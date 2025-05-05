import { useEffect, useRef, useState } from 'react';
// Video loading component with better error handling
export const VideoPlayer = ({
    src,
    className = '',
    aspectRatio = 'aspect-video',
    objectFit = 'object-cover'
}: {
    src: string;
    className?: string;
    aspectRatio?: string;
    objectFit?: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleLoadedData = () => {
            setIsLoading(false);
            videoElement.play().catch(() => {
                // Handle any play promise rejection silently
            });
        };

        const handleError = () => {
            setHasError(true);
            setIsLoading(false);
            console.error(`Error loading video: ${src}`);
        };

        videoElement.load();

        videoElement.addEventListener('loadeddata', handleLoadedData);
        videoElement.addEventListener('error', handleError);

        return () => {
            videoElement.removeEventListener('loadeddata', handleLoadedData);
            videoElement.removeEventListener('error', handleError);
        };
    }, [src]);

    return (
        <div className={`relative ${aspectRatio} w-full overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
                </div>
            )}

            <video
                ref={videoRef}
                className={`w-full h-full rounded-lg ${objectFit}`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                src={src}
            />

            {hasError && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <p className="text-sm text-red-400">Failed to load video</p>
                </div>
            )}
        </div>
    );
};
