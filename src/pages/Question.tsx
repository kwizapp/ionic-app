import React from 'react'
import { IonButton } from '@ionic/react'
import { useHistory } from 'react-router'
import useStore from '../useStore'
import StatsLayout from '../components/layouts/StatsLayout'

const Question = () => {
  const history = useHistory()

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
