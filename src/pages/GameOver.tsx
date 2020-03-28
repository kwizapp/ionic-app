import React from 'react'
import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'

const GameOver = () => {
  const history = useHistory()

  const navigateNext = () => history.push('/')

  return (
    <IonPage>
      <IonContent>
        <h1>GameOver Screen</h1>

        <IonButton onClick={navigateNext}>Back to Menu</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default GameOver
