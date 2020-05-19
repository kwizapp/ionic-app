import { Plugins } from '@capacitor/core'
import produce from 'immer'
import create, { GetState, SetState, StoreApi } from 'zustand'

import { QUESTION_TIME } from './settings'

const { Storage } = Plugins

export interface Guess {
  imdbId: string
  title: string
  posterPath: string
}

export interface Movie {
  imdbId: string
  title: string
  posterPath: string
  budget: number
  revenue: number
  popularity: number
  releaseYear: number
}

interface Store {
  alive: boolean
  lives: number
  livesTotal: number
  points: number
  pointDifference: number
  timeRemaining: number
  movie: Movie
  streak: number
  bestStreak: number
  guess: Guess
  setState: (state: Partial<Store>) => void
  resetState: () => void
  setTimeRemaining: (fun: (currentTime: number) => number) => void
  setMovie: (data: Movie) => void
  setGuess: (data: Guess) => void
  addPoints: (points: number) => void
  setPointDifference: (pointDifference: number) => void
  removeLife: () => void
  increaseStreak: () => void
  resetStreak: () => void
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
  livesTotal: 3,
  lives: 3,
  points: 0,
  pointDifference: 0, // the points gained or lost since the last question
  timeRemaining: QUESTION_TIME,
  streak: 0,
  bestStreak: 0,
  movie: {
    imdbId: '',
    title: '',
    posterPath: '',
    budget: 0,
    popularity: 0.0,
    revenue: 0,
    releaseYear: 0,
  },
  guess: {
    imdbId: '',
    title: '',
    posterPath: '',
  },
}

/**
 * Global State Management Store
 *
 * Can be imported by any component as hook
 */
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

      setTimeRemaining(fun: (currentTime: number) => number) {
        set((state: Store) => {
          state.timeRemaining = fun(state.timeRemaining)
        })
      },

      setMovie(data: Movie) {
        set((state: Store) => {
          state.movie = data
        })
      },

      setGuess(data: Guess) {
        set((state: Store) => {
          state.guess = data
        })
      },

      addPoints(points: number) {
        set((state: Store) => {
          state.points += points
        })
      },

      setPointDifference(pointDifference: number) {
        set((state: Store) => {
          state.pointDifference = pointDifference
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

      increaseStreak() {
        set((state: Store) => {
          state.streak++
          if (state.streak > state.bestStreak) {
            state.bestStreak = state.streak
          }
        })
      },

      resetStreak() {
        set((state: Store) => {
          state.streak = 0
        })
      },
    })),
  ),
)

export default useStore
