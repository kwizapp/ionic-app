import { CreateAnimation } from '@ionic/react'
import React, { useEffect, useRef } from 'react'

interface Props {
  /** The number of seconds until totally unblurred */
  duration?: number
  /** The child component to wrap with the animation */
  children: JSX.Element
}

/**
 * Wraps a child component with a custom Ionic Animation
 * that applies a fading blur effect.
 */
const BlurAnimated = ({ duration, children }: Props) => {
  const animationRef = useRef<any>()

  useEffect(() => {
    animationRef.current.animation.play()
  }, [])

  return (
    <CreateAnimation
      ref={animationRef}
      duration={duration || 9000}
      fromTo={{
        property: 'filter',
        fromValue: 'blur(15px)',
        toValue: 'blur(0px)',
      }}
    >
      {children}
    </CreateAnimation>
  )
}

export default BlurAnimated
