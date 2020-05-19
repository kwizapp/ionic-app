import { gql, useQuery } from '@apollo/client'
import {
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import { calculatorOutline, calendarOutline, cashOutline } from 'ionicons/icons'
import React, { useRef, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useHistory } from 'react-router'
import { animated, useChain, useSpring } from 'react-spring'

import KwizButton from '../components/button/KwizButton'
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
/**
 * ### The Movie Metadata Screen
 *
 * Displays interesting trivia about the active movie in the game.
 *
 * Shown if...
 * * user comes from the Success or Failure Screen.
 */
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

  const { loading, error, data } = useQuery<MovieData>(MOVIES, {
    fetchPolicy: 'cache-only',
  })

  const navigateNext = () => history.push('/poster')

  const overlayMargin = '10%'

  const animationPropsRef = useRef<any>()
  const animationProps = useSpring({
    ref: animationPropsRef,
    transform: !animReady ? 'translate(0, 1000px)' : 'translate(0, 100px)',
    opacity: !animReady ? 0 : 1,
  })

  const appearAnimRef = useRef<any>()
  const appearAnimProps = useSpring({
    ref: appearAnimRef,
    opacity: !animReady ? 0 : 1,
  })

  // specify order of animations, will be animated one after the other
  useChain([animationPropsRef, appearAnimRef])

  if (loading || error || !data) return <Loading />

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center h-full">
          <div className="p-2 w-full relative">
            <IonCard className="shadow-2xl shadow">
              <IonImg src={data?.movie?.posterPath} className="w-full h-full" />
            </IonCard>

            <animated.div style={animationProps}>
              <TriviaOverlay
                className="flex-col text-lg"
                margin={overlayMargin}
                style={{
                  bottom: `calc(${overlayMargin} + -25%)`,
                  color: 'black',
                }}
              >
                <div className="bg-white rounded overflow-hidden shadow-2xl">
                  <div className="px-6 py-4">
                    <div className="pb-2">
                      <div className="flex flex-col m-auto rounded-full h-20 w-20 flex items-center justify-center bg-teal-800">
                        <div className="text-lg font-semibold text-white">
                          {data?.movie?.popularity?.toFixed(1)}
                        </div>
                        <div className="font-hairline text-xs text-gray-500">
                          rating
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <IonIcon icon={calendarOutline} />
                        <div className="ml-4 pt-1">
                          <span className="font-thin">released in</span>{' '}
                          <span className="font-bold">
                            {data?.movie?.releaseYear}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <IonIcon icon={cashOutline} />
                        <div className="ml-4 pt-1">
                          <span className="font-thin">earnings</span>{' '}
                          <span className="font-bold">
                            <NumberFormat
                              value={data?.movie?.revenue}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$'}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <IonIcon icon={calculatorOutline} />
                        <div className="ml-4 pt-1">
                          <span className="font-thin">budget</span>{' '}
                          <span className="font-bold">
                            <NumberFormat
                              value={data?.movie?.budget}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$'}
                            />
                          </span>
                        </div>
                      </div>
                      {data.movie.budget && data.movie.revenue && (
                        <div className="text-2xl  py-2">
                          <span className="font-bold text-teal-700">
                            <NumberFormat
                              value={(
                                data.movie.revenue / data.movie.budget
                              ).toFixed(2)}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$'}
                            />{' '}
                          </span>
                          per dollar spent
                        </div>
                      )}
                      <div className="p-2"></div>
                      <animated.div style={appearAnimProps}>
                        <div className="flex items-center justify-center">
                          <KwizButton onClick={navigateNext}>
                            next question
                          </KwizButton>
                        </div>
                      </animated.div>
                    </div>
                  </div>
                </div>
              </TriviaOverlay>
            </animated.div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Trivia
