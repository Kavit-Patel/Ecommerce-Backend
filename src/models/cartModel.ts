import mongoose, { Mongoose } from "mongoose";
import { userType } from "./userModel";
import { productType } from "./productModel";

export interface cartType {
  _id?: string;
  user: mongoose.Types.ObjectId | userType;
  product: mongoose.Types.ObjectId | productType;
  quantity: number;
}

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);
export const cartModel = mongoose.model<cartType>("Carts", cartSchema);
