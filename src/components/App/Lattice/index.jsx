import React, { useState } from 'react'
import { compose, reject, intersection, isEmpty, length, pathOr } from 'ramda'
import { connect } from 'react-redux'
import { getPressedNotesFromNoteTable } from '../../../helpers/MIDI'
import { getRelativeCoordinates } from './helpers'
import Blob from './Blob'
import s from './style.scss'

const enhance = compose(
  connect(state => ({
    width: state.lattice.width,
    height: state.lattice.height,
    url: state.lattice.url,
    blobs: state.lattice.blobs,
    pressedKeys: getPressedNotesFromNoteTable(state.midi.noteTable),
    nextColor: 'purple'
  }))
)

const Lattice = ({ width, height, url, blobs, pressedKeys, nextColor }) => {
  const visibleBlobs = reject(({ assignedMidiKeys }) => isEmpty(intersection(pressedKeys, assignedMidiKeys)), blobs)

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isCursorOverLattice, setIsCursorOverLattice] = useState(false)
  const isOnlyOneNotePressed = length(pressedKeys) === 1
  const isCursorVisible = isCursorOverLattice && isOnlyOneNotePressed
  const cursorColor = pathOr(nextColor, [0, 'color'], visibleBlobs)
  const cursorSize = 30

  return (
    <div
      className={s.Lattice}
      onMouseMove={e => {
        setCursorPosition(getRelativeCoordinates(e))
      }}
      onClick={e => {
        if (e.button === 0 && isCursorVisible) {
          console.log(getRelativeCoordinates(e))
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
      {isCursorVisible || visibleBlobs.map((blob, idx) => <Blob key={idx} {...blob} />)}
      {isCursorVisible && (
        <Blob
          size={cursorSize}
          color={cursorColor}
          x={Math.round(cursorPosition.x - cursorSize / 2)}
          y={Math.round(cursorPosition.y - cursorSize / 2)}
        />
      )}
      <div className={s.hoverOverlay} style={{ width, height }} />
    </div>
  )
}

export default enhance(Lattice)
