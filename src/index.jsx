import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { values, replace } from 'ramda'
import combinedReducers from './reducers'
import App from './components/App'
import * as middlewares from './middlewares'
import { initial as defaultLatticeData } from './reducers/lattice'
import { deserializeLattice } from './helpers/lattice'
import './reset.scss'

const container = document.getElementById('blob')

if (container) {
  const store = createStore(
    combinedReducers,
    {
      lattice: {
        ...defaultLatticeData,
        ...deserializeLattice(replace(/^#/, '', window.location.hash))
      }
    },
    applyMiddleware(...values(middlewares))
  )

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  )
}
