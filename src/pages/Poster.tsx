import './Poster.css'

import { gql, useQuery } from '@apollo/client'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from '@ionic/react'
import { flash, heart, heartOutline } from 'ionicons/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import BlurAnimated from '../components/animations/BlurAnimated'
import Loading from '../components/loading/Loading'
import { QUESTION_TIME } from '../settings'

interface Movie {
  imdbId: string
  title: string
  releaseYear: number
  posterPath: string
}

interface RandomMovieData {
  movie: Movie
}

const RANDOM_MOVIE = gql`
  {
    movie {
      imdbId
      title
      releaseYear
      posterPath
    }
  }
`

function Poster(): React.ReactElement {
  // ref to interval, gets cleared on page leave
  const countDownRef = useRef<any>(null)
  const history = useHistory()

  const [isPosterExpired, setIsPosterExpired] = useState(false)
  const [secondsRemaining, setSecondsRemaining] = useState(QUESTION_TIME)

  const { loading, error, data, refetch } = useQuery<RandomMovieData>(
    RANDOM_MOVIE,
  )

  // if the current poster is expired, load a new one
  useIonViewWillEnter(async () => {
    // ensure that we only refetch if the poster has expired
    if (isPosterExpired) {
      await refetch()
      setIsPosterExpired(false)
    }
  }, [isPosterExpired])

  // setup a countdown for poster expiration
  useIonViewWillEnter(() => {
    // ensure that only one countdown can be set at a time
    if (countDownRef.current === null) {
      // reset the remaining time
      setSecondsRemaining(QUESTION_TIME)

      // start a countdown
      countDownRef.current = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds <= 1) {
            return 0
          }
          return prevSeconds - 1
        })
      }, 1000)
    }
  })

  // clean up the countdown timer when the page is left
  // and expire the current poster such that we get a new one next time
  useIonViewDidLeave(() => {
    // clean up interval
    clearInterval(countDownRef.current)
    countDownRef.current = null

    // set the current poster to be expired
    setIsPosterExpired(true)
  })

  // create a handler for page navigation
  const navigateNext = () => history.replace('/question')

  const handleClick = () => {
    // TODO: add remaining seconds to global store for next screen

    navigateNext()
  }

  // track the remaining seconds and redirect to the next page on 0
  useEffect(() => {
    if (secondsRemaining === 0) navigateNext()
  }, [secondsRemaining])

  if (loading || isPosterExpired) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <IonPage
      id="poster"
      onClick={handleClick}
      className={`remaining-${secondsRemaining}`}
    >
      <IonContent>
        <div id="timer">{secondsRemaining}</div>

        <IonCard style={{ margin: 4 }}>
          <IonCardHeader style={{ padding: 8 }}>
            <IonCardTitle>Guess The Movie</IonCardTitle>
            <IonText>tap screen to submit answer</IonText>
          </IonCardHeader>
        </IonCard>

        <div style={{ maxWidth: 500 }}>
          <IonCard style={{ margin: 4 }}>
            <BlurAnimated>
              <IonImg src={data && data.movie.posterPath} />
            </BlurAnimated>
          </IonCard>
        </div>
      </IonContent>

      <div id="stats">
        <div className="paper">
          <div id="points">
            <IonIcon icon={flash} />
            12&apos;489
          </div>
        </div>
        <div className="paper">
          <div id="lives">
            <IonIcon icon={heartOutline} />
            <IonIcon icon={heart} />
            <IonIcon icon={heart} />
          </div>
        </div>
      </div>
    </IonPage>
  )
}

export default Poster
