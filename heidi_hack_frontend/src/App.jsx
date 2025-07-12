import './App.css'
import './styles/colors.css';
import LeftNav from './components/LeftNav'
import RightNav from './components/RightNav'
import MiddleRenderZone from './components/MiddleRenderZone'
import LandingPage from './components/LandingPage'
import { useState } from 'react'
import { streamAssistantResponse } from './api/useChatStream'
import LogoHeader from './components/LogoHeader'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [sentQuery, setSentQuery] = useState('')
  const [showLanding, setShowLanding] = useState(true)

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

  const handleReveal = () => {
    setShowLanding(false)
  }

  return (
    <div className="app-layout" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
      <AnimatePresence mode="wait">
        {showLanding ? (
          <LandingPage key="landing" onReveal={handleReveal} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="main-section"
          >
            <LeftNav />
            <MiddleRenderZone
              messages={messages}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isStreaming={isStreaming}
            />
            <RightNav sentQuery={sentQuery} isStreaming={isStreaming} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
