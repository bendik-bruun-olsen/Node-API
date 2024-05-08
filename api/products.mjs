import express from "express";
const router = express.Router();
import { ReqError } from "../middleware/errorHandler.mjs";
// import productsList from "../testing/productsList.mjs";
import { getProducts, getCategory, addProduct, getProduct, deleteProduct, updateProduct } from "../database/dbQueries.mjs";
import jwtValidator from "../middleware/jwtValidator.mjs";
import { validateProductData } from "../middleware/validateData.mjs";



router.get("/", jwtValidator, (req, res) => {
    
})



router.all("/", jwtValidator, (req, res) => {
    if (req.method === "GET") {
        let data;
        
        const { category } = req.query;
        // if (category) {
            //     data = products.filter(e => e.category.toLowerCase() === category.toLowerCase());
            // }

        // const data = getProducts()

        if (category) {
            data = getCategory(category.toLowerCase());
        } else {
            data = getProducts()
        }

        res.status(200).json({
            results: data
        });

    } else if (req.method === "POST") {
        addProduct(req.body)

        res.status(201).json({
        message: "Product added successfully.",
        addedProduct: req.body
    })
    } else {
        // const error = new Error(
        //     `${req.method} not supported on this endpoint. Please refer to the API documentation`
        // );
        // error.status = 405;
        // throw error;
        throw new ReqError(405, "Unsupported request method. Please refer to the API documentation.")
        // new Error("Pass in a message here.")
    }
})

router.all("/:productId", (req, res) => {
    const { productId } = req.params;
    // let data = getProduct(productId);
    let message, data;

    if (req.method === "GET") {
        data = getProduct(productId);
        if (data) {
            message = "Successfully fetched data for product with id: " + productId;
        } else {
            throw new ReqError(404, `CANNOT FETCH: Product with id: ${productId} not found.`)
        }
    } else if (req.method === "DELETE") {
        data = getProduct(productId);
        if (data) {
            deleteProduct(productId);
            message = "Successfully deleted product with id: " + productId;
        } else {
            throw new ReqError(404, `CANNOT DELETE: Product with id ${productId} not found.`)
        }
    } else if (req.method === "PUT") {
        const checkProduct = getProduct(productId)
        if (checkProduct) {
            updateProduct(req.body);
            message = "Successfully updated product with id: " + productId;
            data = {
                oldVersion: checkProduct,
                newVersion: req.body
            };
        } else {
            throw new ReqError(404, `CANNOT UPDATE: Product with id: ${productId}`)
        };

        
    } else {
        // const error = new Error(
        //     `${req.method} not supported on this endpoint. Please refer to the API documentation`
        // );
        // error.status = 405;
        // throw error;
        throw new ReqError(405, "Unsupported request method. Please refer to the API documentation.")
    }
    res.status(200).json({
        productId: productId,
        message: message,
        data: data
    });
})

export default router;