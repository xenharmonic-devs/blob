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
        if (currentColor === last(colors)) {
          return head(colors)
        } else {
          const currentIdx = indexOf(currentColor, colors)
          return colors[currentIdx + 1]
        }
      }
    }),
    changeBlobAttribute: (state, { idx, key, value }) => {
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
