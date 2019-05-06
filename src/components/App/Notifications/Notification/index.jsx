import React from 'react'
import Button from '../../Button'
import { NOP } from '../../../../helpers/function'

const Notification = props => {
  const { id, type, title, detail, onRemoveNotification = NOP } = props
  return (
    <div>
      type: {type}
      <br />
      title: {title}
      <br />
      detail: {detail}
      <Button onClick={() => onRemoveNotification(id)}>[x]</Button>
    </div>
  )
}

export default Notification
