import { evolve, append, reject, propEq } from 'ramda'
import uuidV4 from 'uuid/v4'
import autodux from 'autodux'

const { reducer, actions } = autodux({
  slice: 'state',
  initial: {
    notifications: []
  },
  actions: {
    addNotification: (state, payload) => {
      const { title, detail, type } = payload
      return evolve({
        notifications: append({
          id: uuidV4(),
          title,
          detail,
          type
        })
      })(state)
    },
    removeNotification: (state, payload) => {
      const { id } = payload
      return evolve({
        notifications: reject(propEq('id', id))
      })(state)
    }
  }
})

export { reducer, actions }
