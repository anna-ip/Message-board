import React from 'react'
import { useSelector } from 'react-redux'
import 'styles/MessageList.css'
import { EditBtn } from './EditBtn'
import { DeleteBtn } from './DeleteBtn'

export const MessageList = () => {
  //this useSelector imports all the messages from the store
  const allMessages = useSelector((state) => state.messages.allMessages)

  console.log('allMessagesInMessagesList', allMessages)



  return (
    <div className="message-list">
      <ul>
        {allMessages.slice(0).reverse().map((message) => (
          <li key={message.id}>
            <div className="header-container">
              <p className="message-name">{message.name}</p>
              <div className="btn-container">
                <EditBtn message={message} />
                <DeleteBtn message={message} />
              </div>
            </div>
            <div className="message-container">
              <p className="message" key={message.id}>{message.message}</p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  )
}

