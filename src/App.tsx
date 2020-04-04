// import '@ionic/react/css/normalize.css'
import '@ionic/react/css/core.css'
// import '@ionic/react/css/display.css'
// import '@ionic/react/css/flex-utils.css'
// import '@ionic/react/css/float-elements.css'
// import '@ionic/react/css/padding.css'
// import '@ionic/react/css/structure.css'
// import '@ionic/react/css/text-alignment.css'
// import '@ionic/react/css/text-transformation.css'
// import '@ionic/react/css/typography.css'

import './theme/variables.css'
import './theme/tailwind.css'

import { IonApp } from '@ionic/react'
import React from 'react'

import AppRouter from './AppRouter'
import { ApolloProvider } from '@apollo/client'
import createClient from './graphql/client'

const client = createClient()

/* Core CSS required for Ionic components to work properly */
/* Basic CSS for apps built with Ionic */
/* Optional CSS utils that can be commented out */
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
