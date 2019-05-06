import React, { useEffect } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { actions as stateActions } from '../../reducers/state'
import { actions as midiActions } from '../../reducers/midi'
import MIDI from '../../helpers/midi'
import Notifications, { TYPE as NOTIFICATION_TYPE } from './Notifications'
import Lattice from './Lattice'
import Title from './Title'
import LatticeInfo from './LatticeInfo'
import MidiEnabler from './MidiEnabler'
import LatticeUrl from './LatticeUrl'

const enhance = compose(
  connect(
    null,
    {
      ...stateActions,
      ...midiActions
    }
  )
)

const midi = new MIDI()

const App = props => {
  const { addNotification, noteOn, noteOff, sustainOn, sustainOff } = props
  useEffect(() => {
    if (midi.isSupported()) {
      midi
        .on('note on', note => noteOn({ noteIdx: note }))
        .on('note off', note => noteOff({ noteIdx: note }))
        .on('sustain on', sustainOn)
        .on('sustain off', sustainOff)
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
      <Title>
        <MidiEnabler midi={midi} />
        Blob
      </Title>
      <Lattice />
      <LatticeUrl />
      <LatticeInfo />
      <Notifications />
    </div>
  )
}

export default enhance(App)
