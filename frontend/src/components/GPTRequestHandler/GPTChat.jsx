const apiUrl = 'https://api.openai.com/v1/chat/completions';
const model = 'gpt-3.5-turbo';
const systemMessage = 'You are a helpful assistant.';
const apiKey = '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'; // Replace with your API key


async function generateResponse(prompt) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: systemMessage }, { role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from GPT API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

// New function
async function RequestHandler(prompt) {
  const requestPayload = {
    prompt,
    temperature: 0.5,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  try {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from GPT API: ${response.status}`);
    }

    const responseData = await response.json();

    if (responseData.choices.length > 0) {
      return responseData.choices[0].text.trim();
    } else {
      return 'No response content or choices found.';
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

export default { generateResponse, RequestHandler };
