import './App.css'
import './styles/colors.css';
import LeftNav from './components/LeftNav'
import RightNav from './components/RightNav'
import MiddleRenderZone from './components/MiddleRenderZone'
import { useState } from 'react'
import { streamAssistantResponse } from './api/useChatStream'
import LogoHeader from './components/LogoHeader'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [sentQuery, setSentQuery] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setSentQuery(input) // Only update sentQuery on submit

    const userMessage = { role: 'user', text: input }
    const placeholder = { role: 'assistant', text: '...' }

    setMessages(prev => [...prev, userMessage, placeholder])
    setInput('')
    setIsStreaming(true)

    await streamAssistantResponse(input, setMessages)
    setIsStreaming(false)
  }

  return (
    <div className="app-layout" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
   
      <div className="main-section">
        <LeftNav />
        <MiddleRenderZone
          messages={messages}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isStreaming={isStreaming}
        />
        <RightNav sentQuery={sentQuery} />
      </div>
    </div>
  )
}

export default App
