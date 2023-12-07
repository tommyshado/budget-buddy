import { OpenAI } from 'openai';
import "dotenv/config";

import products from '../services/products.js';
import db from "../model/db.js";

import { Router } from "express";

// chagpt prompt import
import chatgptPrompt from "../api/chatgptPrompt.js";

// Instances
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prompt = chatgptPrompt();

// Use instance to create a product
const Products = products(db);

// Api routes
router.post("/preprocessData", (req, res) => {
  const { text, categoryId } = req.body;

  async function main() {
    const messages = [
      { role: "system", content: `${prompt.text}` },
      { role: "user", content: `${text}` } // coming from client
    ];
    
    try {
      const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
      const structuredData = completion.choices[0].message.content; // stores structured data
      
      // Loop over the length of the structuredData variable then...
        // insert key value pairs data into the products database table.

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
