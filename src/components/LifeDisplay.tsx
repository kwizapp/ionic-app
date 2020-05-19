import { IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import React from 'react'

function generateLiveDisplay(livesTotal: number, livesRemaining: number) {
  const usedLives = Array(livesTotal - livesRemaining)
    .fill(0)
    .map((_, ix) => (
      <IonIcon size="large" key={ix + 'used-lives'} icon={heartOutline} />
    ))

  const remainingLives = Array(livesRemaining)
    .fill(0)
    .map((_, ix) => (
      <IonIcon size="large" key={ix + 'remaining-lives'} icon={heart} />
    ))

  return [...usedLives, ...remainingLives]
}

interface Props {
  /** The number of lives total */
  livesTotal: number
  /** The number of lives remaining */
  livesRemaining: number
}

/**
 * The lives component in the `<StatsOverlay />` component. Is displayed in the bottom right corner.
 */
const LifeDisplay = ({ livesTotal, livesRemaining }: Props) => {
  return <div>{generateLiveDisplay(livesTotal, livesRemaining)}</div>
}

export default LifeDisplay
