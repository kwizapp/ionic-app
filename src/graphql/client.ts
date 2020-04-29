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
      // TODO: needs to be refactored for ENV injection
      uri: 'http://localhost:3001/graphql',
    }),
  })
