import { startsWith } from 'ramda'

const urlSync = store => next => action => {
  const result = next(action)

  if (startsWith('lattice/', action.type) && action.type !== 'lattice/changeNextBlobColor') {
    const {
      lattice: { blobs }
    } = store.getState()
    window.location.hash = JSON.stringify(blobs)
  }

  return result
}

export default urlSync
