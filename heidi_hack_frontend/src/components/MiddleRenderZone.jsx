import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SearchBar from './SearchBar'
import PromptAssistant from './PromptAssistant'
import HindsightLogo from '../assets/hindsight_logo.svg'

function MiddleRenderZone({ messages, input, setInput, handleSubmit, isStreaming }) {
  const handlePromptSelect = (promptText) => {
    setInput(promptText);
  };

  return (
    <div className="middle-zone">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={HindsightLogo} alt="Hindsight Logo" style={{ height: '50px', opacity: 0.9 }} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <SearchBar
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isStreaming={isStreaming}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <PromptAssistant onPromptSelect={handlePromptSelect} />
      </div>
      
      <div className="chat-history">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiddleRenderZone
