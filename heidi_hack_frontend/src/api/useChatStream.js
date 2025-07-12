// Simulated streaming API helper
export async function streamAssistantResponse(input, setMessages) {
  // Simulate a more elaborate markdown response
  const response = await fetch('http://localhost:8000/free_text_patient_summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'input_message': input })
  });

  if (response.status !== 200) {
    console.error("Error fetching response from API");
    setMessages(prev => [
      ...prev,
      { role: 'assistant', text: 'Failed to respond.' }
    ]);
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let num_iterations = 0;
  while (true && num_iterations < 100) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });

    setMessages(prev => {
      const newMessages = [...prev]
      const last = newMessages[newMessages.length - 1]
      newMessages[newMessages.length - 1] = {
        ...last,
        text: last.text === '...' ? text : last.text + text
      }
      return newMessages
    })

    num_iterations += 1;
  }
}
