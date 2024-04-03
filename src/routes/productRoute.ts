import express from "express";
import {
  addNewProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController";
import { isAdmin } from "../controllers/userController";

const productRouter = express.Router();

productRouter.post("/addNewProduct", isAdmin, addNewProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getSingleProduct/:id", getSingleProduct);

export default productRouter;
