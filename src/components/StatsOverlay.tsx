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

const StatsOverlay = () => {
  const lives = useStore(state => state.lives)
  const points = useStore(state => state.points)

  const liveDisplay = generateLiveDisplay(3, lives)

  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full p-4">
      <div className="paper">
        <div className="flex items-center px-1 text-xl font-extrabold">
          <IonIcon icon={flash} />
          {points}
        </div>
      </div>
      <div className="paper">
        <div className="flex items-center px-1 text-xl text-red-600">
          {liveDisplay}
        </div>
      </div>
    </div>
  )
}

export default StatsOverlay
