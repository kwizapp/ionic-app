import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router'
import { LastLocationProvider } from 'react-router-last-location'

import BonusQuestion from './pages/BonusQuestion'
import Failure from './pages/Failure'
import GameOver from './pages/GameOver'
import Home from './pages/Home'
import Poster from './pages/Poster'
import Question from './pages/Question'
import Success from './pages/Success'
import Trivia from './pages/Trivia'

/**
 * Main Router of the Application
 */
const AppRouter = () => {
  return (
    <IonReactRouter>
      <LastLocationProvider>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/poster" component={Poster} />
          <Route exact path="/question" component={Question} />
          <Route exact path="/bonus-question" component={BonusQuestion} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/failure" component={Failure} />
          <Route exact path="/gameover" component={GameOver} />
          <Route exact path="/trivia" component={Trivia} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </LastLocationProvider>
    </IonReactRouter>
  )
}

export default AppRouter
