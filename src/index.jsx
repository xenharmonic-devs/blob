import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import combinedReducers from './reducers'
import App from './components/App'

const container = document.getElementById('App')

const initialData = {
  scale: {
    hello: 'redux is working'
  }
}

if (container) {
  const store = createStore(combinedReducers, initialData)

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  )
}
