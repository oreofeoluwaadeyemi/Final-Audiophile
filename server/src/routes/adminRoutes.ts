import express from "express";
import { deleteUser, getAllUsers, updateUserRole } from "../controller/userController";
import { createProduct, deleteProduct, updateProduct, uploadProductImage } from "../controller/productController";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// Apply Both protected and admin middleware to ALL routes in this field
//--- USER MANGEMENT BY ADMIN ---

//GET /api/admin/users --- get all you website users as an admin
router.get("/users", getAllUsers);

//PUT /api/admin/users/:id -- update user (toggle admin)
router.put("/users/:id", updateUserRole);

// DELETE /api/admin/users/:id -- delete user
router.delete("/users/:id", deleteUser);

// ---- PPRODUCT MANAGEMENT ----
// POST /api/admin/products -> create a product
router.post("/products", createProduct);

// POST /api/admin/products/upload-image -> upload to cloudinary
// upload.single("image") = Multer processes one file in the "image" field
router.post(
    "/products/upload-image",
    upload.single("image"),
    uploadProductImage,
);

// PUT /api/admin/products/:id -> edit a product
router.put("/products/:id", updateProduct);

// DELETE /api/admin/products/:id -> remove a product
router.delete("/products/:id", deleteProduct);

export default router;