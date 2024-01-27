import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { DeleteOrder, allOrders, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.js";
const app = express.Router();
// Route - /api/v1/order/new
app.post("/new", newOrder);
// route - /api/v1/order/my
app.get("/my", myOrders);
//route - /api/v1/order/all
app.get("/all", adminOnly, allOrders);
app.route("/:id").get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, DeleteOrder);
export default app;
