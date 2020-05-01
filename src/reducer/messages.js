import { createSlice } from '@reduxjs/toolkit'

export const messages = createSlice({

	name: 'messages',
	initialState: {
		//initialState of allMessages be when fetched? initialState:setMessages ?
		allMessages: [],
		message: [],
		selectedMessage: []
	},

	//here the actions are created within the reducer, with a key=setMessages and the value is the function calling that key
	reducers: {
		//*******/this reducer is to GET all messages from the GET request/fetch ******
		setMessages: (state, action) => {
			console.log('setMessages', state)
			console.log('setMessages', action)
			//this is to get all the messages that are in our payload
			state.allMessages = action.payload
		},

		// *****this reducer adds a new Message******
		addMessage: (state, action) => {
			console.log('addMessage', state)
			console.log('addMessage', action)
			//all Messages needs an id: number, author: number, message: string (payload)
			//state.messages = action.payload
			state.allMessages.push({ author: 1, message: action.payload, id: Date.now() })
		},

		// **** this reduce should change the messag with a PUT request
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
//GET all messages
export const fetchAllMessages = () => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages')
			.then((res) => res.json())
			.then((messages) => {
				console.log('Get', messages)
				dispatch(messages.actions.setMessages(messages))
			})
	}
}

//POST a new Message
export const fetchNewMessage = (message) => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages', {
			method: 'POST',
			body: JSON.stringify({ message }),
			// body: JSON.stringify({ message }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('POST', json)
				dispatch(messages.actions.addMessage())
			})
			.catch(err => {
				console.error('error', err)
				//errorMessage?
			})
	}
}


// fetch Put message


// fetch delete message
export const fetchDeleteMessage = (id) => {
	return (dispatch) => {
		fetch(`http://localhost:3004/messages/${id}`, {
			method: 'DELETE',
		})
			.then((res) => res.json())
			.then(json => {
				console.log('DELETE', json)
				dispatch(messages.action.deleteMessage(messages))
			})
	}
}
