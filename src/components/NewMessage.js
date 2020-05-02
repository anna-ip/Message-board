import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/NewMessage.css'
import { fetchNewMessage } from 'reducer/messages'

export const NewMessage = () => {
  const [message, setMessage] = useState('')
  //this useSelector isnt working
  const user = useSelector((state) => state.messages.user)
  console.log('User', user)
  const dispatch = useDispatch()


  const handleMessageSubmit = (event) => {
    event.preventDefault()
    console.log('addNewMessage', message)
    //needs to pass an author as well
    dispatch(fetchNewMessage(message))
    // this empties the textarea once submited
    setMessage('')
  }

  return (
    <div className="add-message-container">
      {/* ******Form for sending a new message******* */}
      <form onSubmit={handleMessageSubmit} className="add-message-form">
        {/* <p>{user.name}</p> //not working */}
        <label For="new-message">
          {/* needs to add author and name? */}
          <textarea
            id="new-message"
            className="input-message"
            rows='3' // doesn't seem to work?
            minLength='5'
            maxLength='150'
            placeholder="Type your message"
            onChange={(event) => setMessage(event.target.value)} // value is what ever we write as a message
            value={message}
            required />
        </label>

        {/* * Form submit button * */}
        <div className="add-message-btn-container">
          <button
            className="add-message-btn"
            type="submit"
            title="Send">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

