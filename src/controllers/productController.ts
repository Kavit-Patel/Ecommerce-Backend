import { NextFunction, Request, Response } from "express";
import errorHandler from "../ErrorHandling/error";
import { productModel } from "../models/productModel";

export const addNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, image, section } = req.body;
    if (!name || !price || !image || !section)
      next(new errorHandler(403, "Please Fill All Product Details !"));
    const newProduct = await productModel.create({
      name,
      price,
      image,
      section,
    });
    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      response: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Error Creating new product !",
    });
  }
};
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productModel.find({});
    if (products.length == 0)
      return next(new errorHandler(404, "Product Not Available !"));
    return res.status(200).json({
      success: true,
      message: "Products Loaded Successfully !",
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: "fail",
      message:
        error instanceof Error ? error.message : " Product Fetching Failed !",
    });
  }
};

export const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(new errorHandler(403, "Provide Product id !"));
    const product = await productModel.findById(id);
    if (!product) return next(new errorHandler(404, "Product Not Found !"));
    res
      .status(200)
      .json({
        success: true,
        message: "Product Found Successfully",
        response: product,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message:
          error instanceof Error ? error.message : "Product Fetching Failed !",
      });
  }
};
