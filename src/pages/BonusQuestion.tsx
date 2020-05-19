import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { IonContent, IonPage, useIonViewWillEnter } from '@ionic/react'
import { insert, sortBy } from 'ramda'
import React, { useEffect, useMemo } from 'react'
import { useHistory } from 'react-router'

import niceColors from '../colors'
import MovieCard from '../components/card/MovieCard'
import { InBetweenButton } from '../components/InBetweenButton'
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

/**
 * ### The screen where the user can double his/her points.
 *
 * Shown if...
 * * user guessed initial movie poster correctly
 * * previous question was not a Bonus Question
 */
const BonusQuestion = () => {
  const history = useHistory()

  const { setPointDifference, pointDifference, addPoints } = useStore()

  useIonViewWillEnter(() => {
    addPoints(pointDifference)
  })

  const { data, loading } = useQuery<MovieData>(MOVIES, {
    fetchPolicy: 'cache-only',
  })

  const [submitResponse, scoreResponse] = useLazyQuery(GET_BONUS_SCORE)

  const sortedMovies = useMemo(() => {
    return sortBy((m) => -m.releaseYear, data?.movie.randomMovies ?? [])
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
    const imdbIds = allMovieReleases.reverse().map((m) => m.imdbId)

    submitResponse({
      variables: { imdbIds, titleQuestionScores: pointDifference },
    })
  }

  return (
    <IonPage>
      <IonContent>
        <section className="p-4">
          <div className="text-2xl text-center">Bonus Question</div>
          <div className="text-center font-light text-gray-800">
            Answer correctly to double your points
          </div>
          <div className="my-2 font-medium text-center">
            When was this movie released?
          </div>

          <div className="flex m-2 border border-gray-100 rounded-md shadow-lg">
            <img className="w-12 rounded-md" src={data.movie.posterPath} />

            <div className="flex items-center text-sm text-center font-light text-gray-800 p-2">
              <h2 className="font-sans font-medium tracking-wide text-md">
                {data.movie.title}
              </h2>
            </div>
          </div>
        </section>

        <div className="mx-8 border border-gray-300 mb-10"></div>

        {sortedMovies.map((movie, ix) => (
          <>
            <div className={'flex justify-center relative'}>
              <InBetweenButton
                backgroundColor={niceColors[ix]}
                ix={ix}
                scoreQuestion={scoreQuestion}
              />
            </div>
            <div key={movie.imdbId}>
              <MovieCard title={movie.title} posterPath={movie.posterPath} />
            </div>
          </>
        ))}
        <div className={'flex justify-center relative'}>
          <InBetweenButton
            backgroundColor={niceColors[sortedMovies.length]}
            ix={sortedMovies.length}
            scoreQuestion={scoreQuestion}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default BonusQuestion
