
import { FileText, Bell } from 'lucide-react';
import {VideoPlayer} from '@/components/video-player';
import React from 'react';


export const MagicFeatureCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature Card 1 - horizontal (16:9) */}
            <div className="relative h-[280px] md:h-[350px] overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0">
                    <VideoPlayer
                        src="https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+photos+to+motion.mp4"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
                    <div className="flex items-center mb-2">
                        <FileText className="h-5 w-5 md:h-6 md:w-6 text-white mr-2" />
                        <h3 className="font-bold text-xl md:text-2xl text-white">Photos to Motion Magic</h3>
                    </div>
                    <p className="text-sm md:text-base text-white/90">Take photos of your listing and turn them into a video using AI moving the camera around.</p>
                </div>
            </div>

            {/* Feature Card 3 - horizontal (16:9) */}
            <div className="relative h-[280px] md:h-[350px] overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0">
                    <VideoPlayer
                        src="https://prod-assets.demodrive.tech/video_uploads/landing_page/listing+shorts+ai+-+features+beat+sync.mp4"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
                    <div className="flex items-center mb-2">
                        <Bell className="h-5 w-5 md:h-6 md:w-6 text-white mr-2" />
                        <h3 className="font-bold text-xl md:text-2xl text-white">Auto sync with Music</h3>
                    </div>
                    <p className="text-sm md:text-base text-white/90">Automatic syncing of music to the video to make every transition feel perfect.</p>
                </div>
            </div>
        </div>
    );
}
