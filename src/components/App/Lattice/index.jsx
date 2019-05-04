import React from 'react'
import { compose, reject, intersection, isEmpty } from 'ramda'
import { connect } from 'react-redux'
import { getPressedNotesFromNoteTable } from '../../../helpers/MIDI'
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
  return (
    <div className={s.Lattice}>
      <img src={url} alt="Lattice" width={width} height={height} />
      {visibleBlobs.map((blob, idx) => (
        <Blob key={idx} {...blob} />
      ))}
    </div>
  )
}

export default enhance(Lattice)
