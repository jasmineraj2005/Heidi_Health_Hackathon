function SearchBar({ input, setInput, handleSubmit, isStreaming }) {
  return (
    <div className="search-bar">
      <form
        style={{ width: '100%', maxWidth: 800 }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isStreaming ? 'Waiting...' : 'Search patient notes...'}
          disabled={isStreaming}
        />
      </form>
    </div>
  )
}

export default SearchBar
