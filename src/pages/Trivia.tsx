import React from 'react'
import { IonButton } from '@ionic/react'
import { useHistory } from 'react-router'
import StatsLayout from '../components/layouts/StatsLayout'

const Trivia = () => {
  const history = useHistory()

  const navigateNext = () => history.push('/poster')

  return (
    <StatsLayout>
      <h1>Trivia Screen</h1>

      <IonButton onClick={navigateNext}>Next Question</IonButton>
    </StatsLayout>
  )
}

export default Trivia
