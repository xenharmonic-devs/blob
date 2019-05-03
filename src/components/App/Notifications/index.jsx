import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { actions as stateActions } from '../../../reducers/state'
import Notification from './Notification'

const TYPE = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success'
}

const enhance = compose(
  connect(
    state => ({
      notifications: state.state.notifications
    }),
    stateActions
  )
)

const Notifications = ({ notifications, removeNotification }) => (
  <div>
    <h2>Notifications</h2>
    {notifications.map(props => (
      <Notification key={props.id} {...props} onRemoveNotification={id => removeNotification({ id })} />
    ))}
  </div>
)

export default enhance(Notifications)

export { TYPE }
