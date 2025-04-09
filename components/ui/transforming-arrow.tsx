'use client'

import React, { useState, useEffect } from 'react'
    import { ArrowDown, MinusIcon } from 'lucide-react' // Using ArrowDown for vertical flow on mobile

const words = ['Motion Magic', 'Beat Sync', 'Custom Brand']

/**
 * Renders an animated arrow component with rotating text indicating
 * the transformation process from images to video.
 */
export function TransformingArrow () {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000) // Change word every 1.5 seconds

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-auto sm:w-28 h-auto gap-2 text-center">
      {/* Text Container with border and animation */}
      <MinusIcon className="w-8 h-8 sm:w-10 sm:h-10 md:hidden lg:hidden xl:hidden text-primary transform rotate-90 sm:rotate-90 mt-1" />
      <div className="h-8 flex items-center justify-center min-w-[120px] px-3 py-1 rounded-lg border border-accent bg-black/10 backdrop-blur-sm">
        {/* We use a key to force re-render on word change for transition */}
        <span
          key={currentWordIndex}
          className="block text-sm font-medium text-accent animate-pulse"
        >
          {words[currentWordIndex]}
        </span>
      </div>

      {/* Arrow Icon - Rotates from down (mobile) to right (desktop) */}
      <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8 text-primary transform rotate-0 sm:rotate-[-90deg] mt-1" />
    </div>
  )
}

// Add this animation to your globals.css or equivalent
/*
@keyframes blur-in {
  from {
    opacity: 0;
    filter: blur(5px);
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.animate-blur-in {
  animation: blur-in 0.6s ease-out forwards;
}
*/
