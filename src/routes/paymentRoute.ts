import express from "express";
import {
  createPaymentIntent,
  fetchOrderPaymentIntent,
  paymentSuccessed,
} from "../controllers/paymentController";

const paymentRouter = express.Router();

paymentRouter.post(
  "/createPaymentIntent/:userId/:orderId",
  createPaymentIntent
);
paymentRouter.post("/paymentSuccessed/:userId/:paymentId", paymentSuccessed);
paymentRouter.get(
  "/fetchOrderPaymentIntent/:userId/:orderId",
  fetchOrderPaymentIntent
);

export default paymentRouter;
