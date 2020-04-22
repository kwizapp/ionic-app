import { IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { animated, config, useSpring } from 'react-spring'

function generateHearts(livesTotal: number, livesRemaining: number) {
  const usedLives = Array(livesTotal - livesRemaining)
    .fill(0)
    .map(() => ({ full: false }))

  const remainingLives = Array(livesRemaining)
    .fill(0)
    .map(() => ({ full: true }))

  return [...usedLives, ...remainingLives]
}

interface HeartProps {
  full: boolean
}

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

interface Props {
  livesTotal: number
  livesRemaining: number
}

const Hearts = ({ livesTotal, livesRemaining }: Props) => {
  const [hearts, setHearts] = useState(
    generateHearts(livesTotal, livesRemaining),
  )

  useEffect(() => {
    setHearts(generateHearts(livesTotal, livesRemaining))
  }, [livesTotal, livesRemaining])

  return (
    <div className="flex w-64 mx-auto">
      {hearts.map((h: any, ix: number) => {
        return <Heart key={ix} full={h.full} />
      })}
    </div>
  )
}

export default Hearts
