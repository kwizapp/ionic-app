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

import LifeDisplay from '../components/LifeDisplay'
import useStore from '../useStore'

const movie = {
  imdbId: 'tt0097165',
  title: 'Dead Poets Society',
  posterUrl:
    'https://m.media-amazon.com/images/M/MV5BOGYwYWNjMzgtNGU4ZC00NWQ2LWEwZjUtMzE1Zjc3NjY3YTU1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
}
const guess = {
  imdbId: 'tt0076759',
  title: 'Star Wars',
  posterUrl:
    'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
}

const Failure = () => {
  const history = useHistory()

  const { lives, livesTotal } = useStore()

  const [animReady, setAnimReady] = useState(false)

  // these two lifecycle hooks make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => {
    setAnimReady(true)
  })
  useIonViewWillLeave(() => {
    setAnimReady(false)
  })

  const navigateNext = () => {
    // TODO: redirect on timer...
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
  })

  useChain([cardAnimRef, fadeAnimRef, appearAnimRef])

  return (
    <IonPage>
      <IonContent className="text-center">
        <h1 className="text-2xl font-extrabold mt-12">Wrong Choice</h1>
        <div className="relative h-32">
          <animated.div
            className="absolute inset-y-0 inset-x-0"
            style={appearAnimProps}
          >
            <div className="mt-4 text-7xl text-red-600">
              <LifeDisplay livesTotal={livesTotal} livesRemaining={lives} />
            </div>
          </animated.div>

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
        </div>

        <animated.div
          style={cardAnimProps}
          className="pb-8 pt-4 m-8 shadow-2xl max-w-sm rounded-lg overflow-hidden relative"
        >
          <div className="text-sm text-gray-500 ">You guessed</div>
          <span className="text-sm text-gray-800">{guess.title}</span>
          <div className="text-sm font-hairline text-gray-500 ">
            but the correct answer is
          </div>
          <div className="px-6">
            <div className="font-light text-2xl mb-2">{movie.title}</div>
          </div>
          <div className="w-40 mx-auto">
            <img className="rounded" src={movie.posterUrl} alt={movie.title} />
          </div>
        </animated.div>
      </IonContent>
    </IonPage>
  )
}

export default Failure
