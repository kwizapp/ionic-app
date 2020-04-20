import {
  IonButton,
  IonContent,
  IonPage,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import emoji from 'node-emoji'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { animated, config, useChain, useSpring } from 'react-spring'

import LifeDisplay from '../components/LifeDisplay'
import useStore from '../useStore'

const Success = () => {
  const router = useHistory()
  const {
    pointDifference,
    points,
    addPoints,
    setPointDifference,
    lives,
    livesTotal,
  } = useStore()

  const [animReady, setAnimReady] = useState(false)

  // these two lifecycle hooks make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => {
    setAnimReady(true)
  })
  useIonViewWillLeave(() => {
    setAnimReady(false)
  })

  const emojiAnimRef = useRef<any>()
  const emojiAnimProps = useSpring({
    ref: emojiAnimRef,
    transform: !animReady ? 'scale(0)' : 'scale(1.1)',
    opacity: !animReady ? 0 : 1,
    config: config.wobbly,
  })

  const appearAnimRef = useRef<any>()
  const appearAnimProps = useSpring({
    ref: appearAnimRef,
    opacity: !animReady ? 0 : 1,
  })

  const pointsAnimRef = useRef<any>()
  const pointsAnimProps = useSpring({
    ref: pointsAnimRef,
    number: !animReady ? points : points + pointDifference,
    opacity: !animReady ? 0 : 1,
    config: config.molasses,
  })

  const panelAnimRef = useRef<any>()
  const panelAnimProps = useSpring({
    ref: panelAnimRef,
    opacity: !animReady ? 0 : 1,
    transform: !animReady ? 'scale(0)' : 'scale(1.0)',
  })

  // specify order of animations, will be animated one after the other
  useChain([emojiAnimRef, appearAnimRef, pointsAnimRef, panelAnimRef])

  const goToTriviaScreen = () => {
    // set the points here, as we wanted to animate the difference
    addPoints(points + pointDifference)
    // reset point difference for next round
    setPointDifference(0)
    router.push('/trivia')
  }

  return (
    <IonPage>
      <IonContent className="text-center">
        <h1 className="text-2xl font-extrabold mt-16">Correct Guess</h1>
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
        </div>
        <animated.div style={panelAnimProps}>
          <div className="mt-4 text-5xl text-red-600">
            <LifeDisplay livesTotal={livesTotal} livesRemaining={lives} />
          </div>
          <IonButton className="w-32" onClick={goToTriviaScreen}>
            Continue
          </IonButton>
          <IonButton
            className="w-32"
            onClick={() => console.log('go to bonus question')}
          >
            Gamble
          </IonButton>
        </animated.div>
      </IonContent>
    </IonPage>
  )
}

export default Success
