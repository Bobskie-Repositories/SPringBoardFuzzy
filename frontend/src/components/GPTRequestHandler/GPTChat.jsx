const apiKey = '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';
const organizationId = 'CdWsXeXSpiYq3JpfKktzNc7w';

export async function generateResponse(prompt) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from GPT API: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// New function
export async function RequestHandler(prompt, httpClientFactory) {
  const _httpClientFactory = httpClientFactory;

  const requestPayload = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 256,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  };

  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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', // Replace with your API key
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
}
