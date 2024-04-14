import express from "express";
import {
  addNewOrder,
  getPendingUserOrder,
} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.post("/addNewOrder/:userId", addNewOrder);
orderRouter.get("/getUserPendingOrder/:userId", getPendingUserOrder);

export default orderRouter;
