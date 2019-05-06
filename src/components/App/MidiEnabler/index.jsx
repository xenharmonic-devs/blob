import React, { useEffect, useState } from 'react'
import Button from '../Button'
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
    <Button
      className={s.MidiEnabler}
      disabled={isMidiInited}
      onClick={() => {
        if (!isMidiInited) {
          if (midi.isSupported()) {
            midi.init()
          }
          setIsMidiInited(true)
        }
      }}
    >
      {isMidiInited ? '✔ MIDI enabled' : 'enable MIDI'}
    </Button>
  )
}

export default MidiEnabler
