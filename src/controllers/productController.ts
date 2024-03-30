import { NextFunction, Request, Response } from "express";
import errorHandler from "../ErrorHandling/error";
import { productModel } from "../models/productModel";

export const addNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image)
      next(new errorHandler(403, "Please Fill All Product Details !"));
    const newProduct = await productModel.create({ name, price, image });
    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      response: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error Creating new product !",
      });
  }
};
