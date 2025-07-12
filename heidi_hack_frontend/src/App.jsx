import './App.css'
import SearchBar from './components/SearchBar'
import LeftNav from './components/LeftNav'
import RightNav from './components/RightNav'
import MiddleRenderZone from './components/MiddleRenderZone'
import { useState } from 'react'
import { streamAssistantResponse } from './useChatStream'

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm ChatGPT. How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    const placeholder = { role: 'assistant', text: '...' }

    setMessages(prev => [...prev, userMessage, placeholder])
    setInput('')
    setIsStreaming(true)

    await streamAssistantResponse(input, setMessages)
    setIsStreaming(false)
  }

  return (
    <div className="app-layout">
      <SearchBar
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isStreaming={isStreaming}
      />
      <div className="main-section">
        <LeftNav />
        <MiddleRenderZone messages={messages} />
        <RightNav />
      </div>
    </div>
  )
}

export default App
