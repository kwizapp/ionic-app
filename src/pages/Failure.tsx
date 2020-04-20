import {
  IonContent,
  IonPage,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import emoji from 'node-emoji'
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { animated, config, useChain, useSpring } from 'react-spring'

import Hearts from '../components/Hearts'
import useStore from '../useStore'

const Failure = () => {
  const history = useHistory()

  const {
    lives,
    livesTotal,
    removeLife,
    pointDifference,
    points,
    movie,
    guess,
  } = useStore()

  const [animReady, setAnimReady] = useState(false)

  // these two lifecycle hooks make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => {
    setAnimReady(true)
  })
  useIonViewWillLeave(() => {
    setAnimReady(false)
  })

  const navigateNext = () => {
    history.push(lives === 0 ? '/gameover' : '/trivia')
  }

  const cardAnimRef = useRef<any>()
  const cardAnimProps = useSpring({
    ref: cardAnimRef,
    transform: !animReady ? 'scale(0)' : 'scale(1.1)',
    opacity: !animReady ? 0 : 1,
    config: config.wobbly,
  })

  const fadeAnimRef = useRef<any>()
  const fadeAnimProps = useSpring({
    ref: fadeAnimRef,
    transform: 'translate(0,0)',
    opacity: !animReady ? 1 : 0,
  })

  const appearAnimRef = useRef<any>()
  const appearAnimProps = useSpring({
    ref: appearAnimRef,
    transform: 'translate(0,0)',
    opacity: !animReady ? 0 : 1,
    onRest: () => removeLife(), // TODO: fix removing life, will remove one additional one if animReady is set to false again
  })

  const pointsAnimRef = useRef<any>()
  const pointsAnimProps = useSpring({
    ref: pointsAnimRef,
    number: !animReady ? points : points + pointDifference,
    opacity: 1,
    config: config.default,
  })

  useChain([cardAnimRef, fadeAnimRef, appearAnimRef, pointsAnimRef])

  return (
    <IonPage>
      <IonContent className="text-center" onClick={navigateNext}>
        <h1 className="text-2xl font-extrabold mt-8">Wrong Choice</h1>
        <div className="relative h-32">
          <animated.div
            className="absolute inset-y-0 inset-x-0"
            style={fadeAnimProps}
          >
            <p
              style={{ fontFamily: 'Twitter Color Emoji' }}
              className="text-6xl mt-3"
            >
              {emoji.get('no_entry_sign')}
            </p>
          </animated.div>

          <animated.div
            className="absolute inset-y-0 inset-x-0"
            style={appearAnimProps}
          >
            <div className="mt-4 text-7xl text-red-600">
              <Hearts livesTotal={livesTotal} livesRemaining={lives} />
            </div>
          </animated.div>
        </div>

        <div className="text-sm text-gray-500">Your Score</div>
        <animated.p style={pointsAnimProps} className="text-4xl font-bold">
          {pointsAnimProps.number.interpolate((x: number) => x.toFixed(0))}
        </animated.p>

        <animated.div
          style={cardAnimProps}
          className="p-4 m-8 shadow-2xl max-w-sm rounded-lg overflow-hidden relative"
        >
          <div className="text-sm text-gray-500 ">You guessed</div>
          <span className="text-sm text-gray-800">{guess.title}</span>
          <div className="text-sm font-hairline text-gray-500 ">
            but the correct answer is
          </div>
          <div className="px-6">
            <div className="font-light text-2xl mb-2">{movie.title}</div>
          </div>
          <div className="w-32 mx-auto">
            <img className="rounded" src={movie.posterUrl} alt={movie.title} />
          </div>
        </animated.div>
      </IonContent>
    </IonPage>
  )
}

export default Failure
