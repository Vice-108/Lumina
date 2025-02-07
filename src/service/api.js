import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

export const getChatrooms = async () => {
	const response = await axios.get(`${API_BASE_URL}/chatrooms`)
	return response.data
}

export const createChatroom = async (title) => {
	const response = await axios.post(`${API_BASE_URL}/chatrooms`, { title })
	return response.data
}

export const getMessages = async (chatroomId) => {
	const response = await axios.get(`${API_BASE_URL}/chatrooms/${chatroomId}/messages`)
	return response.data
}

export const storeMessage = async (chatroomId, role, content) => {
	const response = await axios.post(`${API_BASE_URL}/chatrooms/${chatroomId}/messages`, {
		role,
		content,
	})
	return response.data
}

export const renameChatroom = async (chatroomId, newTitle) => {
	const response = await axios.put(`${API_BASE_URL}/chatrooms/${chatroomId}`, { title: newTitle })
	return response.data
}

export const deleteChatroom = async (chatroomId) => {
	const response = await axios.delete(`${API_BASE_URL}/chatrooms/${chatroomId}`)
	return response.data
}

