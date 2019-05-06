import { startsWith } from 'ramda'
import { serializedBlobs } from '../helpers/blobs'

const urlSync = store => next => action => {
  const result = next(action)

  if (startsWith('lattice/', action.type) && action.type !== 'lattice/changeNextBlobColor') {
    const {
      lattice: { blobs, url, width, height }
    } = store.getState()

    window.location.hash = `${url}|${width}|${height}|${serializedBlobs(blobs)}`
  }

  return result
}

export default urlSync
