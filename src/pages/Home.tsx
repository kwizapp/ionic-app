import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import SplashContainer from '../components/3d/SplashContainer'
import { useStorage } from '../useStorage'

/**
 * ### The Start Screen
 *
 * Displays a splash screen with a simple animation.
 *
 * Shown if...
 * * game is started
 */
const Home = () => {
  useStorage()

  const history = useHistory()

  const navigateNext = () => history.push('/poster')

  return (
    <IonPage onClick={navigateNext}>
      <IonContent fullscreen className="relative">
        <SplashContainer />
      </IonContent>
    </IonPage>
  )
}

export default Home
