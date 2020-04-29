import { createSlice } from '@reduxjs/toolkit'

export const messages = createSlice({

	name: 'messages',
	initialState: {
		allMessages: [],
		selectedMessage: []
	},

	reducers: {
		//this reducer is to get all messages from the first fetch
		setMessages: (state, action) => {
			console.log(state)
			console.log(action)
			state.allMessages = action.payload
		},

		addMessage: (state, action) => {
			console.log('addMessage', state)
			console.log('addMessage', action)
			//author: Date:Now() gives it a millisecond based id-probably round it to the last two digit
			state.allMessages.push({ author: Date.now(), message: action.payload })
		},

		//v.2
		// addMessage: (state, action) => {
		// 	console.log('addMessage', state)
		// 	console.log('addMessage', action)
		// 	const existingMessage = state.selectedMessage.find((message) => message.id === action.payload.id)
		// 	if (existingMessage) {
		// 	} else {
		// 		// state.selectedMessage.push(action.payload)
		// 		// or
		// 		state.selectedMessages.push({ author: Date.now(), message: action.payload })
		// 	}
		// },

		//to delete message the id will be needed
		deleteMessage: (state, action) => {
			console.log('deleteMessage', state)
			console.log('deleteMessage', action)
			//finds the task
			//remove it from the array
			//id= ....
			// ex. state.items = state.items.filter((item) => item.id !== action.payload)

			const existingMessage = state.selectedMessage.find((message) => message.id === action.payload.id)
			if (existingMessage) {
				state.selectedMessage = state.selectedMessage.filter((message) => message.id !== action.payload.id)
			}
		},
	}

})

//This fetch is shown when a "new message is deleted"
//GET all messages
export const fetchAllMessages = () => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages')
			.then((res) => res.json())
			.then((json) => {
				console.log('Get', json)
				dispatch(messages.actions.setMessages(json))
			})
	}
}

//POST a new Message
export const fetchNewMessage = () => {
	return (dispatch) => {
		fetch('http://localhost:3004/messages', {
			method: 'POST',
			body: JSON.stringify(),
			// body: JSON.stringify({ message }),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('POST', json)
				dispatch(messages.actions.addMessage(json))

				//dispatch allmessages/setMessages as well

				//this is from the happy thought project
				// .then((newMessage) => {
				// 	setnewMessage((previousMessage) => [newMessage, ...previousMessage])
				// })
				// .then(() => setMessage(""))
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
			.then(res => {
				console.log('DELETE')
				// dispatch(deleteMessage(messageId))
			})
	}
}
