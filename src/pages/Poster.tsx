import { gql, useQuery } from '@apollo/client'
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonText,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import BlurAnimated from '../components/animations/BlurAnimated'
import StatsLayout from '../components/layouts/StatsLayout'
import Loading from '../components/Loading'
import Timer from '../components/Timer'
import { QUESTION_TIME } from '../settings'
import useStore from '../useStore'

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
      randomMovies(num: 3, differentReleaseYear: true) {
        imdbId
        title
        releaseYear
        posterPath
      }
    }
  }
`

const Poster = () => {
  // ref to interval, gets cleared on page leave
  const countDownRef = useRef<any>(null)
  const history = useHistory()

  const { loading, error, data, refetch } = useQuery<RandomMovieData>(
    RANDOM_MOVIE,
  )

  const { timeRemaining, setTimeRemaining, setCurrentImdbId } = useStore()

  const [isPosterExpired, setIsPosterExpired] = useState(false)

  // setup an effect that updates the currentImdbId in the global store
  // as soon as the random movie poster has been returned by the api
  useEffect(() => {
    const imdbId = data?.movie.imdbId
    if (imdbId) {
      setCurrentImdbId(imdbId)
    }
  }, [data])

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
      setTimeRemaining(() => QUESTION_TIME)

      // start a countdown
      countDownRef.current = setInterval(() => {
        setTimeRemaining(prevSeconds => {
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
  const navigateNext = () => {
    history.replace('/question')
  }

  const handleClick = async () => {
    navigateNext()
  }

  // track the remaining seconds and redirect to the next page on 0
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(() => QUESTION_TIME)
      navigateNext()
    }
  }, [timeRemaining])

  if (loading || isPosterExpired) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <StatsLayout className="text-center" onClick={handleClick}>
      <div className="absolute top-24 left-6">
        <Timer secondsRemaining={timeRemaining} />
      </div>

      <IonCard className="m-2">
        <IonCardHeader className="p-2">
          <IonCardTitle>Guess The Movie</IonCardTitle>
          <IonText>tap screen to submit answer</IonText>
        </IonCardHeader>
      </IonCard>

      <div className="max-w-md">
        <IonCard className="m-2">
          <BlurAnimated>
            <IonImg src={data?.movie.posterPath} />
          </BlurAnimated>
        </IonCard>
      </div>
    </StatsLayout>
  )
}

export default Poster
