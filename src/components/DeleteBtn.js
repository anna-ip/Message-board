import React from 'react'
import { useDispatch } from 'react-redux'
import { messages } from 'reducer/messages'
import 'styles/DeleteBtn.css'



export const DeleteBtn = () => {
	const dispatch = useDispatch()

	const handleDeleteMessageClick = () => {
		dispatch(messages.actions.deleteMessage(messages))
		console.log('delete message', handleDeleteMessageClick)
	}

	return (
		<button className="delete-btn"
			onClick={handleDeleteMessageClick}>
			<span role="img" aria-label="delete">✖︎</span>
		</button>
	)
}