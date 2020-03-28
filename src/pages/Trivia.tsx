import React from 'react'
import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'

const Trivia = () => {
  const history = useHistory()

  const navigateNext = () => history.push('/poster')

  return (
    <IonPage>
      <IonContent>
        <h1>Trivia Screen</h1>

        <IonButton onClick={navigateNext}>Next Question</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Trivia
