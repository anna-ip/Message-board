import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messages, fetchAllMessages } from 'reducer/messages'
import 'styles/MessageList.css'
import { DeleteBtn } from './DeleteBtn'

export const MessageList = () => {
  const allMessages = useSelector((state) => state.messages.allMessages)
  console.log('MessageList', allMessages)
  const dispatch = useDispatch()

  const getMessages = () => {
    console.log(getMessages)
    dispatch(fetchAllMessages(allMessages))
  }

  return (
    <div>
      <h1>MessageList</h1>

      <ul>
        {allMessages.map((message) => (
          <li key={message.id}
            onClick={getMessages}
          >
            <DeleteBtn />
            <p key={message.id}>{message.message}</p>
          </li>
        ))}
      </ul>

    </div>
  )
}

