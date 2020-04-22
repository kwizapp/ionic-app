import { IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import StatsLayout from '../components/layouts/StatsLayout'
import useStore from '../useStore'

const BonusQuestion = () => {
  const history = useHistory()

  const { setPointDifference } = useStore()

  const navigateOnSuccess = () => {
    setPointDifference(150) // TODO: replace with computed values
    history.push('/success')
  }
  const navigateOnFailure = () => {
    setPointDifference(-150) // TODO: replace with computed values
    history.push('/failure')
  }

  return (
    <StatsLayout>
      <h1>BonusQuestion Screen</h1>

      <IonButton color="primary" onClick={navigateOnSuccess}>
        Answer Bonus Question Correctly
      </IonButton>

      <IonButton color="primary" onClick={navigateOnFailure}>
        Answer Bonus Question Incorrectly
      </IonButton>
    </StatsLayout>
  )
}

export default BonusQuestion
