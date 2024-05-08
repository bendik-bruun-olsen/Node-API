import express from "express";
const router = express.Router();
import { ReqError } from "../middleware/errorHandler.mjs";
import jwtValidator from "../middleware/jwtValidator.mjs";
import { validateProductData } from "../middleware/validateData.mjs";
import {
	getProducts,
	getCategory,
	addProduct,
	getProduct,
	deleteProduct,
	updateProduct,
} from "../database/dbQueries.mjs";

router.get("/", (req, res) => {
	const { category } = req.query;
	let data;

	if (category) {
		data = getCategory(category.toLowerCase());
	} else {
		data = getProducts();
	}
	res.status(200).json({
		results: data,
	});
});

router.post("/", jwtValidator, validateProductData, (req, res) => {
	addProduct(req.body);

	res.status(201).json({
		message: "Product added successfully.",
		addedProduct: req.body,
	});
});

router.all("/", (req, res) => {
	throw new ReqError(
		405,
		`${req.method} not supported on this endpoint. Please refer to the API documentation`
	);
});

///////////////////////////////////////////////

router.get("/:productId", (req, res) => {
	const { productId } = req.params;
	const data = getProduct(productId);
	if (data) {
		res.status(200).json({
			message: `Successfully fetched data for product with id: ${productId}`,
			results: data,
		});
	} else {
		throw new ReqError(
			404,
			`CANNOT FETCH: Product with id: ${productId} not found.`
		);
	}
});

router.delete("/:productId", jwtValidator, (req, res) => {
	const { productId } = req.params;
	const data = getProduct(productId);
	if (data) {
		deleteProduct(productId);
		res.status(200).json({
			message: `Successfully deleted product with id: ${productId}`,
		});
	} else {
		throw new ReqError(
			404,
			`CANNOT DELETE: Product with id ${productId} not found.`
		);
	}
});

router.put("/:productId", jwtValidator, validateProductData, (req, res) => {
	const { productId } = req.params;
	const checkProduct = getProduct(productId);

	if (checkProduct) {
		updateProduct({ ...req.body, id: productId });
		res.status(200).json({
			message: `Successfully updated product with id: ${productId}`,
			data: {
				oldVersion: checkProduct,
				newVersion: req.body,
			},
		});
	} else {
		throw new ReqError(404, `Cannot update product with id: ${productId}`);
	}
});

router.all("/:productId", (req, res, next) => {
	throw new ReqError(
		405,
		`${req.method} not supported on this endpoint. Please refer to the API documentation`
	);
});

export default router;
