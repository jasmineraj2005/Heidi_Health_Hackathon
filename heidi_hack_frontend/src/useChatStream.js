// Simulated streaming API helper
export async function streamAssistantResponse(input, setMessages) {
  const fakeResponse = `You said: "${input}". Here's a simulated streamed reply.`

  for (let i = 0; i < fakeResponse.length; i++) {
    await new Promise(r => setTimeout(r, 10)) // simulate delay

    setMessages(prev => {
      const newMessages = [...prev]
      const last = newMessages[newMessages.length - 1]

      // Replace "..." with first token or append next char
      newMessages[newMessages.length - 1] = {
        ...last,
        text: last.text === '...' ? fakeResponse[i] : last.text + fakeResponse[i]
      }

      return newMessages
    })
  }
}
