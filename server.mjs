import express from "express";
const app = express();
import { join } from "path";
const { dirname } = import.meta;
import eventLogger from "./middleware/eventLogger.mjs";
import productsRoute from "./api/products.mjs"
import ordersRoute from "./api/orders.mjs";
import signupRoute from "./api/signup.mjs";
import loginRoute from "./api/login.mjs";

import { errorHandler, ReqError } from "./middleware/errorHandler.mjs";

const PORT = process.env.PORT || 3500

// Next to continue processing request after
app.use(eventLogger)

// Built in middleware to parse JSON data in request bodies.
app.use(express.json())

// The placement/order of middleware matters. 
// Usually placed before route handling.
app.use(express.static("public"))

// Api routes. What should handle the routes.
app.use("/api/products/", productsRoute);
app.use("/api/orders/", ordersRoute);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);

// All requests, not just middleware (Likely 404)
// 404 Catcher. Catches any requests not picked up by our route handlers.
app.all("*", (req, res, next) => {
  // const error = new Error("Not found.");
  // error.status = 404;
  throw new ReqError(404, "Not found.")
  next(error);
})

// Error handler
app.use(errorHandler)

// app.get("/", (request, response) => {
//   response.sendFile(join(dirname, "public", "index.html"))
// })

// app.post("/", (req, res) => {
//   // Serve post request to root here
// })



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})