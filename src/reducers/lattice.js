import autodux from 'autodux'

const { reducer, actions } = autodux({
  slice: 'lattice',
  initial: {
    width: 517,
    height: 240,
    url: '/demo-lattice.jpg',
    blobs: [{ x: 72, y: 75, size: 30, color: 'yellow', isVisible: true }]
  },
  actions: {}
})

export { reducer, actions }
