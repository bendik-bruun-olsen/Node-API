import { userSchema, productSchema } from "../schema/schema.mjs";
import { ReqError } from "./errorHandler.mjs";

const validateData = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        let errorMsg = "";
        if (error.details.length) {
            for (let i = 0; i < error.details.length; i++) {
                errorMsg += error.details[i].message + " --- "
            }
        } else {
            errorMsg = error.details[0].message;
        }
        throw new ReqError(400, errorMsg)
    } else {
        next();
    }
}

const validateUserData = validateData(userSchema)
const validateProductData = validateData(productSchema)

export { validateUserData, validateProductData }

