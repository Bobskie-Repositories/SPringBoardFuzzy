import React, { useState } from 'react';
import { generateResponse } from './components/GPTRequestHandler/gptHandler';
import GPTChat from './GPTChat'; // Import the GPTChat component

function GPTChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerateResponse = async () => {
    try {
      const generatedResponse = await generateResponse(input);
      setResponse(generatedResponse);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  }

  return ( 
    <div>
      <h2>Chat with GPT</h2>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleGenerateResponse}>Generate Response</button>
      <p>{response}</p>
    </div>
  );
}

export default GPTChat;
