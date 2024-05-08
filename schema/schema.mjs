import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = Joi.object({
	email: Joi.string().email().required().min(5).max(255),
	password: joiPassword
		.string()
		.minOfSpecialCharacters(2)
		.minOfLowercase(2)
		.minOfUppercase(2)
		.minOfNumeric(2)
		.noWhiteSpaces()
		.onlyLatinCharacters()
		.doesNotInclude(["password"]),
});

const productSchema = Joi.object({
	name: Joi.string().min(3).max(255).required(),
	category: Joi.string().min(3).max(255).required(),
	stock: Joi.number().integer().min(0).max(255),
	price: Joi.number()
		.precision(2)
		.prefs({ convert: false })
		.min(0)
		.required(),
});

const orderSchema = Joi.object({
	user_id: Joi.number().integer().required(),
	order_date: Joi.date().required(),
	total_price: Joi.number().precision(2).required(),
	shipping_address: Joi.string().min(5).max(255).required(),
	products: Joi.array()
		.items(Joi.number().integer().required())
		.min(1)
		.required(),
});

export { userSchema, productSchema, orderSchema };
