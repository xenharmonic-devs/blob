import React from 'react'
import { compose, isEmpty, intersection } from 'ramda'
import { connect } from 'react-redux'
import { colors } from '../../../constants/colors'
import Button from '../Button'
import { getPressedNotesFromNoteTable } from '../../../helpers/midi'
import { actions as latticeActions } from '../../../reducers/lattice'

const enhance = compose(
  connect(
    state => ({
      pressedKeys: getPressedNotesFromNoteTable(state.midi.noteTable),
      blobs: state.lattice.blobs,
      latticeWidth: state.lattice.width,
      latticeHeight: state.lattice.height
    }),
    {
      ...latticeActions
    }
  )
)

const LatticeInfo = props => {
  const { blobs, removeBlobs, changeBlobAttribute, latticeWidth, latticeHeight, pressedKeys } = props
  return (
    <div className={'LatticeInfo'}>
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
    </div>
  )
}

export default enhance(LatticeInfo)
