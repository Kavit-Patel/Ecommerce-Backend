import mongoose from "mongoose";

export interface productType {
  name: string;
  price: number;
  image: string;
  section: string;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  section: { type: String, required: true },
});

export const productModel = mongoose.model<productType>(
  "Products",
  productSchema
);
