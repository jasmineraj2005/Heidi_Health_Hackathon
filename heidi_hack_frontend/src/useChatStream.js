// Simulated streaming API helper
export async function streamAssistantResponse(input, setMessages) {
  // Simulate a more elaborate markdown response
  const fakeResponse = `# Response

---

**You said:** \"${input}\"

---

## Simulated Markdown Reply

Here's a _simulated_ streamed reply with **markdown**!

- Item 1
- Item 2

---

### Table Example

| Feature      | Supported |
| ------------ | --------- |
| Bold         | Yes       |
| Italic       | Yes       |
| Tables       | Yes       |
| Blockquotes  | Yes       |

---

> This is a blockquote.

---

#### End of Message`

  for (let i = 0; i < fakeResponse.length; i++) {
    await new Promise(r => setTimeout(r, 10)) // simulate delay

    setMessages(prev => {
      const newMessages = [...prev]
      const last = newMessages[newMessages.length - 1]
      newMessages[newMessages.length - 1] = {
        ...last,
        text: last.text === '...' ? fakeResponse[i] : last.text + fakeResponse[i]
      }
      return newMessages
    })
  }
}
