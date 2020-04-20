import { IonIcon } from '@ionic/react'
import { heart, heartOutline } from 'ionicons/icons'
import React from 'react'

function generateLiveDisplay(livesTotal: number, livesRemaining: number) {
  const usedLives = Array(livesTotal - livesRemaining)
    .fill(0)
    .map((_, ix) => <IonIcon key={ix + 'used-lives'} icon={heartOutline} />)

  const remainingLives = Array(livesRemaining)
    .fill(0)
    .map((_, ix) => <IonIcon key={ix + 'remaining-lives'} icon={heart} />)

  return [...usedLives, ...remainingLives]
}

interface Props {
  livesTotal: number
  livesRemaining: number
}

const LifeDisplay = ({ livesTotal, livesRemaining }: Props) => {
  return <div>{generateLiveDisplay(livesTotal, livesRemaining)}</div>
}

export default LifeDisplay
