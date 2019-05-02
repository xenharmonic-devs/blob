import autodux from 'autodux'

const { reducer, actions } = autodux({
  slice: 'lattice',
  initial: {
    width: 517,
    height: 240,
    url: '/demo-lattice.jpg'
  },
  actions: {}
})

export { reducer, actions }
