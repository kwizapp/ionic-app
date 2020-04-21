import { IonButton } from '@ionic/react'
import React, { useMemo } from 'react'
import { zip, sortBy } from 'ramda'
import { useHistory } from 'react-router'

import StatsLayout from '../components/layouts/StatsLayout'
import { useQuery } from '@apollo/client'
import { MovieData, MOVIES } from './Question'
import MovieCard from '../components/card/MovieCard'

const BonusQuestion = () => {
  const history = useHistory()

  const { loading, data } = useQuery<MovieData>(MOVIES, {
    fetchPolicy: 'network-only',
  })

  const moviePairs = useMemo(() => {
    // sort the movies with a decreasing release year
    const sortedMovies = sortBy(
      m => -m.releaseYear,
      data?.movie.randomMovies ?? [],
    )

    // zip the sorted movies with themselves to get pairs of movies
    // this will allow us to map over the pairs and get year ranges
    // e.g., [[null, movie1], [movie1, movie2], [movie2, null]]
    return zip([null, ...sortedMovies], [...sortedMovies, null])
  }, [data])

  if (loading || !data) {
    return null
  }

  const navigateOnSuccess = () => history.push('/success')
  const navigateOnFailure = () => history.push('/failure')

  const scoreQuestion = (from?: number, until?: number) => {
    // TODO: do actual scoring by sending the chosen range to the backend?

    if (typeof from !== 'undefined' && data.movie.releaseYear <= from) {
      navigateOnFailure()
    }

    if (typeof until !== 'undefined' && data.movie.releaseYear >= until) {
      navigateOnFailure()
    }

    navigateOnSuccess()
  }

  return (
    <StatsLayout>
      <MovieCard title={data.movie.title} posterPath={data.movie.posterPath} />

      <div className="p-1 text-sm text-center text-gray-600">
        When was the movie released?
      </div>

      {moviePairs.map(([movie1, movie2]) => (
        <div key={movie2?.imdbId}>
          <IonButton
            color="primary"
            onClick={() =>
              scoreQuestion(movie1?.releaseYear, movie2?.releaseYear)
            }
          >
            HERE
          </IonButton>

          {movie2 && (
            <MovieCard title={movie2.title} posterPath={movie2.posterPath} />
          )}
        </div>
      ))}
    </StatsLayout>
  )
}

export default BonusQuestion
