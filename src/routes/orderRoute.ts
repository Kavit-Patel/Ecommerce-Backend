import express from "express";
import {
  addNewOrder,
  getPendingUserOrders,
  getSinglOrder,
  getUserOrders,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post("/addNewOrder/:userId", addNewOrder);
orderRouter.get("/getUserPendingOrder/:userId", getPendingUserOrders);
orderRouter.get("/getUserOrders/:userId", getUserOrders);
orderRouter.get("/getSingleUserOrder/:userId/:orderId", getSinglOrder);

export default orderRouter;
