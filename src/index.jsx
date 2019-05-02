import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducers from './reducers'
import App from './components/App'

const container = document.getElementById('blob')

if (container) {
  const store = createStore(combinedReducers)

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  )
}
