import React from 'react'
import { useDispatch } from 'react-redux'
import { messages } from 'reducer/messages'
import 'styles/DeleteBtn.css'



export const DeleteBtn = ({ message }) => {
	const dispatch = useDispatch()

	const handleDeleteMessageClick = () => {
		dispatch(messages.actions.deleteMessage(message))
		console.log(handleDeleteMessageClick)
	}

	return (
		<button
			onClick={handleDeleteMessageClick}>
			<span role="img" aria-label="x">✖︎</span>
		</button>
	)
}