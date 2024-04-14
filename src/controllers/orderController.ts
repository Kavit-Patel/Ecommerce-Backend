import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../ErrorHandling/error";
import { userModel } from "../models/userModel";
import { orderModel } from "../models/orderModel";
import mongoose from "mongoose";

export const addNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { cartIdArr, products, address, subtotal, tax, shipping, total } =
      req.body;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    if (
      !products ||
      products.length === 0 ||
      !address ||
      !subtotal ||
      !tax ||
      !shipping ||
      !total
    )
      return next(
        new errorHandler(403, "Provide All Details to create order !")
      );
    //validating produts array
    const productsValidation = products.every(
      (product: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
      }) => product.product && product.quantity && product.price
    );
    if (!productsValidation)
      return next(
        new errorHandler(
          403,
          "In Products array each product must contain product,quantity and price !"
        )
      );
    const newOrder = await orderModel.create({
      user: userId,
      products,
      address,
      subtotal,
      tax,
      shipping,
      total,
    });
    const newOrderWithProductsDetail = await orderModel
      .findById(newOrder._id)
      .populate("products.product");
    if (!newOrderWithProductsDetail)
      return next(new errorHandler(500, "Order Creation Failed !"));
    //remove ordered products from cart

    res.status(201).json({
      success: true,
      message: "Order Created Successfully !",
      response: newOrderWithProductsDetail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getPendingUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    const pendingOrders = await orderModel
      .find({ user: userId })
      .populate("products.product");
    if (!pendingOrders)
      return next(new errorHandler(500, "Pending Order Fetching Failed !"));
    res.status(200).json({
      success: true,
      message: "Pending Order Fetched Success !",
      response: pendingOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const orderCompetedWithPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, paymentId, orderId } = req.params;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    if (!paymentId || !orderId)
      return next(new errorHandler(403, "Provide all details !"));
    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {
      payment: { payId: paymentId, paymentStatus: "Done" },
    });
    if (!updatedOrder)
      return next(new errorHandler(500, "Order Completion Failed !"));
    res.status(200).json({
      success: true,
      message: "Order Completed Successfully !",
      response: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
