import React from 'react'
import { Link } from 'react-router-dom';
import { NewMessage } from 'components/NewMessage'
import { MessageList } from 'components/MessageList'

export const MessagePage = () => {
	return (
		<>
			<Link className="back-link" to={`/`}>
				<button>Log out</button>
			</Link>
			<MessageList />
			<NewMessage />
		</>
	)

}
