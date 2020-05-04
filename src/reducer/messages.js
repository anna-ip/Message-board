import { createSlice } from '@reduxjs/toolkit'

export const messages = createSlice({

	name: 'messages',
	initialState: {
		allMessages: [],
		message: {
			success: null,
			error: null
		}
	},

	reducers: {
		//***** this reducer is to GET all messages from the GET request/fetch ******
		setMessages: (state, action) => {
			console.log('setMessagesState', state)
			console.log('setMessagesAction', action)
			//this is to get all the messages that are in our payload
			state.allMessages = action.payload
		},

		//***** this reducer adds a new Message ******
		addMessage: (state, action) => {
			console.log('addMessageState', state)
			console.log('addMessageAction', action)
			state.message = action.payload
		},

		//**** this reducer/action should change the message with a PUT request ******
		editMessage: (state, action) => {
			console.log('changeMessageState', state)
			console.log('changeMessageAction', action)
			const existingMessage = state.allMessages.find((message) => message.id === action.payload.id)
			// logic for changing the message
			if (existingMessage) {
				//state.message = action.payload
				existingMessage.replace((message) => message, action.payload.message)
			}
		},
		//***** this reducer/action deletes an message from the db.json
		deleteMessage: (state, action) => {
			console.log('deleteMessageState', state)
			console.log('deleteMessageAction', action)
			state.allMessages = state.allMessages.filter((message) => message.id !== action.payload)
		},
	}

})


//****** GET all messages *******
export const fetchAllMessages = () => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages?_sort=id&_order=desc&_limit=5')
			.then((res) => res.json())
			.then((json) => {
				console.log('Get', json)
				dispatch(messages.actions.setMessages(json))
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.setMessages({ error: `Could not fetch` }))
			})
	}
}

//**** POST a new message and GET the new list of messages ****
export const fetchNewMessage = (message, author, name) => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages', {
			method: 'POST',
			statusCode: 204,
			body: JSON.stringify({ message, author, name }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('POST', json)
				dispatch(messages.actions.addMessage(json, { success: `Successfully saved` }))
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.addMessage({ error: `Error, failed to save` }))
			})

		fetch('http://localhost:3004/messages?_sort=id&_order=desc&_limit=5')
			.then((res) => res.json())
			.then((json) => {
				console.log('Get', json)
				dispatch(messages.actions.setMessages(json))
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.setMessages({ error: `Could not update` }))
			})
	}
}


// ****** Put message to edit the message *****
export const fetchEditMessage = (id, message) => {
	return (dispatch) => {
		fetch(`http://localhost:3004/messages/${id}`, {
			method: 'PUT',
			statusCode: 204,
			body: JSON.stringify({ message }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('PUT', json, id)
				dispatch(messages.actions.editMessage())
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.editMessage({ error: `Error, failed to edit` }))
			})
	}
}

//****** fetch DELETE message and GET the new list of messages ********
export const fetchDeleteMessage = (id) => {
	return (dispatch) => {
		fetch(`http://localhost:3004/messages/${id}`, {
			method: 'DELETE',
			statusCode: 204,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then(json => {
				console.log('DELETE', json, id)
				dispatch(messages.action.deleteMessage(id))
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.deleteMessage({ error: `Error, failed to delete` }))
			})

		fetch('http://localhost:3004/messages?_sort=id&_order=desc&_limit=5')
			.then((res) => res.json())
			.then((json) => {
				console.log('Get', json)
				dispatch(messages.actions.setMessages(json))
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.setMessages({ error: `Could not update` }))
			})
	}
}
