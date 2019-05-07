import { startsWith } from 'ramda'
import { serializeLattice } from '../helpers/lattice'

const urlSync = store => next => action => {
  const result = next(action)

  if (startsWith('lattice/', action.type) && action.type !== 'lattice/changeNextBlobColor') {
    const { lattice } = store.getState()
    window.location.hash = serializeLattice(lattice)
  }

  return result
}

export default urlSync
