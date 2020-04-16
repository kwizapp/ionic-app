import { gql, useQuery } from '@apollo/client'
import { IonButton, IonImg } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'

import Loading from '../components/Loading'
import useStore from '../useStore'

interface Movie {
  imdbId: string
  title: string
  releaseYear: number
  posterPath: string
}

interface MovieData {
  movie: Movie
}

const MOVIE = gql`
  query($imdbId: String!) {
    movie(imdbId: $imdbId) {
      imdbId
      title
      releaseYear
      posterPath
    }
  }
`

const Trivia = () => {
  const history = useHistory()

  const { currentImdbId } = useStore()

  // FIX ME: I'm returning random movies instead of the specified one!
  // `currentImdbId` is always empty
  const { loading, error, data } = useQuery<MovieData>(MOVIE, {
    variables: { imdbId: currentImdbId },
  })

  const navigateNext = () => history.push('/poster')

  const overlayMargin = '5%';

  if (loading) return <Loading />
  if (error) return <p>Error :(</p>

  return (
    <div className="m-3 flex flex-col items-center">
      <div className="w-full relative">
        <IonImg src={data?.movie?.posterPath} className="w-full h-full" />

        <div
          className="absolute flex items-center justify-center font-bold text-black text-2xl rounded-md"
          style={{
            top: overlayMargin,
            left: overlayMargin,
            width: `calc(100% - 2 * ${overlayMargin})`,
            height: '50px',
            background: 'rgba(196, 196, 196, 0.75)',
            border: '1px solid #B7B7B7',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          <span>Did you know that?</span>
        </div>

        <div
          className="absolute flex flex-col text-lg rounded-md"
          style={{
            top: `calc(${overlayMargin} + 20%)`,
            left: overlayMargin,
            width: `calc(100% - 2 * ${overlayMargin})`,
            background: 'rgba(196, 196, 196, 0.75)',
            border: '1px solid #B7B7B7',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            color: 'black',
            fontWeight: 'bold',
            padding: '10px',
          }}
        >
          <p>Title: {data?.movie?.title}</p>
          <p>Release Year: {data?.movie?.releaseYear}</p>
        </div>
      </div>

      <div className="mt-5 w-11/12 text-center">
        <IonButton className="w-full" onClick={navigateNext}>
          Continue
        </IonButton>
      </div>
    </div>
  )
}

export default Trivia
