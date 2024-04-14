import mongoose from "mongoose";
import { userType } from "./userModel";
import { productType } from "./productModel";
import { addressType } from "./addressModel";
import { paymentType } from "./paymentModel";

export interface orderType {
  _id?: string;
  user: mongoose.Types.ObjectId | userType;
  products: [
    {
      product: mongoose.Types.ObjectId | productType;
      quantity: number;
      price: number;
    }
  ];
  address: mongoose.Types.ObjectId | addressType;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  payment: {
    payId: mongoose.Types.ObjectId | paymentType;
    paymentStatus: string;
  };
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addresses",
      required: true,
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    payment: {
      payId: { type: mongoose.Schema.Types.ObjectId, ref: "Payments" },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Done"],
        default: "Pending",
      },
    },
  },
  { timestamps: true }
);
export const orderModel = mongoose.model<orderType>("Orders", orderSchema);
