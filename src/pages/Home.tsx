import './Home.css'

import {
  CreateAnimation,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router'

function Home(): React.ReactElement {
  const animationRef = useRef<React.RefObject<CreateAnimation> | any>()

  const history = useHistory()

  const navigateNext = () => history.push('/poster')

  useEffect(() => {
    animationRef.current?.animation.play()
  }, [])

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
              <IonRow class="ion-align-items-center">
                <IonGrid>
                  <IonRow class="ion-align-items-center">
                    <IonCol size="7">
                      <CreateAnimation
                        ref={animationRef}
                        duration={200}
                        iterations={Infinity}
                        keyframes={[
                          {
                            offset: 0,
                            background:
                              'url(assets/kwiz_logo_frame_1.svg) no-repeat',
                          },
                          {
                            offset: 0.25,
                            background:
                              'url(assets/kwiz_logo_frame_2.svg) no-repeat',
                          },
                          {
                            offset: 0.5,
                            background:
                              'url(assets/kwiz_logo_frame_3.svg) no-repeat',
                          },
                          {
                            offset: 1,
                            background:
                              'url(assets/kwiz_logo_frame_4.svg) no-repeat',
                          },
                        ]}
                      >
                        <div style={{ height: '120px' }}></div>
                      </CreateAnimation>
                    </IonCol>
                    <IonCol>
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
