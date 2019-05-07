import { isEmpty, split } from 'ramda'
import { serializedBlobs, deserializeBlobs } from './blobs'

const serializeLattice = lattice => {
  const { blobs, url, width, height } = lattice
  return `${url}|${width}|${height}|${serializedBlobs(blobs)}`
}

const deserializeLattice = str => {
  if (isEmpty(str)) {
    return {}
  } else {
    const [url, width, height, blobData] = split('|', str)
    return {
      url,
      width: parseInt(width),
      height: parseInt(height),
      blobs: deserializeBlobs(blobData)
    }
  }
}

export { serializeLattice, deserializeLattice }
