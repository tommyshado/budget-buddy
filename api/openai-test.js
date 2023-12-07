import { OpenAI } from "openai";
import "dotenv/config";

import products from "../services/products.js";
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
router.post("/preprocessData", (req, res) => {
	const { text, categoryId } = req.body;

	async function main() {
		const messages = [
			{ role: "system", content: `${prompt.text}` },
			{ role: "user", content: `${text}` }, // coming from client
		];

		try {
			const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
      		const structuredData = completion.choices[0].message.content; // stores structured data

			let product;
			let price;

			if (Array.isArray(structuredData)) {

				structuredData.forEach((result) => {
					product = result.product;
					price = result.price;
				});

				// create a product
				await productsService.createProduct({ product, price, categoryId });

				res.json({
					status: "success",
				});
			};

			res.json({
				status: "error"
			});

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
		const allProducts = await productsService.all();

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

export default router;
