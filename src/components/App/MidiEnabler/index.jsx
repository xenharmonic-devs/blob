import React, { useEffect, useState } from 'react'
import ToggleSwitch from '../ToggleSwitch'
import s from './style.scss'

const MidiEnabler = props => {
  const { midi } = props
  const [isMidiInited, setIsMidiInited] = useState(false)
  const [isMidiBlocked, setIsMidiBlocked] = useState(false)

  useEffect(() => {
    if (midi.isSupported) {
      midi.on('blocked', () => {
        setIsMidiInited(false)
        setIsMidiBlocked(true)
      })
    }
  }, 1)

  return (
    <ToggleSwitch
      className={s.MidiEnabler}
      on={isMidiInited}
      disabled={isMidiInited}
      onChange={() => {
        if (!isMidiInited) {
          if (midi.isSupported()) {
            midi.init()
          }
          setIsMidiInited(true)
        }
      }}
      label={`MIDI Enabled${isMidiBlocked ? ' (blocked)' : ''}`}
    />
  )
}

export default MidiEnabler
