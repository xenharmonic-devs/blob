import autodux from 'autodux'

const { reducer, actions } = autodux({
  slice: 'lattice',
  initial: {
    width: 517,
    height: 240,
    url: '/demo-lattice.jpg',
    blobSize: 30,
    blobs: [{ x: 72, y: 75, color: 'yellow', assignedMidiKeys: [64] }]
  },
  actions: {
    addBlob: (state, { x, y, color, assignedMidiKeys }) => {
      console.log(x, y, color, assignedMidiKeys)
      return state
    }
  }
})

export { reducer, actions }
