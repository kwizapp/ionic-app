import { IonButton } from '@ionic/react'
import React, { useMemo, useEffect } from 'react'
import { insert, sortBy } from 'ramda'
import { useHistory } from 'react-router'

import StatsLayout from '../components/layouts/StatsLayout'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { MovieData, MOVIES } from './Question'
import MovieCard from '../components/card/MovieCard'
import useStore from '../useStore'

const GET_BONUS_SCORE = gql`
  query($imdbIds: [String!]!, $titleQuestionScores: Int!) {
    scoreBonusResponse(
      imdbIds: $imdbIds
      titleQuestionScores: $titleQuestionScores
    )
  }
`

const BonusQuestion = () => {
  const history = useHistory()

  const { setPointDifference, pointDifference } = useStore()

  const { loading, data } = useQuery<MovieData>(MOVIES, {
    fetchPolicy: 'network-only',
  })

  const [submitResponse, scoreResponse] = useLazyQuery(GET_BONUS_SCORE)

  const sortedMovies = useMemo(() => {
    return sortBy(m => -m.releaseYear, data?.movie.randomMovies ?? [])
  }, [data])

  // create an effect that is executed on changes to scoreResponse in our lazy query
  // => will be called once on first render and once when a scoring response is received
  useEffect(() => {
    if (Number.isFinite(scoreResponse?.data?.scoreBonusResponse)) {
      const { scoreBonusResponse } = scoreResponse.data

      if (scoreBonusResponse === 0) {
        history.replace('/failure')
        // if we fail at the bonus question, lose the points won before
        setPointDifference(-pointDifference)
      } else if (scoreBonusResponse > 0) {
        // if we win the bonus question, get the additional points
        setPointDifference(scoreBonusResponse)
        history.replace('/success')
      }
    }
  }, [scoreResponse.data])

  if (loading || !data) {
    return null
  }

  const scoreQuestion = async (responseIndex: number) => {
    // insert the movie at the specified index
    const allMovieReleases = insert(responseIndex, data.movie, sortedMovies)

    // extract the imdbIds in reverse order
    // as the backend expects release years in increasing order
    const imdbIds = allMovieReleases.reverse().map(m => m.imdbId)

    submitResponse({
      variables: { imdbIds, titleQuestionScores: pointDifference },
    })
  }

  return (
    <StatsLayout>
      <MovieCard title={data.movie.title} posterPath={data.movie.posterPath} />

      <div className="p-1 text-sm text-center text-gray-600">
        When was the movie released?
      </div>

      {sortedMovies.map((movie, ix) => (
        <div key={movie.imdbId}>
          <IonButton onClick={() => scoreQuestion(ix)}>HERE</IonButton>
          <MovieCard title={movie.title} posterPath={movie.posterPath} />
        </div>
      ))}

      <IonButton onClick={() => scoreQuestion(sortedMovies.length)}>
        HERE
      </IonButton>
    </StatsLayout>
  )
}

export default BonusQuestion
