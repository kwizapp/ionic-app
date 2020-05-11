import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react'
import React from 'react'

import KwizAnimated from './animations/KwizAnimated'

/**
 * Fullscreen loading animation used for when data is still in flight and not completely loaded
 */
const Loading = () => {
  return (
    <div
      className="flex items-center justify-center h-full"
      style={{
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
              <IonCol className="pt-5">
                <IonText className="text-center">
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
