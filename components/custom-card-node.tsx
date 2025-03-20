'use client'

import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type CustomCardNodeProps = {
  data: {
    label: string
    icon?: React.ElementType
    logoPath?: string
    description?: string
    className?: string
  }
  isConnectable?: boolean
  sourcePosition?: Position
  targetPosition?: Position
  className?: string
}

const CustomCardNode = memo(({
  data,
  isConnectable = false,
  sourcePosition,
  targetPosition,
  className,
}: CustomCardNodeProps) => {
  const IconComponent = data.icon

  return (
    <div className={cn("relative", className)}>
      {targetPosition && (
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
          className="!bg-background !border-muted-foreground"
        />
      )}
      <div className={cn(
        "min-w-[200px] flex items-center gap-3 rounded-lg border border-muted bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 p-3",
        data.className
      )}>
        {data.logoPath ? (
          <div className="relative w-6 h-6 flex-shrink-0">
            <Image
              src={data.logoPath}
              alt={data.label}
              className="object-contain"
              fill
              sizes="24px"
            />
          </div>
        ) : IconComponent && (
          <div className="flex-shrink-0 text-muted-foreground">
            <IconComponent className="h-5 w-5" />
          </div>
        )}
        <div className="flex flex-col min-w-[150px]">
          <div className="whitespace-pre-wrap">{data.label}</div>
          {data.description && (
            <p className="text-sm text-foreground line-clamp-2">{data.description}</p>
          )}
        </div>
      </div>
      {sourcePosition && (
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className="!bg-background !border-muted-foreground"
        />
      )}
    </div>
  )
})

CustomCardNode.displayName = 'CustomCardNode'

export default CustomCardNode
