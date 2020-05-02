import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { messages, fetchAllMessages } from 'reducer/messages'
import 'styles/SignIn.css'

export const SignIn = () => {
	const [name, setName] = useState(" ");
	const dispatch = useDispatch()

	//this fetches all the messages but dont redirect to /messages
	const handleSignInSubmit = (event) => {
		event.preventDefault()
		console.log('handleSignInSubmit')
		//this dispatch fetches all the allMessages when submit
		dispatch(fetchAllMessages())

		//this dispatch is for sending the user name to the reducer setUser
		// dispatch(messages.actions.setUser(name))
		// console.log('newUser', name)
	}

	const handleNameSubmit = (event) => {
		event.preventDefault()
		dispatch(messages.actions.setUser(name))
		console.log('newUser', name)
	}

	return (
		<div className="sign-in-container">
			<h1>Welcome {name}!</h1>

			<form
				onSubmit={handleNameSubmit} //no real diff
				//onChange={handleNameSubmit} //this one add a letter to payload each time i type a letter?
				className="sign-in-form">
				<label>Name:</label>
				<input className="name"
					type="name"
					// onChange={handleSignInSubmit}
					onChange={event => setName(event.target.value)} // value is the name that is written
					value={name}
					required
				/>

				<div className="submit-btn-container">
					<Link to={`/messages`}>
						<button
							className="submit-btn"
							type="submit"
							title="Submit"
							onClick={handleSignInSubmit}
						>
							Sign in
						</button>
					</Link>
				</div>

			</form>

		</div >
	)
}