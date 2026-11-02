import { useState } from 'react'
import chatData from '../data/chatData'

function Chat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about specials, vegetarian meals, desserts and more.' },
  ])
  const [input, setInput] = useState('')

  // Look for a keyword in the question and return its answer
  function getAnswer(question) {
    const text = question.toLowerCase()
    for (let i = 0; i < chatData.length; i++) {
      if (text.includes(chatData[i].keyword)) {
        return chatData[i].answer
      }
    }
    return "Sorry, I don't know that yet. Try one of the suggested questions."
  }

  // Add the user message and the bot answer to the chat
  function sendMessage(text) {
    if (text === '') {
      return
    }
    const userMessage = { from: 'user', text: text }
    const botMessage = { from: 'bot', text: getAnswer(text) }
    setMessages([...messages, userMessage, botMessage])
    setInput('')
  }

  // Called when the form is submitted (Send button or Enter key)
  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="page">
      <h1>AI Assistant</h1>

      <div className="chat-box">
        {messages.map((m, index) => (
          <p key={index} className={m.from}>
            {m.text}
          </p>
        ))}
      </div>

      <div className="suggestions">
        {chatData.map((item) => (
          <button key={item.question} onClick={() => sendMessage(item.question)}>
            {item.question}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input placeholder="Type your question..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Chat