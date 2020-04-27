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

import useStore from '../useStore'

const GameOver = () => {
  const history = useHistory()
  const { points, resetState, bestStreak } = useStore()

  const [animReady, setAnimReady] = useState(false)

  // setAnimReady: make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => {
    setAnimReady(true)
  })

  useIonViewWillLeave(() => {
    setAnimReady(false)
    resetState()
  })

  // animate the emoji
  const emojiAnimRef = useRef<any>()
  const emojiAnimProps = useSpring({
    ref: emojiAnimRef,
    transform: !animReady ? 'scale(0)' : 'scale(1.1)',
    opacity: !animReady ? 0 : 1,
    config: config.wobbly,
  })

  // animate text
  const textAnimRef = useRef<any>()
  const textAnimProps = useSpring({
    ref: textAnimRef,
    opacity: !animReady ? 0 : 1,
  })

  // animate the number of scored points
  const pointsAnimRef = useRef<any>()
  const pointsAnimProps = useSpring({
    ref: pointsAnimRef,
    number: !animReady ? 0 : points,
    opacity: !animReady ? 0 : 1,
    config: config.default,
  })

  // animate continue button
  const buttonAnimRef = useRef<any>()
  const buttonAnimProps = useSpring({
    ref: buttonAnimRef,
    opacity: !animReady ? 0 : 1,
    transform: !animReady ? 'scale(0)' : 'scale(1.0)',
  })

  useChain([emojiAnimRef, textAnimRef, pointsAnimRef, buttonAnimRef])

  const navigateNext = () => history.push('/')

  return (
    <IonPage>
      <IonContent className="text-center">
        <h1 className="text-2xl font-extrabold mt-20">Game Over</h1>

        <animated.div style={emojiAnimProps}>
          <p
            style={{ fontFamily: 'Twitter Color Emoji' }}
            className="mt-3 text-10xl"
          >
            {emoji.get('disappointed_relieved')}
          </p>
        </animated.div>

        <animated.div style={textAnimProps}>
          <p className="mt-5">You scored</p>
        </animated.div>

        <animated.p style={pointsAnimProps} className="text-2xl font-bold">
          {pointsAnimProps.number.interpolate((x: number) => x.toFixed(0))}
        </animated.p>

        <animated.div style={textAnimProps}>
          <p>Points</p>
          <div className="text-gray-500 mt-4 text-xl font-bold">
            best streak: {bestStreak}
          </div>
        </animated.div>

        <animated.div style={buttonAnimProps}>
          <IonButton className="mt-12" onClick={navigateNext}>
            Start again
          </IonButton>
        </animated.div>
      </IonContent>
    </IonPage>
  )
}

export default GameOver
