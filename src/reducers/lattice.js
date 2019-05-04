import autodux from 'autodux'
import { evolve, without, append, indexOf, last, head } from 'ramda'

const blobColors = ['yellow', 'green', 'blue', 'red', 'brown', 'orange', 'purple', 'black']

const { reducer, actions } = autodux({
  slice: 'lattice',
  initial: {
    width: 517,
    height: 240,
    url: '/demo-lattice.jpg',
    blobSize: 30,
    blobs: [],
    nextBlobColor: blobColors[0]
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
    },
    changeNextBlobColor: evolve({
      nextBlobColor: currentColor => {
        if (currentColor === last(blobColors)) {
          return head(blobColors)
        } else {
          const currentIdx = indexOf(currentColor, blobColors)
          return blobColors[currentIdx + 1]
        }
      }
    })
  }
})

export { reducer, actions }
