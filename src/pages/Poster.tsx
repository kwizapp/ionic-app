import React, { useState, useEffect } from 'react'
import {
  IonContent,
  IonPage,
  IonText,
  IonFooter,
  IonIcon,
  IonImg,
} from '@ionic/react'
import { heart, flash, heartOutline } from 'ionicons/icons'

import './Poster.css'

function Poster({ history }: any): React.ReactElement {
  const [secondsRemaining, setSecondsRemaining] = useState(11)

  useEffect(() => {
    const trigger = setInterval(() => {
      setSecondsRemaining(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(trigger)
          history.push('/')
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => {
      clearInterval(trigger)
    }
  }, [])

  return (
    <IonPage id="poster" className={`remaining-${secondsRemaining}`}>
      <IonContent>
        <IonText>
          <h1>Guess the movie title</h1>
        </IonText>
        <div id="poster-container">
          <div id="timer">{secondsRemaining}</div>
          <IonImg src="assets/poster_witcher.png" />
        </div>
      </IonContent>
      <IonFooter>
        <div id="points">
          <IonIcon icon={flash} />
          12&apos;489
        </div>
        <div id="lives">
          <IonIcon icon={heartOutline} />
          <IonIcon icon={heart} />
          <IonIcon icon={heart} />
        </div>
      </IonFooter>
    </IonPage>
  )
}

export default Poster
