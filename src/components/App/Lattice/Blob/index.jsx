import React from 'react'
import cn from 'classnames'
import s from './style.scss'

const Blob = ({ x, y, size, color }) => {
  return (
    <div
      className={cn(s.Blob, s[color])}
      style={{ top: Math.round(y - size / 2), left: Math.round(x - size / 2), width: size, height: size }}
    />
  )
}

export default Blob
