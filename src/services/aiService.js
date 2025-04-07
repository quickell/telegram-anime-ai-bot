const axios = require('axios');

async function askAI(userText) {
  const prompt = `
You're the best anime expert in the world. All the people who watch anime on the planet are asking for your help. And you can't go wrong. A user is trying to remember his favorite anime. Help him remember and tell him exactly what anime he was thinking of.
User said: "${userText}"
Reply only (ONLY) with the anime title in English. Nothing else.
  `;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: process.env.MODEL_NAME,
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost',
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = { askAI };
