import { Plugins } from '@capacitor/core'
import { useIonViewWillEnter } from '@ionic/react'

import useStore from './useStore'

const { Storage } = Plugins

const STORE_KEY = 'GameState'

export const useStorage = () => {
  const { setState } = useStore()

  useIonViewWillEnter(async () => {
    const gameState = await Storage.get({ key: STORE_KEY })
    if (gameState.value) {
      setState(JSON.parse(gameState.value))
    }
  }, [setState])
}
