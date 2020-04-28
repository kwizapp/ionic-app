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
    addPoints,
    setPointDifference,
  } = useStore()

  const [animReady, setAnimReady] = useState(false)
  const [width, setWidth] = useState(100) // used for loading bar animation

  const loadingBar = useRef<any>()

  // these two lifecycle hooks make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => {
    // get width in pixel of loading-div (to fill it)
    setWidth(loadingBar?.current.offsetWidth)
    setAnimReady(true)
  })
  useIonViewWillLeave(() => {
    setAnimReady(false)
  })

  const updateScores = () => {
    // set the points here, as we wanted to animate the difference
    addPoints(pointDifference)
    // reset point difference for next round
    setPointDifference(0)
  }

  const navigateNext = () => {
    // set the new scores in the store
    updateScores()
    history.push(lives === 0 ? '/gameover' : '/trivia')
  }

  // correct movie card animation (appear)
  const cardAnimRef = useRef<any>()
  const cardAnimProps = useSpring({
    ref: cardAnimRef,
    transform: !animReady ? 'scale(0)' : 'scale(1.1)',
    opacity: !animReady ? 0 : 1,
    config: config.wobbly,
  })

  // fade emoji
  const fadeAnimRef = useRef<any>()
  const fadeAnimProps = useSpring({
    ref: fadeAnimRef,
    opacity: !animReady ? 1 : 0,
  })

  // appear Heart display
  const appearAnimRef = useRef<any>()
  const appearAnimProps = useSpring({
    ref: appearAnimRef,
    opacity: !animReady ? 0 : 1,
    onRest: () => animReady && removeLife(),
  })

  // animate point deduction
  const pointsAnimRef = useRef<any>()
  const pointsAnimProps = useSpring({
    ref: pointsAnimRef,
    number: !animReady ? points : points + pointDifference,
    opacity: 1,
    config: config.default,
  })

  // loading bar
  const widthAnimProps = useSpring({
    width: !animReady ? 0 : width,
    onRest: () => animReady && navigateNext(),
    config: { duration: animReady ? 7000 : 1 },
  })

  useChain([cardAnimRef, fadeAnimRef, appearAnimRef, pointsAnimRef])

  return (
    <IonPage>
      <IonContent className="text-center">
        <h1 className="text-2xl font-extrabold mt-8">Wrong Choice</h1>

        <div className="relative h-32">
          {/* EMOJI */}
          <animated.div
            className="absolute inset-y-0 inset-x-0"
            style={fadeAnimProps}
          >
            <p className="text-6xl mt-3">{emoji.get('no_entry_sign')}</p>
          </animated.div>

          {/* HEARTS DISPLAY */}
          <animated.div
            className="absolute inset-y-0 inset-x-0"
            style={appearAnimProps}
          >
            <div className="mt-4 text-7xl text-red-600">
              <Hearts livesTotal={livesTotal} livesRemaining={lives} />
            </div>
          </animated.div>
        </div>

        {/* SCORE DISPLAY */}
        <div className="text-sm text-gray-500">Your Score</div>
        <animated.p style={pointsAnimProps} className="text-4xl font-bold">
          {pointsAnimProps.number.interpolate((x: number) => x.toFixed(0))}
        </animated.p>

        {/* LOADING BAR */}
        <div ref={loadingBar} className="mx-auto h-1 w-64 bg-gray-500 rounded">
          <animated.div
            className="h-1 rounded bg-blue-800 z-10"
            style={widthAnimProps}
          ></animated.div>
        </div>

        {/* CORRECT MOVIE CARD */}
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
            <img className="rounded" src={movie.posterPath} alt={movie.title} />
          </div>
        </animated.div>
      </IonContent>
    </IonPage>
  )
}

export default Failure
