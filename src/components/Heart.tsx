import { IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import React from 'react'
import { animated, config, useSpring } from 'react-spring'

interface HeartProps {
  /** Defined if the heart should be filled or only outlined */
  full: boolean
}

/**
 * Displays one heart/live of the player that is either full or outlined
 */
const Heart = ({ full }: HeartProps) => {
  const props = useSpring({
    opacity: full ? 1 : 0,
    transform: full ? 'scale(1.0)' : 'scale(0)',
    config: config.molasses,
  })

  return (
    <div className="relative w-full">
      <animated.div style={props} className="absolute">
        <IonIcon icon={heart} />
      </animated.div>
      <animated.div className="absolute">
        <IonIcon icon={heartOutline} />
      </animated.div>
    </div>
  )
}

export default Heart
