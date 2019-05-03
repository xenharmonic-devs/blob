import React from 'react'
import { compose, filter, intersection, isEmpty } from 'ramda'
import { connect } from 'react-redux'
import Blob from './Blob'
import s from './style.scss'

const enhance = compose(
  connect(state => ({
    width: state.lattice.width,
    height: state.lattice.height,
    url: state.lattice.url,
    blobs: state.lattice.blobs,
    pressedKeys: [64]
  }))
)

const isBlobVisible = (pressedKeys, assignedMidiKeys) => !isEmpty(intersection(pressedKeys, assignedMidiKeys))

const Lattice = ({ width, height, url, blobs, pressedKeys }) => {
  return (
    <div className={s.Lattice}>
      <img src={url} alt="Lattice" width={width} height={height} />
      {filter(({ assignedMidiKeys }) => isBlobVisible(pressedKeys, assignedMidiKeys), blobs).map((blob, idx) => (
        <Blob key={idx} {...blob} />
      ))}
    </div>
  )
}

export default enhance(Lattice)
