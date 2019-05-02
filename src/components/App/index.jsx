import React from 'react'
import { compose } from 'ramda'
import { connect } from 'react-redux'
import { actions as scaleActions } from '../../reducers/scale'

const enhance = compose(
  connect(
    state => ({
      hello: state.scale.hello
    }),
    scaleActions
  )
)

const App = ({ hello }) => {
  return (
    <>
      <h3>Blob</h3>
      <div>"{hello}"</div>
    </>
  )
}

export default enhance(App)
