
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/NewMessage.css'
import { messages } from 'reducer/messages'

export const NewMessage = () => {
  const [addNewMessage, setAddNewMessage] = useState('')
  const dispatch = useDispatch()

  // this button also needs to update the list of messages
  const handleMessageSubmit = (event) => {
    event.preventDefault()
    console.log('addNewMessage', addNewMessage)
    dispatch(messages.actions.addMessage(addNewMessage))
    // this empty the textarea once submited
    setAddNewMessage('')
  }
  return (
    <div className="add-message-container">
      {/* ******Form for sending a new message******* */}
      <form onSubmit={handleMessageSubmit} className="add-message-form">
        <label htmlFor="new-message">
          <textarea
            id="new-message"
            className="input-message"
            rows="3" // doesn't seem to work?
            minLength="5"
            maxLength="150"
            placeholder="Type your message"
            onChange={(event) => setAddNewMessage(event.target.value)} // value is what ever we write as a message
            value={addNewMessage}
            required />
        </label>

        {/* * Form submit button * */}
        <div className="add-message-btn-container">
          <button
            className="add-message-btn"
            type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

