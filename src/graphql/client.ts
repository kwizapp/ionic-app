import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export default () =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Movie: {
          keyFields: ['imdbId'],
        },
      },
    }),
    link: new HttpLink({
      uri: process.env.API_URL,
    }),
  })
