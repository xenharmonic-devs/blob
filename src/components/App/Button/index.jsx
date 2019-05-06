import React from 'react'
import { NOP } from '../../../helpers/function'

const Button = props => {
  const { children, disabled = false, onClick = NOP, style } = props
  return (
    <button type="button" disabled={disabled} onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export default Button
