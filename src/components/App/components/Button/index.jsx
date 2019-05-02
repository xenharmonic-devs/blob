import React from 'react'
import { NOP } from '../../../../helpers/function'

const Button = ({ children, disabled = false, onClick = NOP }) => {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
