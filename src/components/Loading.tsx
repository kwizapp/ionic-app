import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react'
import React from 'react'

import KwizAnimated from './animations/KwizAnimated'

const Loading = () => {
  return (
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
                <IonText class="ion-text-center">
                  <p>Loading...</p>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonRow>
      </IonGrid>
    </div>
  )
}

export default Loading
