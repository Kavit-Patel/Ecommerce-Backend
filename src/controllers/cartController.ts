import { NextFunction, Request, Response } from "express";
import errorHandler from "../ErrorHandling/error";
import { cartModel, cartType } from "../models/cartModel";
import { userModel } from "../models/userModel";

// export const getCart = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message:
//           error instanceof Error ? error.message : "Internal Server Error",
//       });
//   }
// };

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const cartProduct = req.body;
    if (!userId) return next(new errorHandler(403, "Please Login first !"));
    if (!cartProduct || !cartProduct.product || !cartProduct.quantity)
      return next(new errorHandler(403, "Provide cart item details !"));
    const newCart = await cartModel.create({
      user: userId,
      product: cartProduct.product,
      quantity: cartProduct.quantity,
    });
    if (!newCart) return next(new errorHandler(500, "Cart does not added !"));
    res.status(201).json({
      success: true,
      message: "Cart Item added successfully !",
      response: newCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const syncCartWithLs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartData: cartType[] = req.body;
    const { userId } = req.params;
    if (!userId)
      return next(new errorHandler(403, "Please login to save cart !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    if (!cartData || cartData.length === 0)
      return next(
        new errorHandler(403, "Please Send Cart Data with products !")
      );
    cartData.forEach((element) => {
      if (!element.product || !element.quantity) {
        return next(
          new errorHandler(
            403,
            "Please provide valid all the fields of cart items !"
          )
        );
      }
    });
    const newCartItemsPromisis = cartData.map((data) =>
      cartModel.create({
        user: userId,
        product: data.product,
        quantity: data.quantity,
      })
    );
    const newCart = await Promise.all(newCartItemsPromisis);
    if (!newCart || newCart.length === 0)
      return next(
        new errorHandler(500, "Cart items were not added successfully !")
      );
    res.status(200).json({
      success: true,
      message: "Cart Products Added Successfully !",
      response: newCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return next(new errorHandler(403, "Login to access your cart !"));
    const cart = await cartModel.find({ user: userId });
    if (cart.length === 0)
      return next(new errorHandler(404, "Your Cart Is Empty"));
    res.status(200).json({
      success: true,
      message: "Cart Fetched Success !",
      response: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
