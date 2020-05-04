import { gql, useQuery } from '@apollo/client'
import {
  IonButton,
  IonCard,
  IonContent,
  IonImg,
  IonPage,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import React, { useRef, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router'
import { animated, useChain, useSpring } from 'react-spring'

import Loading from '../components/Loading'
import TriviaOverlay from '../components/TriviaOverlay'
import { MovieData } from './Question'

export const MOVIES = gql`
  {
    movie {
      imdbId
      title
      releaseYear
      posterPath
      revenue
      popularity
      budget
    }
  }
`

const Trivia = () => {
  const history = useHistory()
  const [animReady, setAnimReady] = useState(false)

  // these two lifecycle hooks make sure the animations run everytime the page is loaded
  useIonViewDidEnter(() => {
    setAnimReady(true)
  })
  useIonViewWillLeave(() => {
    setAnimReady(false)
  })

  const { loading, data } = useQuery<MovieData>(MOVIES, {
    fetchPolicy: 'cache-only',
  })

  const navigateNext = () => history.push('/poster')

  const overlayMargin = '3%'

  const animationPropsRef = useRef<any>()
  const animationProps = useSpring({
    ref: animationPropsRef,
    transform: !animReady ? 'translate(0, 1000px)' : 'translate(0, -440px)',
    opacity: !animReady ? 0 : 1,
  })

  const appearAnimRef = useRef<any>()
  const appearAnimProps = useSpring({
    ref: appearAnimRef,
    opacity: !animReady ? 0 : 1,
  })

  // specify order of animations, will be animated one after the other
  useChain([animationPropsRef, appearAnimRef])

  if (loading || !data) return <Loading />

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center">
          <div className="p-2 w-full relative">
            <IonCard className="pt-8">
              <IonImg src={data?.movie?.posterPath} className="w-full h-full" />
            </IonCard>

            <TriviaOverlay
              className="items-center justify-center "
              margin={overlayMargin}
              style={{
                top: overlayMargin,
                height: '50px',
                backgroundColor: 'white',
              }}
            >
              <span className="text-2xl text-black font-light">
                Did you know that...
              </span>
            </TriviaOverlay>

            <animated.div style={animationProps}>
              <TriviaOverlay
                className="flex-col text-lg"
                margin={overlayMargin}
                style={{
                  top: `calc(${overlayMargin} + 20%)`,
                  color: 'black',
                  padding: '10px',
                }}
              >
                <div className="font-light">
                  <div>
                    ...
                    <span className="font-semibold">
                      {data?.movie?.title}
                    </span>{' '}
                    was released in
                    <span className="font-bold">
                      {' '}
                      {data?.movie?.releaseYear}
                    </span>{' '}
                    and earned around{' '}
                    <span className="font-bold">
                      <NumberFormat
                        value={data?.movie?.revenue}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </span>{' '}
                    at the box office with a budget of{' '}
                    <span className="font-bold">
                      <NumberFormat
                        value={data?.movie?.budget}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </span>
                    .
                    <p className="mt-4">
                      Popularity:{' '}
                      <span className="font-bold">
                        {data?.movie?.popularity?.toFixed(1)}
                      </span>
                    </p>
                  </div>
                </div>
              </TriviaOverlay>
            </animated.div>
          </div>

          <animated.div
            style={appearAnimProps}
            className=" w-11/12 text-center"
          >
            <IonButton className="w-full" onClick={navigateNext}>
              Continue
            </IonButton>
          </animated.div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Trivia
