import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { actions as stateActions } from '../../reducers/state'
import Notifications, { TYPE as NOTIFICATION_TYPE } from './components/Notifications'
import Lattice from './components/Lattice'

const enhance = compose(
  connect(
    state => ({}),
    stateActions
  )
)

const App = ({ addNotification }) => {
  if (!navigator.requestMIDIAccess) {
    addNotification({
      title: (
        <>
          <a href="https://www.w3.org/TR/webmidi/">Web MIDI API</a> is not supported
        </>
      ),
      detail: (
        <>
          To see, which browsers support the Web MIDI API, please visit{' '}
          <a href="https://caniuse.com/#feat=midi">https://caniuse.com/#feat=midi</a>
        </>
      ),
      type: NOTIFICATION_TYPE.WARNING
    })
  }

  return (
    <div className={'App'}>
      <h3>Blob</h3>
      <Lattice />
      <Notifications />
    </div>
  )
}

export default enhance(App)
