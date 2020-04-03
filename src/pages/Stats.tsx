import './Stats.css'

import React from 'react'
import { flash, heart, heartOutline } from 'ionicons/icons'
import { IonIcon } from '@ionic/react'

import useStore from '../useStore'

function generateLiveDisplay(livesTotal: number, livesRemaining: number) {
  const usedLives = Array(livesTotal - livesRemaining)
    .fill(0)
    .map((_, ix) => <IonIcon key={ix} icon={heartOutline} />)

  const remainingLives = Array(livesRemaining)
    .fill(0)
    .map((_, ix) => <IonIcon key={ix} icon={heart} />)

  return [...usedLives, ...remainingLives]
}

const Stats = () => {
  const lives = useStore(state => state.lives)
  const points = useStore(state => state.points)

  const liveDisplay = generateLiveDisplay(3, lives)

  return (
    <div id="stats">
      <div className="paper">
        <div id="points">
          <IonIcon icon={flash} />
          {points}
        </div>
      </div>
      <div className="paper">
        <div id="lives">{liveDisplay}</div>
      </div>
    </div>
  )
}

export default Stats
