import { combineReducers } from 'redux'

import { reducer as scale } from './scale'
import { reducer as state } from './state'
import { reducer as lattice } from './lattice'

export default combineReducers({
  scale,
  state,
  lattice
})
