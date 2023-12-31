
import express from "express";
import bodyParser from "body-parser";

// Import sessions
import session from "express-session";

// Cors import
import cors from "cors";

// API imports here

// auth api imports
import signupApi from "./api/signup-api.js";
import loginApi from "./api/login-api.js";

import openaiApi from "./api/openai-test.js"

// Instances
const app = express();

// Cors middleware
app.use(cors());
app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "codeXer",
    resave: false,
    saveUninitialized: true
}));

// Routes Middleware here

// auth routes middlewares
app.use("/signup", signupApi);
app.use("/login", loginApi);

// preprocess data route middleware
app.use("/api/", openaiApi);

// PORT variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 app started at PORT", PORT);
});