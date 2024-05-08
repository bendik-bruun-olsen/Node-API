import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore)

const userSchema = Joi.object({
    email: Joi.string().email().required().min(5).max(255),
    password: joiPassword.string().minOfSpecialCharacters(2).minOfLowercase(2).minOfUppercase(2).minOfNumeric(2).noWhiteSpaces().onlyLatinCharacters().doesNotInclude(["password", "1234", "abdc"])
})

const productSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    category: Joi.string().min(3).max(255).required(),
    stock: Joi.number().integer().min(0).max(255),
    price: Joi.number().precision(2).prefs({ convert: false}).min(0).required()
})

export { userSchema, productSchema };