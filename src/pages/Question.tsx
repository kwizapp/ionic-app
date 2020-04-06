import { gql, useQuery } from '@apollo/client'
import { useIonViewWillEnter } from '@ionic/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

import MovieCard from '../components/card/MovieCard'
import StatsLayout from '../components/layouts/StatsLayout'
import Loading from '../components/Loading'
import { movieService } from '../services/movieService'
import { useStorage } from '../useStorage'
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
  query($imdbId: String!) {
    movie(imdbId: $imdbId) {
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

const Question = () => {
  const history = useHistory()

  useStorage()

  const { addPoints, removeLife, currentImdbId, timeRemaining } = useStore()

  const { loading, error, data } = useQuery<MovieData>(MOVIES, {
    variables: { imdbId: currentImdbId },
  })

  const [movies, setMovies] = useState<Movie[]>([])

  useIonViewWillEnter(() => {
    if (data) {
      const movie: Movie = {
        imdbId: data.movie.imdbId,
        title: data.movie.title,
        releaseYear: data.movie.releaseYear,
        posterPath: data.movie.posterPath,
        randomMovies: [],
      }

      const randomMovies: Movie[] = [...data.movie.randomMovies]

      // combine all movie object into one array
      const _movies = [movie, ...randomMovies]

      setMovies(randomArrayShuffle(_movies))
    }
  }, [data])

  const navigateSuccess = () => {
    history.replace('/success')
  }

  const navigateFailure = () => {
    removeLife()
    history.replace('/failure')
  }

  const handleMovieSelect = async (movieTitle: string) => {
    const score = await movieService.validateAnswer(
      movieTitle,
      currentImdbId,
      timeRemaining,
    )

    if (score === 0) {
      navigateFailure()
    }

    if (score && score > 0) {
      addPoints(score)
      navigateSuccess()
    }
  }

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <StatsLayout>
      <div>
        {movies &&
          movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              posterPath={movie.posterPath}
              onClick={handleMovieSelect}
            />
          ))}
      </div>
    </StatsLayout>
  )
}

export default Question
