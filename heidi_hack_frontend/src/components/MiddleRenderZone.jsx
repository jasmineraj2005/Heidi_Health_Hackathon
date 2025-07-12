import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MiddleRenderZone({ messages }) {
  return (
    <div className="middle-zone">
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
