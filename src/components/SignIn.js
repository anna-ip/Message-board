import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { messages, fetchAllMessages } from 'reducer/messages'
import 'styles/SignIn.css'

export const SignIn = () => {
	const [name, setName] = useState(" ");

	const dispatch = useDispatch()

	const handleNameSubmit = (event) => {
		event.preventDefault()
		console.log('handleNameSubmit')
		dispatch(messages.actions.setMessages(fetchAllMessages))
	}

	return (
		<div className="sign-in-container">
			<h1>Welcome {name}!</h1>
			<form
				onSubmit={handleNameSubmit}
				className="sign-in-form">
				<p>Name:</p>
				<input className="name"
					type="text"
					//onChange={handleNameSubmit} // when I have this here it fetchs all the messages from the db
					onChange={event => setName(event.target.value)} // value is the name that is written
					value={name}
					required
				/>
				<div className="submit-btn-container">
					<Link to={`/messages`}>
						<button
							className="submit-btn"
							type="submit"
							title="Submit">
							Submit
						</button >
					</Link>
				</div>
			</form>
		</div>
	)
}