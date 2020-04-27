import { useQuery, gql } from '@apollo/client'
import { IonButton, IonContent, IonImg, IonPage, IonCard } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import Loading from '../components/Loading'
import TriviaOverlay from '../components/TriviaOverlay'
import { MovieData } from './Question'

export const GET_MOVIE = gql`
  query($imdbId: String!) {
    movie(imdbId: $imdbId) {
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

const Trivia = () => {
  const history = useHistory()

  const { loading, data } = useQuery<MovieData>(GET_MOVIE, {
    // fetchPolicy: 'cache-only',
    variables: { imdbId: 'tt0167261' },
  })

  const navigateNext = () => history.push('/poster')

  const overlayMargin = '3%'

  if (loading || !data) return <Loading />

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col items-center">
          <div className="p-4 w-full relative">
            <IonCard>
              <IonImg src={data?.movie?.posterPath} className="w-full h-full" />
            </IonCard>

            <TriviaOverlay
              className="items-center justify-center "
              margin={overlayMargin}
              style={{
                top: overlayMargin,
                height: '50px',
                backgroundColor: 'white',
              }}
            >
              <span className="text-2xl text-black">Did you know that...</span>
            </TriviaOverlay>

            <TriviaOverlay
              className="flex-col text-lg"
              margin={overlayMargin}
              style={{
                top: `calc(${overlayMargin} + 20%)`,
                color: 'black',
                padding: '10px',
              }}
            >
              <div>
                <p>
                  <span className="font-bold">...{data?.movie?.title}</span> was
                  released in
                  <span className="font-bold">
                    {' '}
                    {data?.movie?.releaseYear}
                  </span>{' '}
                  and earned around{' '}
                  <span className="font-bold">${data?.movie?.revenue}</span> at
                  the box office with a budget of{' '}
                  <span className="font-bold">${data?.movie?.budget}</span>.
                  <p className="mt-4">
                    Popularity:{' '}
                    <span className="font-bold">{data?.movie?.popularity}</span>
                  </p>
                </p>
              </div>
            </TriviaOverlay>
          </div>

          <div className="mt-5 w-11/12 text-center">
            <IonButton className="w-full" onClick={navigateNext}>
              Continue
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Trivia
