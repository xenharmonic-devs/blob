import { combineReducers } from 'redux'

import { reducer as scale } from './scale'
import { reducer as state } from './state'

export default combineReducers({
  scale,
  state
})
