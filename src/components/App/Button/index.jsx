import React from 'react'
import { NOP } from '../../../helpers/function'

const Button = props => {
  const { children, disabled = false, onClick = NOP } = props
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
