import { gql } from '@apollo/client'

import initiApolloClient from '../graphql/client'

const client = initiApolloClient()

const GET_SCORE = gql`
  query($imdbId: String!, $selectedTitle: String!, $remainingSeconds: Int!) {
    scoreTitleResponse(
      imdbId: $imdbId
      selectedTitle: $selectedTitle
      remainingSeconds: $remainingSeconds
    )
  }
`

export const movieService = {
  /**
   * Returns the achieved score given the selected movie
   * title, the actual movie-id and the remaining seconds.
   *
   * This function calls the api.
   */
  validateAnswer: async (
    movieTitle: string,
    currentImdbId: string,
    remainingSeconds: number,
  ) => {
    try {
      const res = await client.query({
        query: GET_SCORE,
        variables: {
          imdbId: currentImdbId,
          selectedTitle: movieTitle,
          remainingSeconds: remainingSeconds,
        },
      })

      const score = res.data.scoreTitleResponse as number

      return score
    } catch (error) {
      console.warn(error)
    }
  },
}
