import React, { useState } from 'react'
import { compose, reject, intersection, isEmpty, length, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { getPressedNotesFromNoteTable } from '../../../helpers/MIDI'
import { actions as latticeActions } from '../../../reducers/lattice'
import { getRelativeCoordinates } from './helpers'
import Blob from './Blob'
import s from './style.scss'

const enhance = compose(
  connect(
    state => ({
      width: state.lattice.width,
      height: state.lattice.height,
      url: state.lattice.url,
      blobSize: state.lattice.blobSize,
      blobs: state.lattice.blobs,
      pressedKeys: getPressedNotesFromNoteTable(state.midi.noteTable),
      nextColor: 'purple'
    }),
    latticeActions
  )
)

const Lattice = ({ width, height, url, blobSize, blobs, pressedKeys, nextColor, addBlob }) => {
  const visibleBlobs = reject(({ assignedMidiKeys }) => isEmpty(intersection(pressedKeys, assignedMidiKeys)), blobs)

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isCursorOverLattice, setIsCursorOverLattice] = useState(false)
  const isCursorVisible = isCursorOverLattice && length(pressedKeys) >= 1
  const cursorColor = pathOr(nextColor, [0, 'color'], visibleBlobs)

  return (
    <div
      className={s.Lattice}
      onMouseMove={e => {
        setCursorPosition(getRelativeCoordinates(e))
      }}
      onClick={e => {
        if (e.button === 0 && isCursorVisible) {
          addBlob({
            ...getRelativeCoordinates(e),
            color: nextColor,
            assignedMidiKeys: pressedKeys
          })
        }
      }}
      onMouseOver={() => {
        setIsCursorOverLattice(true)
      }}
      onMouseOut={() => {
        setIsCursorOverLattice(false)
      }}
    >
      <img src={url} alt="Lattice" width={width} height={height} />
      {isCursorVisible || visibleBlobs.map((blob, idx) => <Blob key={idx} size={blobSize} {...blob} />)}
      {isCursorVisible && (
        <Blob
          size={blobSize}
          color={cursorColor}
          x={Math.round(cursorPosition.x - blobSize / 2)}
          y={Math.round(cursorPosition.y - blobSize / 2)}
        />
      )}
      <div className={s.hoverOverlay} style={{ width, height }} />
    </div>
  )
}

export default enhance(Lattice)
