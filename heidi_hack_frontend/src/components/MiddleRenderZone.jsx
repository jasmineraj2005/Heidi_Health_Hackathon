import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SearchBar from './SearchBar'

function MiddleRenderZone({ messages, input, setInput, handleSubmit, isStreaming }) {
  return (
    <div className="middle-zone">
      <SearchBar
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isStreaming={isStreaming}
      />
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
