import React, { useState, useEffect } from 'react'
import { compose, reject, intersection, isEmpty } from 'ramda'
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
    pressedKeys: getPressedNotesFromNoteTable(state.midi.noteTable)
  }))
)

const Lattice = ({ width, height, url, blobs, pressedKeys }) => {
  const visibleBlobs = reject(({ assignedMidiKeys }) => isEmpty(intersection(pressedKeys, assignedMidiKeys)), blobs)

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isCursorVisible, setIsCursorVisible] = useState(true)
  const cursorColor = 'yellow'
  const cursorSize = 30

  useEffect(() => {
    setIsCursorVisible(!isEmpty(pressedKeys))
  }, [pressedKeys])

  return (
    <div
      className={s.Lattice}
      onMouseMove={e => {
        setCursorPosition(getRelativeCoordinates(e))
      }}
      onClick={e => {
        if (e.button === 0) {
          console.log(getRelativeCoordinates(e))
        }
      }}
      onMouseOver={() => {
        setIsCursorVisible(true)
      }}
      onMouseOut={() => {
        setIsCursorVisible(false)
      }}
    >
      <img src={url} alt="Lattice" width={width} height={height} />
      {visibleBlobs.map((blob, idx) => (
        <Blob key={idx} {...blob} />
      ))}
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
