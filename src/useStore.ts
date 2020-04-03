import create, { State } from 'zustand'
import produce from 'immer'

// setup immer to ensure data is changed immutably
// this will allows us to "mutate" state without actually changing existing values
// as immer always produces new objects when we mutate old ones
const immer = (config: any) => (set: Function, get: Function, api: any) =>
  config((fn: any) => set(produce(fn)), get, api)

// setup the zustand store hook
const [useStore] = create(
  immer((set: any) => ({
    lives: 3,
    points: 0,
    removeLife() {
      set((state: State) => {
        state.lives -= 1
      })
    },
  })),
)

export default useStore
