import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import Blob from './components/Blob'
import s from './style.scss'

const enhance = compose(
  connect(state => ({
    width: state.lattice.width,
    height: state.lattice.height,
    url: state.lattice.url,
    blobs: state.lattice.blobs
  }))
)

const Lattice = ({ width, height, url, blobs }) => {
  return (
    <div className={s.Lattice}>
      <img src={url} alt="Lattice" width={width} height={height} />
      {blobs.map((blob, idx) => (
        <Blob key={idx} {...blob} />
      ))}
    </div>
  )
}

export default enhance(Lattice)
