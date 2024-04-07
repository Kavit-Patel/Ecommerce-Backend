import express from "express";
import {
  addToCart,
  getUserCart,
  syncCartWithLs,
} from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.get("/getUserCart/:userId", getUserCart);
cartRouter.post("/addToCart/:userId", addToCart);
cartRouter.post("/syncCartWithLs/:userId", syncCartWithLs);

export default cartRouter;
