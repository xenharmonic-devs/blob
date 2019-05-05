import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { values } from 'ramda'
import combinedReducers from './reducers'
import App from './components/App'
import * as middlewares from './middlewares'
import './reset.scss'

const container = document.getElementById('blob')

if (container) {
  const store = createStore(combinedReducers, applyMiddleware(...values(middlewares)))

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  )
}
