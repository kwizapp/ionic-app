import React from 'react'
import {
  IonContent,
  IonImg,
  IonPage,
  IonIcon,
  IonFab,
  IonFabButton,
  IonText,
} from '@ionic/react'
import { playCircleOutline } from 'ionicons/icons'

import './Home.css'

function Home(): React.ReactElement {
  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonImg src="assets/kwiz_logo.png" />
        <IonText>I like to movie movie ...</IonText>
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton color="primary" routerLink="/poster">
            <IonIcon icon={playCircleOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Home
