import React from 'react'
import { IonButton } from '@ionic/react'
import { useHistory } from 'react-router'
import StatsLayout from '../components/layouts/StatsLayout'
import useStore from '../useStore'

const Failure = () => {
  const history = useHistory()

  const lives = useStore(state => state.lives)

  const navigateNext = () => {
    history.push(lives === 0 ? '/gameover' : '/trivia')
  }

  return (
    <StatsLayout>
      <h1>Failure Screen</h1>

      <p>
        Either the player loses a life and then continues to the Trivia Screen,
        or the player is directly redirected to the Game Over screen where the
        players performance is summarized
      </p>

      <IonButton color="primary" onClick={navigateNext}>
        Next
      </IonButton>
    </StatsLayout>
  )
}

export default Failure
