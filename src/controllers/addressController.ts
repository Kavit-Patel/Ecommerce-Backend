import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../ErrorHandling/error";
import { userModel } from "../models/userModel";
import { addressModel } from "../models/addressModel";

export const addNewAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { street, city, state, zipcode, country } = req.body;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    if (!street || !city || !state || !zipcode || !country)
      return next(new errorHandler(403, "Provide all details of address !"));
    const newAddress = await addressModel.create({
      user: userId,
      street,
      city,
      state,
      zipcode,
      country,
    });
    if (!newAddress)
      return next(new errorHandler(500, "Address Doesn't created !"));
    res.status(201).json({
      success: true,
      message: "New Address Created Successfully !",
      response: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

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

export const fetchUserAddress = async (
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
    const addresses = await addressModel.find({ user: userId });
    if (!addresses)
      return next(new errorHandler(500, "Address Fetching Failed !"));
    res.status(200).json({
      success: true,
      message: "Addresses Fetched Successfully !",
      response: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const updateUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { _id, street, city, state, zipcode, country } = req.body;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    if (!_id || !street || !city || !state || !zipcode || !country)
      return next(new errorHandler(403, "Provide all details of address !"));
    const address = await addressModel.findByIdAndUpdate(
      _id,
      {
        street,
        city,
        state,
        zipcode,
        country,
      },
      { new: true }
    );
    if (!address)
      return next(new errorHandler(500, "Address doesn't Updated !"));
    res.status(200).json({
      success: true,
      message: "Address Updated Successfully !",
      response: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const deleteUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId)
      return next(new errorHandler(403, "Please login to save address !"));
    const userValidation = await userModel.findById(userId);
    if (!userValidation)
      return next(
        new errorHandler(403, "User is invalid ! Create an Account First !")
      );
    if (!addressId)
      return next(new errorHandler(403, "Provide address id to be deleted !"));
    const address = await addressModel.findByIdAndDelete(addressId);
    if (!address)
      return next(new errorHandler(500, "Address Deletion Failed !"));
    res.status(200).json({
      success: true,
      message: "Address Deleted Successfully !",
      response: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
