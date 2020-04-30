import React from 'react'
import { useDispatch } from 'react-redux'
import { messages } from 'reducer/messages'
import 'styles/EditBtn.css'



export const EditBtn = () => {
	const dispatch = useDispatch()

	const handleEditClick = () => {
		dispatch(messages.actions.editMessage(messages))
		console.log('Edit message', handleEditClick)
	}

	return (
		<button className="edit-btn"
			onClick={handleEditClick}>
			<span role="img" aria-label="Edit">✎</span>
		</button>
	)
}