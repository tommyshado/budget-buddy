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

/*

I am using tesseract.js to extract information from shopping receipt. the data is unstructured and also contains information I do not need.I only need the product name and its price. I will be passing you the raw text that I extracted from a grocery shopping receipt, and I want you to analyze it and then return an array of objects.in the objects, the product name is the key and the price is the value. Ignore all other irrelevent information and focus on matching the product to its price. do not give me the code or say anything else in your response. just give me the output array of objects. if you cannot find the price for a particular product,instead of setting it to null, you can make it up yourself,just pick a reasonable amount for it values should ideally be in south african rands. So if you are sure that the provided prices are in any other currency please convert them to south african rands.

*/