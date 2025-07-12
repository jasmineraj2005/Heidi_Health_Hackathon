function SearchBar({ input, setInput, handleSubmit, isStreaming }) {
  return (
    <div className="search-bar">
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isStreaming ? 'Waiting...' : 'Search patient notes...'}
          disabled={isStreaming}
          style={{ 
            width: '100%',
            padding: '14px 20px',
            fontSize: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            outline: 'none',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)';
            e.target.style.borderColor = '#3b82f6';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
            e.target.style.borderColor = '#e5e7eb';
          }}
        />
      </form>
    </div>
  )
}

export default SearchBar
