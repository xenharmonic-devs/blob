import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'

const enhance = compose(
  connect(state => ({
    width: state.lattice.width,
    height: state.lattice.height,
    url: state.lattice.url
  }))
)

const Lattice = ({ width, height, url }) => {
  return (
    <div className={'Lattice'}>
      <img src={url} alt="Lattice" width={width} height={height} />
    </div>
  )
}

export default enhance(Lattice)
