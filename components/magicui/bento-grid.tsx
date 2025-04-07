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
        "mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4",
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
        "group relative min-h-[15rem] overflow-hidden rounded-xl border border-accent/10 bg-card/60 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        {background}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/70 to-background/20" />
        {/* Additional blur effect behind text */}
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10">
        <div className="mb-2 flex items-center gap-2 bg-card/80 w-fit px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm border border-accent/10">
          {Icon && <Icon className="h-5 w-5 text-accent" />}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <div className="mt-4 bg-card/80 p-4 rounded-lg shadow-sm backdrop-blur-sm border border-accent/5">
          <p className="text-sm text-muted-foreground">{description}</p>
          {href && cta && (
            <a
              href={href}
              className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
            >
              {cta}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}