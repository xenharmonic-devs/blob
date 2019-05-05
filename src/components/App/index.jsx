import React, { useEffect } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { actions as stateActions } from '../../reducers/state'
import { actions as midiActions } from '../../reducers/midi'
import MIDI, { isMidiSupported } from '../../helpers/MIDI'
import Notifications, { TYPE as NOTIFICATION_TYPE } from './Notifications'
import Lattice from './Lattice'
import Title from './Title'
import LatticeInfo from './LatticeInfo'

const enhance = compose(
  connect(
    state => ({}),
    {
      ...stateActions,
      ...midiActions
    }
  )
)

const App = ({ addNotification, noteOn, noteOff }) => {
  useEffect(() => {
    if (isMidiSupported()) {
      const midi = new MIDI()
      midi.on('note on', (note, velocity, channel) => {
        noteOn({ noteIdx: note })
      })
      midi.on('note off', (note, velocity, channel) => {
        noteOff({ noteIdx: note })
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
  }, 1)

  return (
    <div className={'App'}>
      <Title />
      <Lattice />
      <LatticeInfo />
      <Notifications />
    </div>
  )
}

export default enhance(App)
