import './Poster.css'

import {
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { flash, heart, heartOutline } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import { QUESTION_TIME } from '../settings'

function Poster(): React.ReactElement {
  // ref to interval, gets cleared on page leave
  const countDownRef = useRef<any>()

  const [secondsRemaining, setSecondsRemaining] = useState(11)

  const history = useHistory()

  const navigateNext = () => history.push('/question')

  // [enter] Ionic lifecycle hook
  useIonViewWillEnter(() => {
    setSecondsRemaining(QUESTION_TIME)
    countDownRef.current = setInterval(() => {
      setSecondsRemaining(prevSeconds => {
        if (prevSeconds <= 1) {
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)
  })

  // [leave] Ionic lifecycle hook
  useIonViewWillLeave(() => {
    // clean up interval
    clearInterval(countDownRef.current)
  })

  useEffect(() => {
    // go to next screen if time is up
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
