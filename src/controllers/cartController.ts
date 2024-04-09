import { NextFunction, Request, Response } from "express";
import errorHandler from "../ErrorHandling/error";
import { cartModel, cartType } from "../models/cartModel";
import { userModel } from "../models/userModel";

// export const syncQuantityWithLs = async (
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
    const { userId, productId } = req.params;
    if (!userId) return next(new errorHandler(403, "Please Login first !"));
    if (!productId)
      return next(new errorHandler(403, "Provide cart item details !"));
    const newCart = await cartModel.create({
      user: userId,
      product: productId,
      quantity: 1,
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
export const increaseQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, cartId } = req.params;
    if (!userId) return next(new errorHandler(403, "Please Login first !"));
    if (!cartId) return next(new errorHandler(403, "Provide cart item  !"));
    const cartItem = await cartModel.findByIdAndUpdate(
      cartId,
      { $inc: { quantity: 1 } },
      { new: true }
    );

    if (!cartItem)
      return next(new errorHandler(500, "Faied to increase Quantity !"));
    res.status(201).json({
      success: true,
      message: "Cart Quantity increased successfylly !",
      response: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const decreaseQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, cartId } = req.params;
    if (!userId) return next(new errorHandler(403, "Please Login first !"));
    if (!cartId) return next(new errorHandler(403, "Provide cart item  !"));
    const cartItem = await cartModel.findOneAndUpdate(
      { _id: cartId, quantity: { $gt: 1 } },
      { $inc: { quantity: -1 } },
      { new: true }
    );

    if (!cartItem)
      return next(new errorHandler(500, "Faied to decrease Quantity !"));
    res.status(201).json({
      success: true,
      message: "Cart Quantity decreased successfylly !",
      response: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
export const removeItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, cartId } = req.params;
    if (!userId) return next(new errorHandler(403, "Please Login first !"));
    if (!cartId) return next(new errorHandler(403, "Provide cart item  !"));
    const cartItem = await cartModel.findByIdAndDelete(cartId);

    if (!cartItem) return next(new errorHandler(500, "Faied to delete Item !"));
    res.status(201).json({
      success: true,
      message: "Cart Item Deleted successfylly !",
      response: cartItem,
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
    const cartData: { product: string; quantity: number }[] = req.body;
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
      if (
        !element.product ||
        !element.quantity ||
        typeof element.product !== "string" ||
        typeof element.quantity !== "number"
      ) {
        return next(
          new errorHandler(
            403,
            "Please provide all the fields of cart items with proper type !"
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
      message: "Cart Products Synced with Db Successfully !",
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
    const cart = await cartModel.find({ user: userId }).populate("product");
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

export const syncQuantityWithLs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartData: { _id: string; quantity: number }[] = req.body;
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
      if (
        !element._id ||
        !element.quantity ||
        typeof element._id !== "string" ||
        typeof element.quantity !== "number"
      ) {
        return next(
          new errorHandler(
            403,
            "Please provide  all the fields of cart items with proper type !"
          )
        );
      }
    });

    const newCartItemsPromisis = cartData.map((item) =>
      cartModel.findByIdAndUpdate(item._id, { quantity: item.quantity })
    );
    const updatedCart = await Promise.all(newCartItemsPromisis);
    if (!updatedCart || updatedCart.length === 0)
      return next(new errorHandler(500, "No Quantity Updation in Db Cart !"));
    res.status(200).json({
      success: true,
      message: "Cart Quantity has been Synced with Db !",
      response: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
