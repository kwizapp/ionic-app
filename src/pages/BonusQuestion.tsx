import { IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import StatsLayout from '../components/layouts/StatsLayout'

const BonusQuestion = () => {
  const history = useHistory()

  const navigateOnSuccess = () => history.push('/success')
  const navigateOnFailure = () => history.push('/failure')

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
