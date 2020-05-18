import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router'

import niceColors from '../colors'
import AnswerCard from '../components/card/AnswerCard'
import StatsLayout from '../components/layouts/StatsLayout'
import Loading from '../components/Loading'
import { QUESTION_TIME } from '../settings'
import useStore from '../useStore'
import { randomArrayShuffle } from '../utils'

interface Movie {
  imdbId: string
  title: string
  releaseYear: number
  posterPath: string
  budget?: number
  revenue?: number
  popularity?: number
  randomMovies: Movie[]
}

export interface MovieData {
  movie: Movie
}

export const MOVIES = gql`
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

const GET_SCORE = gql`
  query($imdbId: String!, $selectedTitle: String!, $remainingSeconds: Int!) {
    scoreTitleResponse(
      imdbId: $imdbId
      selectedTitle: $selectedTitle
      remainingSeconds: $remainingSeconds
    )
  }
`
/**
 * ### The Question-Answering Screen
 *
 * Displays four possible movie titles that the user must choose from.
 *
 * Shown if...
 * * user clicks on unblurring movie poster
 */
const Question = () => {
  const history = useHistory()

  const {
    setPointDifference,
    timeRemaining,
    setTimeRemaining,
    movie,
    setGuess,
  } = useStore()

  const { loading, error, data } = useQuery<MovieData>(MOVIES, {
    fetchPolicy: 'cache-only',
  })

  const [submitResponse, scoreResponse] = useLazyQuery(GET_SCORE)

  // create a list of all movies that should be shuffled (but only once)
  const allMovies = useMemo(
    () =>
      randomArrayShuffle([...(data?.movie?.randomMovies || []), data?.movie]),
    [data],
  )

  // create an effect that is executed on changes to scoreResponse in our lazy query
  // => will be called once on first render and once when a scoring response is received
  useEffect(() => {
    if (Number.isFinite(scoreResponse?.data?.scoreTitleResponse)) {
      const { scoreTitleResponse } = scoreResponse.data

      // after a score has been received successfully, reset the question time to default
      setTimeRemaining(() => QUESTION_TIME)

      // guess was wrong
      if (scoreTitleResponse === 0) {
        history.replace('/failure')
      } else if (scoreTitleResponse > 0) {
        const gainedPoints = scoreResponse.data.scoreTitleResponse
        setPointDifference(gainedPoints)
        history.replace('/success')
      }
    }
  }, [scoreResponse.data])

  const makeGuess = (
    guessedTitle: string,
    imdbId: string,
    posterPath: string,
  ) => {
    // store guess details in global store
    if (imdbId && guessedTitle && posterPath) {
      setGuess({
        imdbId: imdbId,
        title: guessedTitle,
        posterPath: posterPath,
      })
    }

    // make the guess
    submitResponse({
      variables: {
        imdbId: movie.imdbId,
        selectedTitle: guessedTitle,
        remainingSeconds: timeRemaining,
      },
    })
  }

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <StatsLayout>
      <section className="p-4">
        <div className="text-2xl text-center">Guess the Movie</div>
        <div className="text-center font-light text-gray-800">
          Which movie was just shown?
        </div>
      </section>
      <div>
        {allMovies.map((movie: any, index: any) => {
          const color = niceColors[index]
          return (
            <AnswerCard
              key={index}
              title={movie.title}
              backgroundColor={color}
              onClick={() =>
                makeGuess(movie.title, movie.imdbId, movie.posterPath)
              }
            />
          )
        })}
      </div>
    </StatsLayout>
  )
}

export default Question
