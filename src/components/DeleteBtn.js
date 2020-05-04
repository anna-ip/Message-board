import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchDeleteMessage } from 'reducer/messages'
import 'styles/DeleteBtn.css'



export const DeleteBtn = (props) => {

	const dispatch = useDispatch()

	const handleDeleteMessageClick = () => {
		//id passed to the fetch
		dispatch(fetchDeleteMessage(props.message.id))
		console.log('delete message', (props.message.id))
	}

	return (
		<button className="delete-btn"
			onClick={handleDeleteMessageClick}>
			<span role="img" aria-label="delete">✖︎</span>
		</button>
	)
}