import { Plugins } from '@capacitor/core'
import create, { State } from 'zustand'
import produce from 'immer'
import { QUESTION_TIME } from './settings'

const { Storage } = Plugins

// setup immer to ensure data is changed immutably
// this will allows us to "mutate" state without actually changing existing values
// as immer always produces new objects when we mutate old ones
const immer = (config: any) => (set: Function, get: Function, api: any) =>
  config((fn: any) => set(produce(fn)), get, api)

// setup a persistence enhancer
const persist = (config: any) => (set: Function, get: Function, api: any) =>
  config(
    (args: any) => {
      set(args)
      Storage.set({ key: 'GameState', value: JSON.stringify(get()) })
    },
    get,
    api,
  )

// setup the zustand store hook
const initialState = {
  alive: true,
  lives: 3,
  points: 0,
  timeRemaining: QUESTION_TIME,
}
const [useStore] = create(
  persist(
    immer((set: any) => ({
      ...initialState,
      setState(newState: any) {
        set(() => newState)
      },
      resetState() {
        set(() => initialState)
      },
      setTimeRemaining(seconds: any) {
        set((state: State) => {
          state.timeRemaining = seconds
        })
      },
      addPoints() {
        set((state: State) => {
          // TODO: use the points provided by the API instead
          state.points += (state.timeRemaining / QUESTION_TIME) * 1000
        })
      },
      removeLife() {
        set((state: State) => {
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
