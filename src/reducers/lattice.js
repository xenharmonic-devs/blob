import autodux from 'autodux'
import { evolve, without, append } from 'ramda'

const { reducer, actions } = autodux({
  slice: 'lattice',
  initial: {
    width: 517,
    height: 240,
    url: '/demo-lattice.jpg',
    blobSize: 30,
    blobs: []
  },
  actions: {
    addBlob: (state, { x, y, color, assignedMidiKeys }) => {
      return evolve({
        blobs: append({ x, y, color, assignedMidiKeys })
      })(state)
    },
    removeBlobs: (state, { blobs }) => {
      return evolve({
        blobs: without(blobs)
      })(state)
    }
  }
})

export { reducer, actions }
