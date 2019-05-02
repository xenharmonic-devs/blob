import { evolve, append, reject, propEq } from 'ramda'
import uuidV4 from 'uuid/v4'
import autodux from 'autodux'

const { reducer, actions } = autodux({
  slice: 'state',
  initial: {
    notifications: []
  },
  actions: {
    addNotification: (state, { title, detail, type }) =>
      evolve(
        {
          notifications: append({
            id: uuidV4(),
            title,
            detail,
            type
          })
        },
        state
      ),
    removeNotification: (state, { id }) =>
      evolve(
        {
          notifications: reject(propEq('id', id))
        },
        state
      )
  }
})

export { reducer, actions }
