import { Plugins } from '@capacitor/core'
import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import KwizAnimated from '../components/animations/KwizAnimated'
import useStore from '../useStore'

const { Storage } = Plugins

const Home = () => {
  const history = useHistory()

  const { setState } = useStore()

  useEffect(() => {
    // initialize the game state using the capacitor storage api
    const initializeGameState = async () => {
      const gameState = await Storage.get({ key: 'GameState ' })
      if (gameState.value) {
        setState(JSON.parse(gameState.value))
      }
    }
    initializeGameState()
  }, [setState])

  const navigateNext = () => history.push('/poster')

  return (
    <IonPage id="home-page">
      <IonContent fullscreen onClick={navigateNext}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'linear-gradient(0deg, rgba(173,220,244,1) 0%, rgba(235,250,248,1) 100%)',
          }}
        >
          <div>
            <IonGrid>
              <IonRow>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <KwizAnimated />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol class="ion-padding-top">
                      <IonImg src="assets/app_title.svg" />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol class="ion-text-center">
                      <IonText>
                        <p>tap screen to start playing</p>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
