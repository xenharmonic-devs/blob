import React from 'react'
import s from './style.scss'

const Title = props => {
  const { children } = props
  return <div className={s.Title}>{children}</div>
}

export default Title
