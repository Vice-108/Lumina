import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

export const getModels = async () => {
	const response = await axios.get(`${API_BASE_URL}/api/tags`)
	return response.data
}

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

export const sendChatMessage = async (messages, model, signal, onChunk) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages, model }),
            signal
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            onChunk(chunk);
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            throw error;
        }
        throw new Error(error.message);
    }
}

export const generateTitle = async (prompt, model) => {
	const response = await axios.post(`${API_BASE_URL}/api/title`, { prompt, model })
	return response.data
}
