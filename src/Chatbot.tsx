import React, {useEffect, useState} from "react"
import axios from "axios"

const Chat: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [message, setMessage] = useState("")
	const [chatHistory, setChatHistory] = useState<string[]>([])
	const [assistantInstructions, setAssistantInstructions] =
		useState<string>("")

		// API key and assistant ID for OpenAI
	const apiKey =
		"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"
	const assistantId = "asst_FMXwHMlHKd0ZZB3nf8s0zCZm"

	// Fetch assistant instructions on component mount
	useEffect(() => {
		const fetchAssistantInstructions = async () => {
			try {
				const response = await axios.get(
					`https://api.openai.com/v1/assistants/${assistantId}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${apiKey}`,
							"OpenAI-Beta": "assistants=v2",
						},
					}
				)

				const instructions = response.data.instructions
				setAssistantInstructions(instructions)
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error(
						"Error fetching assistant configuration:",
						error.response?.data || error.message
					)
				} else if (error instanceof Error) {
					console.error(
						"Error fetching assistant configuration:",
						error.message
					)
				} else {
					console.error(
						"An unknown error occurred while fetching assistant configuration:",
						error
					)
				}
			}
		}

		fetchAssistantInstructions()
	}, [])

	// Toggle chat window visibility
	const toggleChat = () => {
		setIsOpen(!isOpen)
	}

	// Send a message to the assistant
	const sendMessageApi = async (message: string) => {
		if (!apiKey || !assistantInstructions) {
			console.error(
				"API Key or Assistant Instructions are not available."
			)
			return
		}

		try {
			const response = await axios.post(
				`https://api.openai.com/v1/chat/completions`,
				{
					model: "gpt-4o-mini", // Specify the model used by your assistant
					messages: [
						{role: "system", content: assistantInstructions}, // Dynamic assistant instructions
						{role: "user", content: message}, // User's input
					],
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${apiKey}`,
					},
				}
			)

			const botMessage = response.data.choices[0].message.content
			if (botMessage) {
				setChatHistory((prev) => [...prev, `Bot: ${botMessage}`])
			} else {
				console.error("Unexpected API response format:", response.data)
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(
					"Error fetching assistant configuration:",
					error.response?.data || error.message
				)
			} else if (error instanceof Error) {
				console.error(
					"Error fetching assistant configuration:",
					error.message
				)
			} else {
				console.error(
					"An unknown error occurred while fetching assistant configuration:",
					error
				)
			}
		}

		setMessage("")
	}

	// Send the user's message to the assistant
	const handleSendMessage = async () => {
		if (message.trim() === "") return

		setChatHistory([...chatHistory, `User: ${message}`])
		await sendMessageApi(message)
	}

	return (
		<div>
			{isOpen && (
				<div className='fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-4 w-[50%] h-[60%] z-50'>
					<div className='flex justify-between items-center mb-2'>
						<h2 className='text-lg font-bold'>Chat</h2>
						<button
							onClick={toggleChat}
							className='text-gray-500 hover:text-gray-700'>
							✖
						</button>
					</div>
					<div className='h-[75%] overflow-y-auto mb-2'>
						{chatHistory.map((msg, index) => (
							<div key={index}>
								<p className='text-gray-600 my-2'>{msg}</p>
								<hr />
							</div>
						))}
					</div>
					<div className='flex items-center'>
						<input
							type='text'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className='flex-grow border rounded-l-lg p-2'
							placeholder='Type a message...'
						/>
						<button
							onClick={handleSendMessage}
							className='bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600 focus:outline-none'>
							Send
						</button>
					</div>
				</div>
			)}
			<button
				onClick={toggleChat}
				className='fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none z-50'>
				💬
			</button>
		</div>
	)
}

export default Chat
