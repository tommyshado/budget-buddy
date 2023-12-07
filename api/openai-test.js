import { OpenAI } from "openai";
import "dotenv/config";

import products from "../services/budgetBuddy.js";
import db from "../model/db.js";

import { Router } from "express";

// chagpt prompt import
import chatgptPrompt from "./chatgptPrompt.js";

// Instances
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prompt = chatgptPrompt();

// Services import
const productsService = products(db);

// Api routes
router.post("/preprocessData", async (req, res) => {
	const { text, categoryId } = req.body;

	const main = async () => {
		const messages = [
			{ role: "system", content: `${prompt.text}` },
			{ role: "user", content: `${text}` }, // coming from client
		];

		try {
			const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
			const structuredData = completion.choices[0].message.content; // stores structured data

			if (Array.isArray(JSON.parse(structuredData))) {
				for (const product in structuredData) {
					await productsService.createProduct(structuredData[product].product, structuredData[product].price, categoryId);
				};

				res.json({
					status: "success",
				});
			};

		} catch (err) {
			res.json({
				status: "error",
				error: err.stack,
			});
		};
	};

	main();
});

router.get("/products", async (req, res) => {
	try {
		const allProducts = await productsService.allProducts();

		res.json({
			status: "success",
			data: allProducts
		});
		
	} catch (err) {
		res.json({
			status: "error",
			error: err.stack,
		});
	};
});

router.get("/categories", async (req, res) => {
	try {
		const categories = await productsService.categories();

		res.json({
			status: "success",
			data: categories
		});
		
	} catch (err) {
		res.json({
			status: "error",
			error: err.stack,
		});
	};
});

export default router;
