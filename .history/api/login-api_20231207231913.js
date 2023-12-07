import { Router } from "express";
import db from "../model/db.js";
import loginService from "../services/login-users.js";
import dotenv from 'dotenv';
import { login } from "../validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const loginRouter = Router();
const LoginService = loginService(db);

loginRouter.post("/user", async (req, res) => {
    try {
        const { error } = login(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = {
            usernameOrEmail: req.body.usernameOrEmail.toLowerCase(),
            password: req.body.password
        }; 

        const getUser = await LoginService.checkUser(user);

        if (getUser.length === 0) {
            return res.status(404).json({
                status: "error",
                error: "User not found."
            });
        }

        const { password_hash, user_id } = getUser[0];
        const validPassword = await bcrypt.compare(user.password, password_hash);

        if (!validPassword) {
            return res.status(401).json({
                status: "error",
                error: "Invalid password."
            });
        }

        // Create JWT token
        const token = jwt.sign({ id: user_id }, process.env.TOKEN, { expiresIn: '1h' });

        // Create a session for the logged-in user
        req.session.userId = user_id;

        res.status(200).json({
            status: "Logged in",
            token: token,
            loggedUserId: user_id,
            redirectUrl: userDashboardUrl 
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err.message
        });
    }
});

export default loginRouter;
