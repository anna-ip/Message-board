import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/NewMessage.css'
import { fetchNewMessage } from 'reducer/messages'

export const NewMessage = () => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')

  const dispatch = useDispatch()

  const handleMessageSubmit = (event) => {
    event.preventDefault()
    dispatch(fetchNewMessage(message, author, name))
    // this empties the textarea once submited
    setMessage('')
  }

  return (
    <div className="add-message-container">
      {/****Form for sending a new message ****/}
      <form onSubmit={handleMessageSubmit} className="add-message-form">
        <div className="user-div">
          <span>
            <label>
              name:
            <input
                placeholder="Name"
                type="text"
                onChange={event => setName(event.target.value)}
                name="name"
                value={name}
                required
              />
            </label>
          </span>

          <span>
            <label>
              no:
            <input
                className="input-no"
                placeholder="No"
                type="number"
                onChange={event => setAuthor(event.target.value)}
                name="author"
                value={author}
                required
              />
            </label>
          </span>
        </div>

        <span>
          <label>
            <textarea
              id="new-message"
              className="input-message"
              rows='3'
              minLength='5'
              maxLength='150'
              placeholder="Type your message"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              required />
          </label>
        </span>


        {/**** Form submit button ****/}
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

