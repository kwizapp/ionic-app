import { IonIcon } from '@ionic/react'
import { flash } from 'ionicons/icons'
import React from 'react'

import useStore from '../useStore'
import LifeDisplay from './LifeDisplay'

const StatsOverlay = () => {
  const lives = useStore(state => state.lives)
  const livesTotal = useStore(state => state.livesTotal)
  const points = useStore(state => state.points)

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
          <LifeDisplay livesTotal={livesTotal} livesRemaining={lives} />
        </div>
      </div>
    </div>
  )
}

export default StatsOverlay
