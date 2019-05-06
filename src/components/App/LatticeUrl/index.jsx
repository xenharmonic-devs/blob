import React, { useState } from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import Button from '../Button'
import { actions as latticeActions } from '../../../reducers/lattice'
import { getImage } from '../../../helpers/image'
import s from './style.scss'

const enhance = compose(
  connect(
    state => ({
      blobUrl: state.lattice.url,
      blobs: state.lattice.blobs
    }),
    {
      ...latticeActions
    }
  )
)

const LatticeUrl = props => {
  const { blobUrl, setLattice, removeBlobs, blobs } = props
  const [url, setUrl] = useState(blobUrl)
  return (
    <div className={s.LatticeUrl}>
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} style={{ width: 300 }} />
      <Button
        disabled={url === blobUrl}
        onClick={() => {
          getImage(url)
            .then(({ width, height }) => {
              removeBlobs({
                blobs
              })
              setLattice({
                url,
                width,
                height
              })
            })
            .catch(e => {})
          // clear blobs
        }}
      >
        change lattice
      </Button>
    </div>
  )
}

export default enhance(LatticeUrl)
