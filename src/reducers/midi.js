import autodux from 'autodux'
import { evolve, T, assocPath, F, ifElse, hasPath } from 'ramda'

const { reducer, actions } = autodux({
  slice: 'midi',
  initial: {
    ready: false,
    noteTable: {
      64: { pressed: false, sustained: false }
    }
  },
  actions: {
    noteOn: (state, { noteIdx }) =>
      ifElse(
        hasPath(['noteTable', noteIdx]),
        evolve({
          noteTable: {
            [noteIdx]: {
              pressed: T
            }
          }
        }),
        assocPath(['noteTable', noteIdx], { pressed: true, sustained: false })
      )(state),
    noteOff: (state, { noteIdx }) =>
      ifElse(
        hasPath(['noteTable', noteIdx]),
        evolve({
          noteTable: {
            [noteIdx]: {
              pressed: F
            }
          }
        }),
        assocPath(['noteTable', noteIdx], { pressed: false, sustained: false })
      )(state)
  }
})

export { reducer, actions }
