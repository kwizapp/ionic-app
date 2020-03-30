import React from 'react'
import { IonPage, IonContent, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'

const Failure = () => {
  const history = useHistory()

  const navigateGameOver = () => history.push('/gameover')
  const navigateNext = () => history.push('/trivia')

  return (
    <IonPage>
      <IonContent>
        <h1>Failure Screen</h1>

        <p>
          Either the player loses a life and then continues to the Trivia
          Screen, or the player is directly redirected to the Game Over screen
          where the players performance is summarized
        </p>

        <IonButton onClick={navigateNext}>Trivia</IonButton>
        <IonButton color="primary" onClick={navigateGameOver}>
          Game Over
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Failure
