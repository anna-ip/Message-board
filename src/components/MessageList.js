import React from 'react'
import { useSelector } from 'react-redux'
//import { messages, fetchAllMessages } from 'reducer/messages'
import 'styles/MessageList.css'
import { EditBtn } from './EditBtn'
import { DeleteBtn } from './DeleteBtn'

export const MessageList = () => {
  //this useSelector imports all the messages from the store
  const allMessages = useSelector((state) => state.messages.setMessages)
  //const allMessages = useSelector((state) => state.messages.allMessages)
  console.log('MessageList', allMessages)


  return (
    <div className="message-list">
      <ul>
        {allMessages.map((message) => (
          <li key={message.id}>
            <EditBtn />
            <DeleteBtn />
            <p key={message.id}>{message.message}</p>
          </li>
        ))}
      </ul>

    </div>
  )
}

