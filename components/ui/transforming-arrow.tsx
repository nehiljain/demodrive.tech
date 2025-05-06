'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowDown, MinusIcon } from 'lucide-react' // Using ArrowDown for vertical flow on mobile

const words = ['Motion Magic', 'Voiceover', 'Beat Sync', 'Custom Brand']

/**
 * Renders an animated arrow component with rotating text indicating
 * the transformation process from images to video.
 */
export function TransformingArrow() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const typingSpeed = useRef(40) // Increased speed by 50% (from 120 to 80ms)
  const deletingSpeed = useRef(20) // Increased speed by 50% (from 50 to 33ms)
  const pauseBeforeDelete = useRef(2000) // Pause before deleting
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Handle typewriter effect
    const handleTyping = () => {
      const currentWord = words[currentWordIndex]

      if (!isDeleting) {
        // Typing forward
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1))
          timer = setTimeout(handleTyping, typingSpeed.current)
        } else {
          // Pause before deleting
          timer = setTimeout(() => {
            setIsDeleting(true)
            handleTyping()
          }, pauseBeforeDelete.current)
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(currentWord.slice(0, typedText.length - 1))
          timer = setTimeout(handleTyping, deletingSpeed.current)
        } else {
          // Move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
          timer = setTimeout(handleTyping, typingSpeed.current)
        }
      }
    }

    timer = setTimeout(handleTyping, typingSpeed.current)

    return () => clearTimeout(timer)
  }, [currentWordIndex, typedText, isDeleting])

  return (
    <div className="flex flex-col items-center justify-center w-auto sm:w-28 h-auto gap-2 text-center">
      {/* Text Container with border and animation */}
      <MinusIcon className="w-8 h-8 sm:w-10 sm:h-10 md:hidden lg:hidden xl:hidden text-primary transform rotate-90 sm:rotate-90 mt-1" />
      <div className="h-8 flex items-center justify-center min-w-[120px] px-3 py-1 rounded-lg border border-accent bg-black/10 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center">
          <span className="block text-sm font-medium text-accent">
            {typedText}
          </span>
          <span className="text-accent border-r-2 border-accent h-5 ml-0.5 animate-blink"></span>
        </div>
      </div>

      {/* Arrow Icon - Rotates from down (mobile) to right (desktop) */}
      <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8 text-primary transform rotate-0 sm:rotate-[-90deg] mt-1 animate-bounce-subtle" />
    </div>
  )
}

// Add these animations to your globals.css or equivalent
/*
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(3px) rotate(0deg);
  }
}

@media (min-width: 640px) {
  @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0) rotate(-90deg);
    }
    50% {
      transform: translateY(0) translateX(3px) rotate(-90deg);
    }
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 1.5s ease-in-out infinite;
}
*/
