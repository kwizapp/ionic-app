import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Movie: {
        keyFields: ['imdbId'],
      },
    },
  }),
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql',
  }),
})
