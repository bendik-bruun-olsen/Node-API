import express from "express";
const router = express.Router();
import { ReqError } from "../middleware/errorHandler.mjs";
import { validateOrderData } from "../middleware/validateData.mjs";
import jwtValidator from "../middleware/jwtValidator.mjs";
import {
	getAllOrders,
	getOrder,
	addOrder,
	deleteOrder,
} from "../database/dbQueries.mjs";

router.get("/", (req, res) => {
	res.status(200).json({
		results: getAllOrders(),
	});
});

router.post("/", jwtValidator, validateOrderData, (req, res) => {
	addOrder(req.body);
	res.status(200).json({
		message: "Successfully added order.",
		addedOrder: req.body,
	});
});

router.all("/", (req, res, next) => {
	throw new ReqError(
		405,
		`${req.method} not supported on this endpoint. Please refer to the API documentation`
	);
});

///////////////////////////////////////////////

router.get("/:orderId", (req, res) => {
	const { orderId } = req.params;
	const data = getOrder(orderId);

	if (data) {
		res.status(200).json({
			result: data,
		});
	} else
		throw new ReqError(
			404,
			`Unable to retrieve data for order: ${orderId}`
		);
});

router.delete("/:orderId", jwtValidator, (req, res) => {
	const { orderId } = req.params;
	const orderExists = getOrder(orderId);

	if (orderExists) {
		deleteOrder(orderId);
		res.status(200).json({
			message: `Successfully deleted order with id: ${orderId}`,
		});
	} else {
		throw new ReqError(404, `Unable to delete order: ${orderId}`);
	}
});

router.all("/:orderId", (req, res, next) => {
	throw new ReqError(
		405,
		`${req.method} not supported on this endpoint. Please refer to the API documentation`
	);
});

export default router;
