import { IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import StatsLayout from '../components/layouts/StatsLayout'
import { useStorage } from '../useStorage'

const Success = () => {
  const history = useHistory()

  useStorage()

  const navigateNext = () => history.push('/trivia')

  return (
    <StatsLayout>
      <h1>Success Screen</h1>

      <IonButton onClick={navigateNext}>Trivia</IonButton>
    </StatsLayout>
  )
}

export default Success
