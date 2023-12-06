import { OpenAI } from 'openai';
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  const messages = [
    { role: "system", content: "You are an french teacher" },
    { role: "user", content: "transalte this word : hello" } // coming from client
  ];
  
  try {
    const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
    console.log(completion.choices[0].message.content); // insert data into the database
  } catch (error) {
    console.error(error);
  }
}

main();
