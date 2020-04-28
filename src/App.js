import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { Message } from './components/Message'

const reducer = combineReducers({
  message: message.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Message />
      Find me in src/app.js!
      </Provider>
    </div>
  )
}
