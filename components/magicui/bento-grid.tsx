import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BentoGridProps {
  className?: string
  children?: ReactNode
}

interface BentoCardProps {
  className?: string
  title: string
  description: string
  Icon?: React.ElementType
  background?: ReactNode
  href?: string
  cta?: string
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  className,
  title,
  description,
  Icon,
  background,
  href,
  cta,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-accent/10 transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Background content (image or video) */}
      <div className="absolute inset-0 z-0">
        {background}
      </div>

      {/* Text content overlay at the bottom - with higher z-index and stronger contrast */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black shadow-lg">
        <div className="relative p-6 z-30">
          {Icon && (
            <div className="absolute top-6 right-6">
              <Icon className="h-7 w-7 text-white" />
            </div>
          )}
          <h3 className="font-bold text-2xl text-white mb-3">{title}</h3>
          <p className="text-base text-white line-clamp-2">{description}</p>
          {href && cta && (
            <a
              href={href}
              className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
            >
              {cta}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}