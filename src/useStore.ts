import { Plugins } from '@capacitor/core'
import produce from 'immer'
import create, { GetState, SetState, StoreApi } from 'zustand'

import { QUESTION_TIME } from './settings'

const { Storage } = Plugins

interface Store {
  alive: boolean
  lives: number
  points: number
  timeRemaining: number
  currentImdbId: string
  setState: (state: Partial<Store>) => void
  resetState: () => void
  setTimeRemaining: (seconds: number) => void
  setCurrentImdbId: (id: string) => void
  addPoints: (points: number) => void
  removeLife: () => void
}

// setup immer to ensure data is changed immutably
// this will allows us to "mutate" state without actually changing existing values
// as immer always produces new objects when we mutate old ones
const immer = (config: any) => (
  set: SetState<Store>,
  get: GetState<Store>,
  api: StoreApi<Store>,
) => config((fn: any) => set(produce(fn)), get, api)

// setup a persistence enhancer
const persist = (config: any) => (
  set: SetState<Store>,
  get: GetState<Store>,
  api: StoreApi<Store>,
) =>
  config(
    (args: any) => {
      set(args)
      Storage.set({ key: 'GameState', value: JSON.stringify(get()) })
    },
    get,
    api,
  )

// setup the zustand store hook
const initialState: Partial<Store> = {
  alive: true,
  lives: 3,
  points: 0,
  timeRemaining: QUESTION_TIME,
  currentImdbId: '',
}

const [useStore] = create<Store>(
  persist(
    immer((set: any) => ({
      ...initialState,

      setState(newState: Partial<Store>) {
        set(() => newState)
      },

      resetState() {
        set(() => initialState)
      },

      setTimeRemaining(seconds: number) {
        set((state: Store) => {
          state.timeRemaining = seconds
        })
      },

      setCurrentImdbId(id: string) {
        set((state: Store) => {
          state.currentImdbId = id
        })
      },

      addPoints(points: number) {
        set((state: Store) => {
          state.points += points
        })
      },

      removeLife() {
        set((state: Store) => {
          if (state.lives > 1) {
            state.lives -= 1
          } else {
            state.lives = 0
            state.alive = false
          }
        })
      },
    })),
  ),
)

export default useStore
