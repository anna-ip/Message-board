import { createSlice } from '@reduxjs/toolkit'

export const messages = createSlice({

	name: 'messages',
	initialState: {
		//initialState of allMessages be when fetched? initialState:setMessages ?
		allMessages: [],
		message: {
			success: null,
			error: null
		},
		user: []
	},

	//here the actions are created within the reducer, with a key=setMessages and the value is the function calling that key
	reducers: {
		setUser: (state, action) => {
			console.log('setUserState', state)
			console.log('setUserAction', action)
			//state.user = action.payload
			state.user.push({ author: Date.now(), name: action.payload })
		},
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
			//all Messages needs an id: number, author: number, message: string (payload)
			state.message = action.payload
			//state.allMessages.push({ author: 1, message: action.payload, id: Date.now() })
		},

		// **** this reducer/action should change the message with a PUT request
		editMessage: (state, action) => {
			console.log('changeMessage', state)
			console.log('changeMessage', action)
			// needs to find the message and then alter it
			const existingMessage = state.allMessages.find((message) => message.id === action.payload.id)
			if (existingMessage) {
				//state.allMessages.....()
				//here goes the logic for changing the message
				// 	} else {
				// 		// state.selectedMessage.push(action.payload)?
				// 		// or
				// 		state.selectedMessages.push({ author: Date.now(), message: action.payload })?
			}
		},

		//to delete message the id will be needed
		deleteMessage: (state, action) => {
			console.log('deleteMessage', state)
			console.log('deleteMessage', action)
			//finds the task
			//remove it from the array
			//id= ....
			//PROBLEM removes all new messages and non from the db
			state.allMessages = state.allMessages.filter((message) => message.id !== action.payload.id)
		},
	}

})

//This fetch is shown when a "new message is deleted"
//****** GET all messages *******
export const fetchAllMessages = () => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages')
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

//**** POST a new Message ****
export const fetchNewMessage = (message) => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages', {
			method: 'POST',
			statusCode: 204,
			body: JSON.stringify({ message }),
			// body: JSON.stringify({ message }),
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
		//This endponit gives the 10 next to the last ten, want the last ten
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
		})
			.then((res) => res.json())
			.then(json => {
				console.log('DELETE', json)
				dispatch(messages.action.deleteMessage(messages))
			})
			.catch(err => {
				console.error('error', err)
				dispatch(messages.actions.deleteMessage({ error: `Error, failed to delete` }))
			})
	}
}
