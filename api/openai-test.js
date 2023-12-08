import { OpenAI } from "openai";
import "dotenv/config";

import products from "../services/budgetBuddy.js";
import db from "../model/db.js";

import { Router } from "express";

// chagpt prompt import
import chatgptPrompt from "./chatgptPrompt.js";
import budgetAdvicePrompt from "./budgetAdvicePrompt.js";
import session from "express-session";

import verifyToken from "../middlewares/verifyToken.js"

// Instances
const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prompt = chatgptPrompt();
const prompt2 = budgetAdvicePrompt();

// Services import
const productsService = products(db);

// Api routes
router.post("/preprocessData", async (req, res) => {
    const { text, categoryId } = req.body;

    const messages = [
        { role: "system", content: `${prompt.text}` },
        { role: "user", content: `${text}` }, // coming from client
    ];

    try {
        const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
        const structuredData = JSON.parse(completion.choices[0].message.content); // stores structured data
        console.log("--- ", structuredData);
        for (const product in structuredData) {
            await productsService.createProduct(structuredData[product].product, structuredData[product].price, categoryId);
        }

        res.json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: "error",
            error: err.stack,
        });
    }
});

router.get("/advice", async (req, res) => {
    const expenseData = await productsService.allProducts()
    const expenseData2 = await productsService.categories();

    const messages = [
        { role: "system", content: `${prompt2.text}` },
        { role: "user", content: `the products he bought ${expenseData} and his spending categories ${expenseData2}` }, // coming from client
    ];

    try {
        const completion = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages });
        const advice = completion.choices[0].message.content;
        console.log(advice)
        res.json({
            status: "success",
            data: advice,
        });

        
    } catch (err) {
        console.log(err);
        res.json({
            status: "error",
            error: err.stack,
        });
    }
});

router.get("/products", async (req, res) => {
    try {
        const allProducts = await productsService.allProducts();

        res.json({
            status: "success",
            data: allProducts,
        });
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack,
        });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await productsService.categories();

        res.json({
            status: "success",
            data: categories,
        });
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack,
        });
    }
});

router.get("/categories/user", verifyToken, async (req, res) => {

    try {
        const categoriesUser = await productsService.categoryUser(req.user.id);

        res.json({
            status: "success",
            data: categoriesUser,
        });
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack,
        });
    }
});

router.get("/products/user", verifyToken, async (req, res) => {
    try {
        const userProducts = await productsService.productsUser(req.user.id);

        res.json({
            status: "success",
            data: userProducts,
        });
    } catch (err) {
        res.json({
            status: "error",
            error: err.stack,
        });
    }
});


export default router;
