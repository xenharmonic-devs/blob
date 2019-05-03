import { combineReducers } from 'redux'

import { reducer as lattice } from './lattice'
import { reducer as midi } from './midi'
import { reducer as scale } from './scale'
import { reducer as state } from './state'

export default combineReducers({
  lattice,
  midi,
  scale,
  state
})
