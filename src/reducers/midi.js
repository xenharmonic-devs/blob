import autodux from 'autodux'
import { evolve, T, assocPath, F, has } from 'ramda'

const { reducer, actions } = autodux({
  slice: 'midi',
  initial: {
    ready: false,
    noteTable: {
      64: { pressed: false, sustained: false }
    }
  },
  actions: {
    noteOn: (state, { noteIdx }) => {
      if (has(noteIdx, state.noteTable)) {
        return evolve(
          {
            noteTable: {
              [noteIdx]: {
                pressed: T
              }
            }
          },
          state
        )
      } else {
        return assocPath(['noteTable', noteIdx], { pressed: true, sustained: false }, state)
      }
    },
    noteOff: (state, { noteIdx }) => {
      if (has(noteIdx, state.noteTable)) {
        return evolve(
          {
            noteTable: {
              [noteIdx]: {
                pressed: F
              }
            }
          },
          state
        )
      } else {
        return assocPath(['noteTable', noteIdx], { pressed: false, sustained: false }, state)
      }
    }
  }
})

export { reducer, actions }
