import { cn } from '@/lib/utils'

interface HeroVideoProps {
	className?: string
	title?: string
	poster?: string
}

export function HeroVideo({
	className,
	title,
	poster
}: HeroVideoProps) {
	return (
		<div className={cn('mt-16 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-primary/20', className)}>
			<video
				src="https://storage.googleapis.com/demodrive-media/20250203/output/DemoDrive_Product_Video_20250203_122007/Demodrive_Quick_Product_Videos_Promo.mp4"
				title={title}
				poster={poster}
				controls
				className="aspect-video w-full"
				style={{ height: '100%', width: '100%' }}
			>
				Your browser does not support the video tag.
			</video>
		</div>
	)
}
