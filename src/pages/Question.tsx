import React from 'react'
import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'
import Stats from './Stats'

const Question = () => {
  const history = useHistory()

  const navigateSuccess = () => history.push('/success')
  const navigateFailure = () => history.push('/failure')

  return (
    <IonPage>
      <IonContent>
        <h1>Question Screen</h1>
        <IonButton color="primary" onClick={navigateSuccess}>
          Success
        </IonButton>
        <IonButton color="primary" onClick={navigateFailure}>
          Failure
        </IonButton>
      </IonContent>

      <Stats />
    </IonPage>
  )
}

export default Question
