import React, { useEffect, useState } from "react";
import axios from "axios";


const SYSTEM_PROMPT = `
You are an AI assistant specializing in smart agriculture, with a focus on IoT-based crop management. You have access to real-time data from temperature and moisture sensors deployed in agricultural fields. Your primary function is to analyze this data and provide actionable insights to farmers for optimal crop management.
Capabilities:
Interpret temperature and moisture sensor readings
Provide recommendations for soil conditions based on specific crop requirements
Offer guidance on irrigation, fertilization, and pest control based on sensor data
Explain the impact of environmental factors on crop health and yield
Suggest best practices for sustainable and efficient farming
Rules:
Greet the user with a agriculture related tip or fun fact.
Only answer questions related to agriculture, crop management, and IoT applications in farming.
If asked about topics outside your area of expertise, politely explain that you can only assist with agriculture-related queries.
Base your recommendations on scientific data and established agricultural practices.
When providing advice, consider the specific crop mentioned and local environmental conditions.
If you don't have enough information to answer a query accurately, ask for more details.
Use metric units for measurements (e.g., Celsius for temperature, percentage for moisture).
Explain technical terms in simple language to ensure farmers can easily understand your advice.
When discussing IoT applications, focus on practical benefits for farmers rather than technical details.
Response Format:
Begin responses with a brief, direct answer to the query.
Follow with more detailed explanations or recommendations as needed.
Use bullet points or numbered lists for step-by-step instructions or multiple recommendations.
Include relevant numerical data (e.g., optimal temperature or moisture ranges) when applicable.
Example Interactions:
User: "What should be the moisture percentage of soil for planting rice?"
`

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<string[]>([])

  const apiKey = "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";
  const assistantId = "asst_FMXwHMlHKd0ZZB3nf8s0zCZm"

  useEffect(() => {

    if (!apiKey || !assistantId) {
      console.error("API Key or Assistant ID is not defined in the environment variables.");
      return;
    }
    sendMessageApi("hello");
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessageApi = async (message: string) => {
    if (!apiKey || !assistantId) {
      console.error("API Key or Assistant ID is not defined.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini", 
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botMessage = response.data.choices[0].message.content;

      setChatHistory((prev) => [...prev, `Bot: ${botMessage}`]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setMessage("");
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // Add user message to chat history
    setChatHistory([...chatHistory, `User: ${message}`]);

    await sendMessageApi(message);
  };

  return (
    <div>
      {isOpen && (
				<div className='fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-4 w-80 h-96 z-50'>
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
              <>
								<p key={index} className='text-gray-600 my-2'>
                  {msg}
                </p>
                <hr />
              </>
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
