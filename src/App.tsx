import './theme/tailwind.css'
import './theme/variables.css'
import '@ionic/react/css/core.css'

import { ApolloProvider } from '@apollo/client'
import { IonApp } from '@ionic/react'
import React from 'react'

import AppRouter from './AppRouter'
import createClient from './graphql/client'

const client = createClient()

/* Core CSS required for Ionic components to work properly */
/* Basic CSS for apps built with Ionic */
/* Theme variables */
function App(): React.ReactElement {
  return (
    <IonApp>
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </IonApp>
  )
}

export default App
