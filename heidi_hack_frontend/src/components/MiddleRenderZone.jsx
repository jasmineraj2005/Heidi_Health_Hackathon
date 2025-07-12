function MiddleRenderZone({ messages }) {
  return (
    <div className="middle-zone">
      <div className="chat-history">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MiddleRenderZone
