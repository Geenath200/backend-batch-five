import express from "express";
import { getProducts, getProductById, saveProduct, updateProduct, } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/",saveProduct);
productRouter.put("/:productId", updateProduct)
productRouter.get("/:productId", getProductById)

              


export default productRouter;