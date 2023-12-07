import Joi from "joi";

const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    categories: Joi.array().items(Joi.string()), // Validate categories as an array of strings
    spendingLimit: Joi.number() // Validate spendingLimit as a number
});

const loginSchema = Joi.object({
    usernameOrEmail: Joi.string().min(6),
    password: Joi.string().min(6).required()
});

const signup = (data) => schema.validate(data);

const login = (data) => loginSchema.validate(data);

export { signup, login };
