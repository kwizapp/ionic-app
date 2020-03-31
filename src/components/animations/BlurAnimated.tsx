import { CreateAnimation } from '@ionic/react'
import React, { useEffect, useRef } from 'react'

interface Props {
  duration?: number
  children: JSX.Element
}

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
        fromValue: 'blur(50px)',
        toValue: 'blur(0px)',
      }}
    >
      {children}
    </CreateAnimation>
  )
}

export default BlurAnimated
