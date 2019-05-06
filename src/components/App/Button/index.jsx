import React from 'react'
import cn from 'classnames'
import { NOP } from '../../../helpers/function'

const Button = props => {
  const { children, disabled = false, onClick = NOP, className } = props
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={cn(className)}>
      {children}
    </button>
  )
}

export default Button
