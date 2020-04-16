import React from 'react'
import {
  IonPage,
  IonContent,
  IonButton,
  useIonViewWillLeave,
} from '@ionic/react'
import { useHistory } from 'react-router'
import useStore from '../useStore'

import emoji from 'node-emoji'

const GameOver = () => {
  const history = useHistory()
  const { points, resetState } = useStore()

  useIonViewWillLeave(() => {
    resetState()
  })

  const navigateNext = () => history.push('/')

  return (
    <IonPage>
      <IonContent className="text-center">
        <h1 className="text-2xl font-extrabold mt-20">Game Over</h1>
        <p
          style={{ fontFamily: 'Twitter Color Emoji' }}
          className="text-10xl mt-3"
        >
          {emoji.get('disappointed_relieved')}
        </p>

        <p className="mt-5">You scored</p>
        <p className="text-2xl font-bold">{points}</p>
        <p>Points</p>

        <IonButton className="mt-16" onClick={navigateNext}>
          Start again
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default GameOver
