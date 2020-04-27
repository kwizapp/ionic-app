import React, { useRef, useState } from 'react'
import {
  IonPage,
  IonContent,
  IonButton,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { animated, config, useChain, useSpring } from 'react-spring'
import { useHistory } from 'react-router'
import useStore from '../useStore'

import emoji from 'node-emoji'

const GameOver = () => {
  const history = useHistory()
  const { points, resetState } = useStore()

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

  // animate the number of scored points
  const pointsAnimRef = useRef<any>()
  const pointsAnimProps = useSpring({
    ref: pointsAnimRef,
    number: !animReady ? 0 : points,
    opacity: !animReady ? 0 : 1,
    config: config.default,
  })

  useChain([emojiAnimRef, pointsAnimRef])

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

        <p className="mt-5">You scored</p>
        <animated.p style={pointsAnimProps} className="text-2xl font-bold">
          {pointsAnimProps.number.interpolate((x: number) => x.toFixed(0))}
        </animated.p>
        <p>Points</p>

        <IonButton className="mt-16" onClick={navigateNext}>
          Start again
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default GameOver
