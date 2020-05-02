import React from 'react'
import { useDispatch } from 'react-redux'
import { messages, fetchDeleteMessage } from 'reducer/messages'
import 'styles/DeleteBtn.css'



export const DeleteBtn = (props) => {
	//do I need to import the state to find the id?
	const dispatch = useDispatch()

	const handleDeleteMessageClick = () => {
		//id should be passed to the fetch
		dispatch(fetchDeleteMessage(props.message.id))
		//dispatch(messages.actions.deleteMessage(messages))
		console.log('delete message', handleDeleteMessageClick)
	}

	return (
		<button className="delete-btn"
			//in the ( it should be passed the id....like message.id)
			onClick={handleDeleteMessageClick}>
			<span role="img" aria-label="delete">✖︎</span>
		</button>
	)
}