import { CreateAnimation } from '@ionic/react'
import React, { useEffect, useRef } from 'react'

/**
 * Kwizzapp Logo Animation
 *
 * Uses 4 keyframe svgs to render a moving movie-clip animation
 */
const KwizAnimated = () => {
  const animationRef = useRef<any>()

  useEffect(() => {
    animationRef.current.animation.play()
  }, [])

  return (
    <CreateAnimation
      ref={animationRef}
      duration={200}
      iterations={Infinity}
      keyframes={[
        {
          offset: 0,
          height: '114px',
          width: '100px',
          background: 'url(assets/kwiz_logo_frame_1.svg)',
        },
        {
          offset: 0.25,
          height: '114px',
          width: '100px',
          background: 'url(assets/kwiz_logo_frame_2.svg)',
        },
        {
          offset: 0.5,
          height: '114px',
          width: '100px',
          background: 'url(assets/kwiz_logo_frame_3.svg)',
        },
        {
          offset: 1,
          height: '114px',
          width: '100px',
          background: 'url(assets/kwiz_logo_frame_4.svg)',
        },
      ]}
    >
      <div
        style={{
          margin: 'auto',
        }}
      ></div>
    </CreateAnimation>
  )
}

export default KwizAnimated
