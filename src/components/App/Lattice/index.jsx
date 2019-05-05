import React, { useState } from 'react'
import { compose, reject, intersection, isEmpty, length, findIndex, without, equals } from 'ramda'
import { connect } from 'react-redux'
import { getPressedNotesFromNoteTable } from '../../../helpers/MIDI'
import { actions as latticeActions } from '../../../reducers/lattice'
import { getRelativeCoordinates } from './helpers'
import Blob from './Blob'
import s from './style.scss'

const enhance = compose(
  connect(
    state => ({
      ...state.lattice,
      pressedKeys: getPressedNotesFromNoteTable(state.midi.noteTable)
    }),
    latticeActions
  )
)

const Lattice = ({
  width,
  height,
  url,
  blobSize,
  blobs,
  pressedKeys,
  nextBlobColor,
  addBlob,
  removeBlobs,
  changeNextBlobColor,
  changeBlobAttribute
}) => {
  const visibleBlobs = reject(({ assignedMidiKeys }) => isEmpty(intersection(pressedKeys, assignedMidiKeys)), blobs)

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isCursorOverLattice, setIsCursorOverLattice] = useState(false)
  const isCursorVisible = isCursorOverLattice && length(pressedKeys) >= 1
  const cursorColor = length(visibleBlobs) === 1 ? visibleBlobs[0].color : nextBlobColor

  return (
    <div
      className={s.Lattice}
      onMouseMove={e => {
        setCursorPosition(getRelativeCoordinates(e))
      }}
      onClick={e => {
        if (e.button === 0 && isCursorVisible) {
          const { x, y } = getRelativeCoordinates(e)
          if (isEmpty(visibleBlobs)) {
            addBlob({
              x,
              y,
              color: nextBlobColor,
              assignedMidiKeys: pressedKeys
            })
            changeNextBlobColor()
          } else {
            if (length(visibleBlobs) === 1) {
              const idx = findIndex(
                ({ assignedMidiKeys }) => !isEmpty(intersection(pressedKeys, assignedMidiKeys)),
                blobs
              )
              changeBlobAttribute({
                idx,
                key: 'x',
                value: x
              })
              changeBlobAttribute({
                idx,
                key: 'y',
                value: y
              })
              if (!equals(pressedKeys, blobs[idx].assignedMidiKeys)) {
                changeBlobAttribute({
                  idx,
                  key: 'assignedMidiKeys',
                  value: pressedKeys
                })
              }
            } else {
              removeBlobs({ blobs })
              addBlob({
                x,
                y,
                color: nextBlobColor,
                assignedMidiKeys: pressedKeys
              })
              changeNextBlobColor()
            }
          }
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
      {isCursorOverLattice
        ? without(visibleBlobs, blobs).map((blob, idx) => <Blob key={idx} size={blobSize} {...blob} />)
        : visibleBlobs.map((blob, idx) => <Blob key={idx} size={blobSize} {...blob} />)}
      {isCursorVisible && <Blob size={blobSize} color={cursorColor} x={cursorPosition.x} y={cursorPosition.y} />}
      <div className={s.hoverOverlay} style={{ width, height }} />
    </div>
  )
}

export default enhance(Lattice)
