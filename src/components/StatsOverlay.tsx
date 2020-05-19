import React from 'react'

import useStore from '../useStore'
import Points from './3d/Points'
import LifeDisplay from './LifeDisplay'

/**
 * Displays an overlay containing the users points and lives. The lives are displayed in `<LifeDisplay />`.
 */
const StatsOverlay = () => {
  const lives = useStore((state) => state.lives)
  const livesTotal = useStore((state) => state.livesTotal)
  const points = useStore((state) => state.points)

  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full px-2 my-2">
      <div className="shadow-lg rounded-lg p-2 h-16 w-32 flex items-center  px-1 text-xl font-extrabold">
        <Points points={points} />
      </div>

      <div className="shadow-lg rounded-lg p-2 h-16 w-32 flex items-center justify-center px-1 text-xl text-red-600">
        <div className="pt-2">
          <LifeDisplay livesTotal={livesTotal} livesRemaining={lives} />
        </div>
      </div>
    </div>
  )
}

export default StatsOverlay
