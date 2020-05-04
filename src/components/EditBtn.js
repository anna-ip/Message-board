import React from 'react'
import { useDispatch } from 'react-redux'
import { messages, fetchEditMessage } from 'reducer/messages'
import 'styles/EditBtn.css'



export const EditBtn = (props) => {

	const dispatch = useDispatch()

	const handleEditClick = () => {

		dispatch(fetchEditMessage(props.message.id))
		console.log('Edit message', handleEditClick)
	}

	return (
		<button className="edit-btn"
			onClick={handleEditClick}>
			<span role="img" aria-label="Edit">✎</span>
		</button>
	)
}