import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEditMessage } from 'reducer/messages'
import 'styles/MessageList.css'
import { DeleteBtn } from './DeleteBtn'

export const MessageList = () => {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  // useSelector imports all the messages from the store
  const allMessages = useSelector((state) => state.messages.allMessages)
  console.log('allMessagesInMessagesList', allMessages)

  const handleSetUpdate = (event) => {
    event.preventDefault()
    //pass the edited message id and message
    dispatch(fetchEditMessage(message.message, message.id))
  }


  return (
    <div className="message-list">
      <ul>
        {allMessages.slice(0).reverse().map((message) => (
          <li key={message.id}>
            <div className="header-container">
              <p className="message-name">{message.name}</p>

              <div className="btn-container">
                {/*** This button is for sending the PUT request, should be changed to press enter ***/}
                <button className="edit-btn"
                  onClick={handleSetUpdate}>
                  <span role="img" aria-label="Edit">✎</span>
                </button>
                <DeleteBtn message={message} />
              </div>
            </div>
            <div className="message-container">
              {/* Here is the input for changing the message */}
              <p className="message" onSubmit={handleSetUpdate}>
                <textarea
                  className="edit-message-input"
                  rows='3'
                  minLength='5'
                  maxLength='150'
                  id={message.id}
                  value={message.message || message.id}
                  onChange={event => setMessage(event.target.value)}
                />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

