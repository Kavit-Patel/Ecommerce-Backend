import { NextFunction, Request, Response, request } from "express";
import jwt from "jsonwebtoken";
import errorHandler from "../ErrorHandling/error";
import { userModel, userType } from "../models/userModel";
import bcrypt from "bcrypt";
import { cookieUser } from "../utilityFunctions/checkCookie";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await cookieUser(req, res, next);
    if (user && user.isAdmin) {
      next();
    } else {
      return next(new errorHandler(403, "You are not Admin !"));
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error ? error.message : " Internal Server Error !",
    });
  }
};

export const addNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password)
      next(new errorHandler(403, "Please Fill all user details !"));
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || " "
    );
    const tenDays = 10 * 24 * 60 * 60 * 1000;
    const mode: boolean = process.env.NODE_ENV === "production";
    res.cookie("ecommerce_token", token, {
      secure: mode,
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + tenDays),
    });
    res.status(201).json({
      success: true,
      message: "User created Successfully !",
      response: newUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Error Creating new user !",
    });
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      next(new errorHandler(403, "Please Fill all details !"));
    const user = await userModel.findOne({ email }).lean();
    if (!user) return next(new errorHandler(404, "User doesn't exists !"));
    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(new errorHandler(401, "Password is incorrect !"));
    const { password: userPassword, ...userDetailsWithoutPassword } = user;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || " ");
    if (!token) return next(new errorHandler(500, "Token generation failed !"));
    const tenDays = 10 * 24 * 60 * 60 * 1000;
    const mode: boolean = process.env.NODE_ENV === "production";
    res.cookie("ecommerce_token", token, {
      secure: mode,
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + tenDays),
    });
    res.status(200).json({
      success: true,
      message: "User Login Successfull !",
      response: userDetailsWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error in user login !",
    });
  }
};

export const cookieAutoLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await cookieUser(req, res, next);
    res.status(200).json({
      success: true,
      message: "User Login Successfull !",
      response: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error in user login !",
    });
  }
};
