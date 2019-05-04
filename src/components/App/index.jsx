import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { actions as stateActions } from '../../reducers/state'
import MIDI, { isMidiSupported } from '../../helpers/MIDI'
import Notifications, { TYPE as NOTIFICATION_TYPE } from './Notifications'
import Lattice from './Lattice'
import Title from './Title'

const enhance = compose(
  connect(
    state => ({}),
    stateActions
  )
)

const App = ({ addNotification }) => {
  if (isMidiSupported()) {
    const midi = new MIDI()
    midi.on('note on', (note, velocity, channel) => {
      console.log('pressing note', note)
    })
    midi.on('note off', (note, velocity, channel) => {
      console.log('releasing note', note)
    })
    midi.init()
  } else {
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
      <Title />
      <Lattice />
      <Notifications />
    </div>
  )
}

export default enhance(App)
