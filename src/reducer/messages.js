import { createSlice } from '@reduxjs/toolkit'

export const messages = createSlice({

	name: 'messages',
	initialState: {
		//initialState of allMessages be when fetched? initialState:setMessages ?
		allMessages: [],
		message: {
			success: null,
			error: null
		}
	},

	//here the actions are created within the reducer, with a key=setMessages and the value is the function calling that key
	reducers: {
		//*******/this reducer is to GET all messages from the GET request/fetch ******
		setMessages: (state, action) => {
			console.log('setMessagesState', state)
			console.log('setMessagesAction', action)
			//this is to get all the messages that are in our payload
			state.allMessages = action.payload
		},

		// *****this reducer adds a new Message******
		addMessage: (state, action) => {
			console.log('addMessageState', state)
			console.log('addMessageAction', action)
			state.message = action.payload
		},

		// **** this reducer/action should change the message with a PUT request
		editMessage: (state, action) => {
			console.log('changeMessageState', state)
			console.log('changeMessageAction', action)
			// needs to find the message via id and then edit it
			const existingMessage = state.allMessages.find((message) => message.id === action.payload.id)
			if (existingMessage) {
				//state.allMessages.....()
				//here goes the logic for changing the message
				// 	} else {
				// 		// state.allMessages = action.payload

			}
		},

		deleteMessage: (state, action) => {
			console.log('deleteMessageState', state)
			console.log('deleteMessageAction', action)
			//finds the task
			//remove it from the array
			state.allMessages = state.allMessages.filter((message) => message.id !== action.payload)
			//state.allMessages = state.allMessages.filter((message) => message.id !== action.payload.id)
		},
	}

})

//This fetch is shown when a "new message is deleted"
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
				dispatch(messages.actions.setMessages({ error: `Could not fetch` }))
			})
	}
}


// ****** Put message to edit the message *****
export const fetchEditMessage = (id) => {
	return (dispatch) => {
		fetch(`http://localhost:3004/messages/${id}`, {
			method: 'PUT',
			statusCode: 204,
			body: JSON.stringify({}), //{message}?
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('PUT', json)
				dispatch(messages.actions.editMessage())
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.editMessage({ error: `Error, failed to edit` }))
			})
	}
}

//****** fetch DELETE message ********
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
		//added the GET fetch here to update the list once one message has been deleted, but not working?
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
