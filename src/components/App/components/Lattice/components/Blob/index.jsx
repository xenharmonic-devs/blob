import React from 'react'
import cn from 'classnames'
import s from './style.scss'

const Blob = ({ x, y, size, color }) => {
  return <div style={{ top: y, left: x, width: size, height: size }} className={cn(s.Blob, s[color])} />
}

export default Blob
