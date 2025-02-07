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
	getModels,
	generateTitle,
	sendChatMessage,
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
			const { models } = await getModels()
			allModels.value = models
			selectedModel.value = allModels.value[0]?.name
		} catch (err) {
			toast('Error fetching models:', {
				description:  err,
				type: 'error',
				position: 'top-right',
				closeButton: true,
			})
		}
	}

	const sendMessage = async (content) => {
		if (!content && isStreaming.value) {
			abortController.value?.abort()
			isStreaming.value = false
			modelResponse.value = ''
			return
		}

		isStreaming.value = true
		modelResponse.value = ''
		let accumulatedResponse = ''

		try {
			const message = { content, role: 'user' }
			chatRoomMessages.value.push(message)

			if (!chatRoomId.value) {
				const { title } = await generateTitle(content, selectedModel.value)
				const chatroom = await createChatroom(title)
				chatRooms.value.unshift(chatroom)
				chatRoomId.value = chatroom.id
				chatRoomTitle.value = title
			}

			await storeMessage(chatRoomId.value, 'user', content)

			abortController.value = new AbortController()

			await sendChatMessage(
				chatRoomMessages.value,
				selectedModel.value,
				abortController.value.signal,
				(chunk) => {
					accumulatedResponse += chunk
					modelResponse.value = accumulatedResponse
				}
			)

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
