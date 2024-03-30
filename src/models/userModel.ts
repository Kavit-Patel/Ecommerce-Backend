import mongoose from "mongoose";

export interface userType {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

export const userModel = mongoose.model<userType>("Users", userSchema);
