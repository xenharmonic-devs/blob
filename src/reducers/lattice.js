import autodux from 'autodux'
import { evolve, without, append, indexOf, last, head } from 'ramda'
import { colors } from '../constants/colors'

const { reducer, actions } = autodux({
  slice: 'lattice',
  initial: {
    width: 517,
    height: 240,
    url: '/demo-lattice.jpg',
    blobSize: 30,
    blobs: [],
    nextBlobColor: head(colors)
  },
  actions: {
    addBlob: (state, payload) => {
      const { x, y, color, assignedMidiKeys } = payload
      return evolve({
        blobs: append({ x, y, color, assignedMidiKeys })
      })(state)
    },
    removeBlobs: (state, payload) => {
      const { blobs } = payload
      return evolve({
        blobs: without(blobs)
      })(state)
    },
    changeNextBlobColor: (state, payload) => {
      return evolve({
        nextBlobColor: currentColor => {
          if (currentColor === last(colors)) {
            return head(colors)
          } else {
            const currentIdx = indexOf(currentColor, colors)
            return colors[currentIdx + 1]
          }
        }
      })(state)
    },
    changeBlobAttribute: (state, payload) => {
      const { idx, key, value } = payload
      return evolve({
        blobs: {
          [idx]: {
            [key]: () => value
          }
        }
      })(state)
    }
  }
})

export { reducer, actions }
