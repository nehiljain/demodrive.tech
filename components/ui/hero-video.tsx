import MuxPlayer from '@mux/mux-player-react'
import { cn } from '@/lib/utils'

interface HeroVideoProps {
	playbackId: string
	className?: string
	title?: string
	poster?: string
	thumbnailTime?: number
}

export function HeroVideo({
	playbackId,
	className,
	title,
	poster,
	thumbnailTime
}: HeroVideoProps) {
	return (
		<div className={cn('mt-16 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-primary/20', className)}>
			<MuxPlayer
				playbackId={playbackId}
				metadataVideoTitle={title}
				streamType="on-demand"
				primaryColor="#ffffff"
				secondaryColor="#3a3c40"
				accentColor="#b1cc00"
				className="aspect-video w-full"
				style={{ height: '100%', width: '100%' }}
				poster={poster}
				thumbnailTime={thumbnailTime}
			/>
		</div>
	)
}