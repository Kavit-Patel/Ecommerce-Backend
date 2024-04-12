import mongoose from "mongoose";
import { userType } from "./userModel";

export interface addressType {
  _id?: string;
  user: mongoose.Types.ObjectId | userType;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}
const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  country: { type: String, required: true },
});

export const addressModel = mongoose.model("address", addressSchema);
