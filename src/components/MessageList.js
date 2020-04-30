import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messages, fetchAllMessages } from 'reducer/messages'
import 'styles/MessageList.css'
import { EditBtn } from './EditBtn'
import { DeleteBtn } from './DeleteBtn'

export const MessageList = () => {
  //this useSelector imports all the messages from the store
  const allMessages = useSelector((state) => state.messages.allMessages)
  console.log('MessageList', allMessages)
  const dispatch = useDispatch()

  // so this function somehow gives me the list of whats in the db after written a new message and removed it?
  const getMessages = () => {
    console.log(getMessages, 'getMessages')
    dispatch(fetchAllMessages(allMessages))
  }

  return (
    <div className="message-list">
      <ul>
        {allMessages.map((message) => (
          <li key={message.id}
            onClick={getMessages}
          >
            <EditBtn />
            <DeleteBtn />
            <p key={message.id}>{message.message}</p>
          </li>
        ))}
      </ul>

    </div>
  )
}

