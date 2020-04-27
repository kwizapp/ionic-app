import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { IonButton, IonContent, IonPage } from '@ionic/react'
import { insert, sortBy } from 'ramda'
import React, { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router'

import MovieCard from '../components/card/MovieCard'
import useStore from '../useStore'
import { MovieData, MOVIES } from './Question'

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
    fetchPolicy: 'cache-only',
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
        // here we need to only store the difference again
        setPointDifference(scoreBonusResponse - pointDifference)
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
    <IonPage>
      <IonContent>
        <MovieCard
          title={data.movie.title}
          posterPath={data.movie.posterPath}
        />

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
      </IonContent>
    </IonPage>
  )
}

export default BonusQuestion
