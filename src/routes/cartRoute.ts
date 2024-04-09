import express from "express";
import {
  addToCart,
  decreaseQuantity,
  getUserCart,
  increaseQuantity,
  removeItem,
  syncCartWithLs,
  syncQuantityWithLs,
} from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.get("/getUserCart/:userId", getUserCart);
cartRouter.get("/addToCart/:userId/:productId", addToCart);
cartRouter.get("/increaseQuantity/:userId/:cartId", increaseQuantity);
cartRouter.get("/decreaseQuantity/:userId/:cartId", decreaseQuantity);
cartRouter.get("/removeItem/:userId/:cartId", removeItem);
cartRouter.post("/syncCartWithLs/:userId", syncCartWithLs);
cartRouter.post("/syncQuantityWithLs/:userId", syncQuantityWithLs);

export default cartRouter;
