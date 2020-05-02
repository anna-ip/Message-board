import React from 'react'
import { useDispatch } from 'react-redux'
import { messages, fetchEditMessage } from 'reducer/messages'
import 'styles/EditBtn.css'



export const EditBtn = (props) => {
	//import the state from store to get access to allMessages
	const dispatch = useDispatch()

	const handleEditClick = () => {
		//add id and message? to the ()
		dispatch(fetchEditMessage(props.message.id))
		// dispatch(messages.actions.editMessage(messages))
		console.log('Edit message', handleEditClick)
	}

	return (
		<button className="edit-btn"
			onClick={handleEditClick}>
			<span role="img" aria-label="Edit">✎</span>
		</button>
	)
}