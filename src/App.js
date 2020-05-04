import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { messages } from 'reducer/messages'
import { NewMessage } from './components/NewMessage'
import { MessageList } from './components/MessageList'

const reducer = combineReducers({
  messages: messages.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <div className="message-page">
        <MessageList />
        <NewMessage />
      </div>
    </Provider >
  )
}
