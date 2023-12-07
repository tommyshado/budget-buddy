import { OpenAI } from 'openai';
import "dotenv/config";

import { Router } from "express";

// chagpt prompt import
import chatgptPrompt from "../api/chatgptPrompt.js";

// Instances
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prompt = chatgptPrompt();

// Api routes
router.post("/preprocessData", (req, res) => {
  const { text } = req.body;

  async function main() {
    const messages = [
      { role: "system", content: `${prompt.text}` },
      { role: "user", content: `${text}` } // coming from client
    ];
    
    try {
      const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
      console.log(completion.choices[0].message.content); // insert data into the database

      res.json({
        status: "success"
      });

    } catch (err) {
      res.json({
          status: "error",
          error: err.stack
      })
    };
  };
  
  main();
});

export default router;
