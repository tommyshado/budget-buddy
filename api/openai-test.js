import { OpenAI } from 'openai';
import "dotenv/config";

import { Router } from "express";

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/preprocessData", (req, res) => {
  const { text } = req.body;

  async function main() {
    const messages = [
      { role: "system", content: "You are an french teacher" },
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