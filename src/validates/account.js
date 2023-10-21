import Joi from "joi";

export const validSignUp = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required().min(6).max(255),
    confirmPassword: Joi.valid(Joi.ref('password')).required(),
    avatar: Joi.string(),
    numberPhone: Joi.string().min(9).max(11),
})