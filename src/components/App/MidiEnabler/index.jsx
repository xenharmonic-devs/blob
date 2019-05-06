import React, { useEffect, useState } from 'react'
import ToggleSwitch from '../ToggleSwitch'
import s from './style.scss'

const MidiEnabler = props => {
  const { midi } = props
  const [isMidiInited, setIsMidiInited] = useState(false)

  useEffect(() => {
    if (midi.isSupported) {
      midi.on('blocked', () => setIsMidiInited(false))
    }
  }, 1)

  return (
    <ToggleSwitch
      className={s.MidiEnabler}
      value={isMidiInited}
      disabled={isMidiInited}
      onChange={() => {
        // TODO: this doesn't count as user interaction for Chrome on OSX
        if (!isMidiInited) {
          if (midi.isSupported()) {
            midi.init()
          }
          setIsMidiInited(true)
        }
      }}
      label={'MIDI Enabled'}
    />
  )
}

export default MidiEnabler
