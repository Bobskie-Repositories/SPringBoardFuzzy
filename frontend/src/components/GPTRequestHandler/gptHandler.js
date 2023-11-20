const apiKey = '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';

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
