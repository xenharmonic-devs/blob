import autodux from 'autodux'
import { evolve, T, assocPath, F, ifElse, hasPath, map, when, propEq, assoc } from 'ramda'

const { reducer, actions } = autodux({
  slice: 'midi',
  initial: {
    ready: false,
    sustainOn: false,
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
              pressed: T,
              sustained: () => state.sustainOn
            }
          }
        }),
        assocPath(['noteTable', noteIdx], { pressed: true, sustained: state.sustainOn })
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
      )(state),
    sustainOn: evolve({
      sustainOn: T,
      noteTable: map(when(propEq('pressed', true), assoc('sustained', true)))
    }),
    sustainOff: evolve({
      sustainOn: F,
      noteTable: map(assoc('sustained', false))
    })
  }
})

export { reducer, actions }
