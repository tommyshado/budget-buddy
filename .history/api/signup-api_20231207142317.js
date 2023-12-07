// signup-api.js or similar file
import { Router } from "express";
import bcrypt from "bcrypt";
import signupService from "../services/register-users.js";
import { signup } from "../validate.js";
import db from "../model/db.js";

const signupRouter = Router();
const SignupService = signupService(db);

signupRouter.post("/", async (req, res) => {
    try {
        const { error } = signup(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            categories: req.body.categories,
            spendingLimit: req.body.spendingLimit,
          
        };

        await SignupService.createUser(user);

        res.status(201).json({ status: "Successfully registered a user" });
    } catch (err) {
        res.status(500).json({ status: "Error registering user", error: err.stack });
    }
});

signupRouter.get("/users", async (req, res) => {
    try {
        const users = await SignupService.registeredUsers();
        res.status(200).json({ status: "success", users });
    } catch (err) {
        res.status(500).json({ status: "error", error: err.stack });
    }
});

export default signupRouter;
