import autodux from 'autodux'

const { reducer, actions } = autodux({
  slice: 'midi',
  initial: {
    noteTable: {
      64: { pressed: true, sustained: false }
    }
  },
  actions: {}
})

export { reducer, actions }
