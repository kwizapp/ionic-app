import React from 'react'
import { IonContent, IonPage, IonImg, IonFooter } from '@ionic/react'

import './Poster.css'

function Poster(): React.ReactElement {
  return (
    <IonPage id="poster">
      <IonContent fullscreen>
        <p>Guess the Movie Title</p>
        <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgamespot1.cbsistatic.com%2Fuploads%2Foriginal%2F1582%2F15828986%2F3606754-witcher%2520poster.jpg&f=1&nofb=1" />
      </IonContent>
      <IonFooter>POINTS HEARTS</IonFooter>
    </IonPage>
  )
}

export default Poster
