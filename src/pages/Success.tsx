import React from 'react'
import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'

const Success = () => {
  const history = useHistory()

  const navigateNext = () => history.push('/trivia')

  return (
    <IonPage>
      <IonContent>
        <h1>Success Screen</h1>

        <IonButton onClick={navigateNext}>Trivia</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Success
