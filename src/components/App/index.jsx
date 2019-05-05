import React, { useEffect } from 'react'
import { compose, isEmpty, intersection } from 'ramda'
import { connect } from 'react-redux'
import { actions as stateActions } from '../../reducers/state'
import { actions as midiActions } from '../../reducers/midi'
import { actions as latticeActions } from '../../reducers/lattice'
import MIDI, { isMidiSupported, getPressedNotesFromNoteTable } from '../../helpers/MIDI'
import { colors } from '../../constants/colors'
import Notifications, { TYPE as NOTIFICATION_TYPE } from './Notifications'
import Lattice from './Lattice'
import Title from './Title'
import Button from './Button'

const enhance = compose(
  connect(
    state => ({
      blobs: state.lattice.blobs,
      pressedKeys: getPressedNotesFromNoteTable(state.midi.noteTable),
      latticeWidth: state.lattice.width,
      latticeHeight: state.lattice.height
    }),
    {
      ...stateActions,
      ...midiActions,
      ...latticeActions
    }
  )
)

const App = ({
  addNotification,
  noteOn,
  noteOff,
  blobs,
  pressedKeys,
  removeBlobs,
  changeBlobAttribute,
  latticeWidth,
  latticeHeight
}) => {
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
      <div>pressedKeys: {JSON.stringify(pressedKeys)}</div>
      <table>
        <tbody>
          {blobs.map((blob, idx) => {
            const { x, y, color: blobColor, assignedMidiKeys } = blob
            return (
              <tr key={idx}>
                <td>
                  <input
                    type="number"
                    min={0}
                    max={latticeWidth}
                    value={x}
                    onChange={e => {
                      changeBlobAttribute({
                        idx,
                        key: 'x',
                        value: e.target.value
                      })
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min={0}
                    max={latticeHeight}
                    value={y}
                    onChange={e => {
                      changeBlobAttribute({
                        idx,
                        key: 'y',
                        value: e.target.value
                      })
                    }}
                  />
                </td>
                <td>
                  <select
                    value={blobColor}
                    onChange={e => {
                      changeBlobAttribute({
                        idx,
                        key: 'color',
                        value: e.target.value
                      })
                    }}
                  >
                    {colors.map(color => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ fontWeight: isEmpty(intersection(pressedKeys, assignedMidiKeys)) ? 'normal' : 'bold' }}>
                  {JSON.stringify(assignedMidiKeys)}
                </td>
                <td>
                  <Button onClick={() => removeBlobs({ blobs: [blob] })}>remove</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Notifications />
    </div>
  )
}

export default enhance(App)
