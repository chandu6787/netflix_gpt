import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.REACT_APP_GROQ_KEY,
  dangerouslyAllowBrowser: true  // needed for React
});

export const getGroqResult = async (prompt) => {
  const result = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile"
,
    messages: [{ role: "user", content: prompt }],
  });
  return result.choices[0].message.content;
};