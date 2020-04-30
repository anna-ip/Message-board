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
		//console.log(getMessages, 'handleNameSubmit')
		dispatch(fetchAllMessages())
	}

	return (
		<div className="sign-in-container">
			<h1>Welcome {name}!</h1>
			<div className="sign-in-form">
				<p>Name:</p>
				<input className="name"
					type="text"
					onChange={handleNameSubmit}
					value={name}
					required
				/>
				<div className="submit-btn-container">
					<Link to={`/messages`}>
						<button className="submit-btn" type="submit">Submit</button >
					</Link>
				</div>
			</div>
		</div>
	)
}