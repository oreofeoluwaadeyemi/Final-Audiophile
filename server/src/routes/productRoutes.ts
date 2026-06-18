// Public product API endponits (everyone can view products)

import express from "express"
import { getAllProducts, getProductById, getProductsByCategory } from "../controller/productController";

const router = express.Router();

// GET /api/products -> get all products
router.get("/", getAllProducts);

// GET /api/products/category/:category -> get by category
// IMPORTANT: This route must come befor "/:id" otherwise express treats 'category as a product ID
router.get("/category/:category", getProductsByCategory);

// GET /api/products/:id -> get one product
router.get("/:id", getProductById);

export default router;