import './Home.css'

import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
} from '@ionic/react'
import { playCircleOutline } from 'ionicons/icons'
import React from 'react'

function Home(): React.ReactElement {
  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonImg src="assets/kwiz_logo.png" />
        <IonText>I like to movie movie ...</IonText>
        <IonFab vertical="bottom" horizontal="center">
          <IonFabButton color="primary" routerLink={'/poster'}>
            <IonIcon icon={playCircleOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Home
