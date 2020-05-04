import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { messages } from 'reducer/messages'
import { SignIn } from 'components/SignIn'
import { MessagePage } from 'components/MessagePage'
// import { NewMessage } from './components/NewMessage'
// import { MessageList } from './components/MessageList'

const reducer = combineReducers({
  messages: messages.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <div className="message-page">
        {/* <BrowserRouter>
          <Switch>

            <Route path="/" exact> */}
        {/* <SignIn />
            </Route>
            <Route path="/messages" exact> */}
        {/******** * Move whats in MessagePage to here ***********/}
        <MessagePage />
        {/* </Route> */}

        {/* </Switch>
        </BrowserRouter> */}
      </div>
    </Provider >
  )
}
