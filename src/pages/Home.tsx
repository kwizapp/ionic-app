import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import KwizAnimated from '../components/animations/KwizAnimated'
import { useStorage } from '../useStorage'

/**
 * ### The Start Screen
 *
 * Displays a splash screen with a simple animation.
 *
 * Shown if...
 * * game is started
 */
const Home = () => {
  useStorage()

  const history = useHistory()

  const navigateNext = () => history.push('/poster')

  return (
    <IonPage>
      <IonContent fullscreen onClick={navigateNext}>
        <div
          className="flex items-center justify-center h-full"
          style={{
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
