import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router'

import MovieCard from '../components/card/MovieCard'
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
  randomMovies: Movie[]
}

interface MovieData {
  movie: Movie
}

const MOVIES = gql`
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

const Question = () => {
  const history = useHistory()

  const {
    setPointDifference,
    removeLife,
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
        removeLife()
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
    posterUrl: string,
  ) => {
    // store guess details in global store
    if (imdbId && guessedTitle && posterUrl) {
      setGuess({
        imdbId: imdbId,
        title: guessedTitle,
        posterUrl: posterUrl,
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
      <div className="p-1 text-center text-gray-600 text-sm">
        Which movie was shown?
      </div>
      <div>
        {allMovies.map((movie: any, index: any) => (
          <MovieCard
            key={index}
            title={movie.title}
            posterPath={movie.posterPath}
            onClick={() =>
              makeGuess(movie.title, movie.imdbId, movie.posterPath)
            }
          />
        ))}
      </div>
    </StatsLayout>
  )
}

export default Question
