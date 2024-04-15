import { NextFunction, Request, Response } from "express";
import errorHandler from "../ErrorHandling/error";
import { userModel } from "../models/userModel";
import { orderModel } from "../models/orderModel";
import { paymentModel } from "../models/paymentModel";
import { stripe } from "../index";

// export const test

export const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, orderId } = req.params;
    const { amount } = req.body;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );

    if (!orderId)
      return next(new errorHandler(403, "Please login to save address !"));
    const orderValidation = await orderModel.findById(orderId);
    if (!orderValidation)
      return next(
        new errorHandler(403, "Order is invalid ! Create an Order First !")
      );
    if (!amount)
      return next(new errorHandler(403, "Provide all payment details !"));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
      //   description: `${orderId} - order completed`,
      //   payment_method: id,
      //   confirm: true,
    });

    if (!paymentIntent)
      return next(new errorHandler(500, "Failed to create payment intent !"));
    const newPayment = await paymentModel.create({
      user: userId,
      order: orderId,
      amount: Number(amount) * 100,
      paymentIntent: paymentIntent.client_secret,
    });
    if (!newPayment)
      return next(
        new errorHandler(500, "Failed to create new payment request  !")
      );
    res.status(201).json({
      success: true,
      message: "PaymentRequest created Successfully !",
      response: newPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const paymentSuccessed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, paymentId } = req.params;
    const { payMode, orderId } = req.body;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );

    if (!payMode || !paymentId)
      return next(new errorHandler(403, "Provide all payment details !"));
    const newPayment = await paymentModel.findByIdAndUpdate(paymentId, {
      payMode,
    });
    if (!newPayment)
      return next(new errorHandler(500, "Payment Doesn't created !"));
    // updating order status as payment done and assign paymentId to that order
    const updateOrderStatus = await orderModel.findByIdAndUpdate(orderId, {
      payment: { payId: paymentId, paymentStatus: "Done" },
    });

    res.status(201).json({
      success: true,
      message: updateOrderStatus
        ? "Payment Done and Order updated Successfully"
        : "Payment Done Successfully !",
      response: newPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const fetchOrderPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, orderId } = req.params;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );

    const payment = await paymentModel.findOne({ order: orderId });
    if (!payment)
      return next(new errorHandler(404, "Payment Intent Doesn't Exists"));
    res.status(200).json({
      success: true,
      message: "Payment Intent already exists !",
      response: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
