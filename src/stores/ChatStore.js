import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import {
	getChatrooms,
	createChatroom,
	storeMessage,
	getMessages,
	renameChatroom,
	deleteChatroom,
} from '@/service/api'

export const useChatStore = defineStore('chat', () => {
	const allModels = ref([])
	const selectedModel = ref('')
	const promptMessage = ref('')
	const modelResponse = ref('')
	const isStreaming = ref(false)
	const chatRooms = ref([])
	const chatRoomId = ref(null)
	const chatRoomMessages = ref([])
	const chatRoomTitle = ref('')
	const abortController = ref(null)

	const fetchModels = async () => {
		try {
			const response = await fetch('/api/tags')
			const data = await response.json()
			allModels.value = data.models
			selectedModel.value = allModels.value[0]?.name
		} catch (err) {
			toast('Error fetching models:', {
				description: 'Please click through the ngrok warning page first' + err,
				type: 'error',
				position: 'top-right',
				closeButton: true,
			})
		}
	}

	const createTitleFromPrompt = async (message) => {
		try {
			const res = await fetch('/api/title', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ prompt: message, model: selectedModel.value }),
			}).then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`)
				}
				return res.json();
			});
			return res?.title;
		} catch (err) {
			console.error('Error generating title:', err);
			return message.split(' ').slice(0, 4).join(' ');
		}
	}

	const sendMessage = async (content) => {
		// Handle abort case
		if (!content && isStreaming.value) {
			abortController.value?.abort()
			isStreaming.value = false
			modelResponse.value = ''
			return
		}

		isStreaming.value = true
		modelResponse.value = ''

		try {
			// Create chatroom first if needed
			const message = { content, role: 'user' }
			chatRoomMessages.value.push(message)

			if (!chatRoomId.value) {
				const title = await createTitleFromPrompt(content)
				const chatroom = await createChatroom(title)
				chatRooms.value.unshift(chatroom)
				chatRoomId.value = chatroom.id
				chatRoomTitle.value = title
			}

			// Add message to store in DB
			await storeMessage(chatRoomId.value, 'user', content)

			// Setup new request
			abortController.value = new AbortController()
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: chatRoomMessages.value,
					model: selectedModel.value,
				}),
				signal: abortController.value.signal
			})

			// Handle streaming response
			const reader = response.body.getReader()
			const decoder = new TextDecoder()
			let accumulatedResponse = ''

			while (true) {
				const { done, value } = await reader.read()
				if (done) break
				const chunk = decoder.decode(value)
				accumulatedResponse += chunk
				modelResponse.value = accumulatedResponse
			}

			// Save AI response
			await storeMessage(chatRoomId.value, 'assistant', accumulatedResponse)
			chatRoomMessages.value.push({
				content: accumulatedResponse,
				role: 'assistant',
			})

		} catch (err) {
			if (err.name === 'AbortError') {
				toast('Request cancelled', {
					description: 'The request was cancelled',
					type: 'info',
					position: 'top-right',
					duration: 1000,
				})
			} else {
				toast('Error in chat:', {
					description: err.message,
					type: 'error',
					position: 'top-right',
					duration: 1000,
				})
			}
		} finally {
			isStreaming.value = false
			abortController.value = null
		}
	}

	const fetchChatHistory = async () => {
		try {
			const chatrooms = await getChatrooms()
			chatRooms.value = chatrooms
		} catch (err) {
			toast('Error fetching chatrooms:', {
				description: err.message,
				type: 'error',
				position: 'top-right',
				closeButton: true,
			})
		}
	}

	const startNewChat = () => {
		chatRoomId.value = null
		chatRoomTitle.value = ''
		chatRoomMessages.value = []
		modelResponse.value = ''
		promptMessage.value = ''
		isStreaming.value = false
	}

	const fetchChatMessages = async (chatroomId) => {
		try {
			chatRoomId.value = chatroomId
			const messages = await getMessages(chatroomId)
			chatRoomMessages.value = messages
		} catch (err) {
			toast('Error fetching chat messages:', {
				description: err.message,
				type: 'error',
				position: 'top-right',
				closeButton: true,
			})
		}
	}

	const renameChatRoom = async (chatroomId, newTitle) => {
		try {
			await renameChatroom(chatroomId, newTitle)
			const index = chatRooms.value.findIndex((chat) => chat.id === chatroomId)
			if (index !== -1) {
				chatRooms.value[index].title = newTitle
			}
			toast('Renamed succesfull:', {
				description: 'Chatroom renamed to ' + newTitle,
				type: 'success',
				position: 'top-right',
				closeButton: true,
			})
		} catch (err) {
			toast('Error renaming chat:', {
				description: err.message,
				type: 'error',
				position: 'top-right',
				closeButton: true,
			})
		}
	}

	const deleteChatRoom = async (chatroomId) => {
		try {
			await deleteChatroom(chatroomId)
			chatRooms.value = chatRooms.value.filter((chat) => chat.id !== chatroomId)
			if (chatRoomId.value === chatroomId) {
				startNewChat()
			}
			toast('Deleted succesfull:', {
				description: 'Chatroom is deleted succesfully',
				type: 'success',
				position: 'top-right',
				closeButton: true,
			})
		} catch (err) {
			toast('Error deleting chat:', {
				description: err.message,
				type: 'error',
				position: 'top-right',
				closeButton: true,
			})
		}
	}

	return {
		allModels,
		promptMessage,
		chatRoomMessages,
		selectedModel,
		modelResponse,
		isStreaming,
		chatRooms,
		fetchModels,
		sendMessage,
		fetchChatHistory,
		startNewChat,
		fetchChatMessages,
		renameChatRoom,
		deleteChatRoom,
	}
})
