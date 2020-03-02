import './Home.css'

import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'

function Home(): React.ReactElement {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>kwiz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1JyjpozrR0uxtS0ddishQwHaFP%26pid%3DApi&f=1" />
        <IonButton routerLink="/poster">START</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Home
