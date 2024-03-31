import express from "express";
import {
  addNewProduct,
  getAllProducts,
} from "../controllers/productController";
import { isAdmin } from "../controllers/userController";

const productRouter = express.Router();

productRouter.post("/addNewProduct", isAdmin, addNewProduct);
productRouter.get("/getAllProducts", getAllProducts);

export default productRouter;
