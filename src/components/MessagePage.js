import React from 'react'
import { Link } from 'react-router-dom';
import { NewMessage } from 'components/NewMessage'
import { MessageList } from 'components/MessageList'
import 'styles/MessagePage.css'

export const MessagePage = () => {
	return (
		<>
			{/* <Link to={`/`}>
				<button className="log-out-btn">Log out</button>
			</Link> */}
			<div className="message-page">
				<MessageList />
				<NewMessage />
			</div>
		</>
	)
}
