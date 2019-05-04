import { compose, keys, filter, either, propEq, map, unary } from 'ramda'
import EventEmitter from 'eventemitter3'

// https://www.midi.org/specifications/item/table-1-summary-of-midi-message
const commands = {
  noteOn: 0b1001,
  noteOff: 0b1000,
  aftertouch: 0b1010,
  pitchbend: 0b1110,
  cc: 0b1011
}

// https://www.midi.org/specifications/item/table-3-control-change-messages-data-bytes-2
// http://www.nortonmusic.com/midi_cc.html
const cc = {
  dataEntry: 6,
  sustain: 64,
  registeredParameterLSB: 100,
  registeredParameterMSB: 101
}

class MIDI extends EventEmitter {
  async init() {
    const enableMidiSupport = midiAccess => {
      midiAccess.onstatechange = event => {
        initPort(event.port)
      }

      const inputs = midiAccess.inputs.values()
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        initPort(input.value)
      }
    }

    const initPort = port => {
      if (port.type === 'input') {
        if (port.state === 'connected') {
          if (port.connection === 'closed') {
            port.open()
          } else if (port.connection === 'open') {
            port.onmidimessage = ({ data: [data, ...params] }) => {
              const cmd = data >> 4
              const channel = data & 0x0f

              switch (cmd) {
                case commands.noteOff:
                  {
                    const [note, velocity] = params
                    this.emit('note off', note, (velocity / 128) * 100, channel)
                  }
                  break
                case commands.noteOn:
                  {
                    const [note, velocity] = params
                    this.emit('note on', note, (velocity / 128) * 100, channel)
                  }
                  break
                case commands.cc:
                  {
                    const [cmd, value] = params
                    if (cmd === cc.sustain) {
                      this.emit(value >= 64 ? 'sustain on' : 'sustain off')
                    }
                  }
                  break
              }
            }
          }
        }
      }
    }

    if (isMidiSupported()) {
      const midiAccess = await navigator.requestMIDIAccess()
      enableMidiSupport(midiAccess)
      this.emit('ready')
    } else {
      this.emit('ready')
    }
  }
}

const getPressedNotesFromNoteTable = compose(
  map(unary(parseInt)),
  keys,
  filter(either(propEq('pressed', true), propEq('sustained', true)))
)

const isMidiSupported = () => !!navigator.requestMIDIAccess

export { getPressedNotesFromNoteTable, isMidiSupported }

export default MIDI
