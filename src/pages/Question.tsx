import { IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import StatsLayout from '../components/layouts/StatsLayout'
import { useStorage } from '../useStorage'
import useStore from '../useStore'

const Question = () => {
  const history = useHistory()

  useStorage()

  const { addPoints, removeLife } = useStore()

  const navigateSuccess = () => {
    addPoints()
    history.push('/success')
  }
  const navigateFailure = () => {
    removeLife()
    history.push('/failure')
  }

  return (
    <StatsLayout>
      <h1>Question Screen</h1>
      <IonButton color="primary" onClick={navigateSuccess}>
        Success
      </IonButton>
      <IonButton color="primary" onClick={navigateFailure}>
        Failure
      </IonButton>
    </StatsLayout>
  )
}

export default Question
