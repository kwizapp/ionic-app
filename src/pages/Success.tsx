import {
  IonButton,
  IonContent,
  IonPage,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import emoji from 'node-emoji'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { animated, useSpring } from 'react-spring'

import useStore from '../useStore'

const Success = () => {
  const router = useHistory()
  const { pointDifference, points, addPoints, setPointDifference } = useStore()

  const [pageLoaded, setPageLoaded] = useState(false)

  const [ready, setReady] = useState(false)
  const [textShouldAppear, setTextShouldAppear] = useState(false)

  // these two lifecycle hooks make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => setPageLoaded(true))
  useIonViewWillLeave(() => setPageLoaded(false))

  const emojiAnimProps = useSpring({
    transform: pageLoaded ? 'scale(1.1)' : 'scale(0)',
    opacity: pageLoaded ? 1 : 0,
    onRest: () => {
      setTextShouldAppear(true)
    },
  })

  const appearAnimProps = useSpring({
    opacity: textShouldAppear && pageLoaded ? 1 : 0,
    from: { opacity: 0 },
    onRest: () => {
      setReady(true)
    },
  })

  const pointsAnimProps = useSpring({
    number:
      ready && textShouldAppear && pageLoaded
        ? points + pointDifference
        : points,
    opacity: ready && textShouldAppear && pageLoaded ? 1 : 0,
    from: { number: points, opacity: 0 },
    config: { duration: 2000 },
  })

  const goToTriviaScreen = () => {
    addPoints(points + pointDifference)
    setPointDifference(0)
    router.push('/trivia')
  }

  return (
    <IonPage>
      <IonContent className="text-center">
        <h1 className="text-2xl font-extrabold mt-20">Correct Guess</h1>
        <animated.div style={emojiAnimProps}>
          <p
            style={{ fontFamily: 'Twitter Color Emoji' }}
            className="text-10xl mt-3"
          >
            {emoji.get('tada')}
          </p>
        </animated.div>
        <div className="relative">
          <animated.p style={appearAnimProps} className="mt-5">
            New Score
          </animated.p>

          <animated.p style={pointsAnimProps} className="text-5xl font-bold">
            {pointsAnimProps.number.interpolate((x: number) => x.toFixed(0))}
          </animated.p>

          <animated.div
            style={emojiAnimProps}
            className="text-green-600 text-2xl font-bold "
          >
            + {pointDifference}
          </animated.div>

          <animated.p style={appearAnimProps}>Points</animated.p>
        </div>

        <IonButton className="mt-16" onClick={goToTriviaScreen}>
          Continue
        </IonButton>
        <IonButton className="mt-16" onClick={() => console.log('next')}>
          Gamble
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Success
