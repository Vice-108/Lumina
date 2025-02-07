import express from 'express'
import cors from 'cors'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import db from './db.js'
import { fileURLToPath } from 'url'

const app = express()
const port = 8000
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ollamaUrl = "http://localhost:11434/api/"

app.use(express.json())
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
	credentials: false,
}))

app.use(express.static(path.join(__dirname, 'public')))

// Function to process the streaming response
async function processStream(reader, res) {
	const decoder = new TextDecoder()
	while (true) {
		const { done, value } = await reader.read()
		if (done) break

		let result = decoder.decode(value, { stream: true })
		try {
			const resultJson = JSON.parse(result)
			const chunk = resultJson.message.content
			res.write(chunk)
		} catch (error) {
			console.error("Error parsing JSON chunk:", error, result)
		}
	}
	res.end()
}

// API endpoint to send chat prompt
app.post('/api/chat', async (req, res) => {
	const { messages, model } = req.body
	if (!messages) {
		return res.status(401).json({ error: "Prompt is required." })
	}
	try {
		const response = await fetch(ollamaUrl + "chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: model,
				messages: messages,
				stream: true,
			}),
		})
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}
		const reader = response.body.getReader()
		// Set response headers for streaming
		res.setHeader('Content-Type', 'text/plain')
		res.setHeader('Transfer-Encoding', 'chunked')

		await processStream(reader, res)
	} catch (error) {
		console.error("Error communicating with the API:", error)
		res.status(500).json({ error: "Internal server error." })
	}
})

// Generate title from prompt
app.post('/api/title', async (req, res) => {
    const { prompt, model } = req.body
    try {
        const response = await fetch(ollamaUrl + "generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: model,
                prompt: `Generate a 4 word title from this text: "${prompt}". Only respond with the title, nothing else. make sure its in 4 words only.`,
                stream: false
            }),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        const title = data.response
		title.split(' ').slice(0, 4).join(' ')
        res.json({ title })
    } catch (error) {
        console.error("Error generating title:", error)
        res.status(500).json({
            error: "Failed to generate title",
            details: error.message
        })
    }
})

// API endpoint to fetch model list
app.get('/api/tags', async (req, res) => {
	try {
		const response = await fetch(ollamaUrl + "tags", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const tags = await response.json()
		res.json(tags)
	} catch (error) {
		console.error("Error fetching tags:", error)
		res.status(500).json({ error: "Failed to fetch tags." })
	}
})

// Create a new chatroom
app.post('/chatrooms', (req, res) => {
	const { title } = req.body
	const id = uuidv4()
	const stmt = db.prepare('INSERT INTO chatrooms (id, title) VALUES (?, ?)')
	stmt.run(id, title)
	res.json({ id, title })
})

// Get all chatrooms
app.get('/chatrooms', (req, res) => {
	const stmt = db.prepare('SELECT * FROM chatrooms ORDER BY updated_at DESC')
	res.json(stmt.all())
})

// Add a message to a chatroom
app.post('/chatrooms/:id/messages', (req, res) => {
	const { id: chatroom_id } = req.params
	const { role, content } = req.body
	const messageId = uuidv4()

	const stmt = db.prepare('INSERT INTO messages (id, chatroom_id, role, content) VALUES (?, ?, ?, ?)')
	stmt.run(messageId, chatroom_id, role, content)

	res.json({ messageId, chatroom_id, role, content })
})

// Get messages for a chatroom
app.get('/chatrooms/:id/messages', (req, res) => {
	const { id: chatroom_id } = req.params
	const stmt = db.prepare('SELECT * FROM messages WHERE chatroom_id = ? ORDER BY created_at ASC')
	res.json(stmt.all(chatroom_id))
})

// Rename chatroom
app.put('/chatrooms/:id', (req, res) => {
	const { id } = req.params
	const { title } = req.body

	const stmt = db.prepare('UPDATE chatrooms SET title = ? WHERE id = ?')
	stmt.run(title, id)

	res.json({ id, title })
})

// Delete chatroom
app.delete('/chatrooms/:id', (req, res) => {
	const { id } = req.params

	const stmt = db.prepare('DELETE FROM chatrooms WHERE id = ?')
	stmt.run(id)

	res.json({ success: true })
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
