import mongoose from "mongoose";
import { userType } from "./userModel";
import { orderType } from "./orderModel";

export interface paymentType {
  _id?: string;
  user: mongoose.Types.ObjectId | userType;
  order: mongoose.Types.ObjectId | orderType;
  amount: number;
  payMode: string;
  paymentIntent: string;
}

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
    amount: { type: Number, required: true },
    payMode: {
      type: String,
      enum: ["null", "Credit Card", "Crypto"],
      default: "null",
    },
    paymentIntent: { type: String },
  },
  { timestamps: true }
);

export const paymentModel = mongoose.model<paymentType>(
  "Payments",
  paymentSchema
);
