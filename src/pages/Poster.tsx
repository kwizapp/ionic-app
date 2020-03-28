import './Poster.css'

import {
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
} from '@ionic/react'
import { flash, heart, heartOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

function Poster(): React.ReactElement {
  const [secondsRemaining, setSecondsRemaining] = useState(11)

  const history = useHistory()

  const navigateNext = () => history.push('/question')

  useEffect(() => {
    const trigger = setInterval(() => {
      setSecondsRemaining(prevSeconds => {
        if (prevSeconds <= 1) {
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    return () => {
      clearInterval(trigger)
    }
  }, [])

  useEffect(() => {
    if (secondsRemaining === 0) navigateNext()
  }, [secondsRemaining])

  return (
    <IonPage
      id="poster"
      onClick={navigateNext}
      className={`remaining-${secondsRemaining}`}
    >
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
