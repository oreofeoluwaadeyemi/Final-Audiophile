// Handles all product-related operations
// -GET all products
// - GET product by ID
// - GEt products by category
// - create product (admin)
// - Update product (admin)
// - Delete product (admin)
// - Upload product umage (admin)

import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import { AuthRequest } from "../types/indexServer";
import { uploadImage } from "../config/cloudinary";

// ---- GET ALL PRODUCTS ----
// GET /api/products
export const getAllProducts = async(
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        // Fetch all products, newest first
        const products = await Product.find({}).sort({ createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching products"});
    }
};

// GET PRODUCTS BY ID
// GET /api/products/:id
export const getProductById =async (
      req: Request,
    res: Response,
): Promise<void> => {
    try {
        // validate the ID format first - MongoDb objectsIDs have a specific format
        if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
            res.status(400).json({ message: "Invalid product ID format"});
            return;
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: "Product not found"});
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: "Server error fetching product"});
    }
};

//---- GET PRODUCTS BY CATEGORY ----
// GET /api/products/category/:category
export const getProductsByCategory = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const validCategories = [ "headphones", "speakers", "earphones"];
        const categoryParam = req.params.category;
        const category = Array.isArray(categoryParam)
            ? categoryParam[0].toLowerCase()
            : categoryParam.toLowerCase();

        if (!validCategories.includes(category)) {
            res.status(400).json({message: "Invalid category"});
            return;
        }

        const products = await Product.find({ 
          category: category as "headphones" | "speakers" |"earphones",
        }).sort({createdAt: -1});
        res.status(200).json(products);
    } catch (error) {
        res
         .status(500)
         .json({message : "Server error fetching products by category"});
    }
};

export const createProduct = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      category,
      price,
      image,
      description,
      features,
      inTheBox,
      gallery,
      isNew,
    } = req.body;

    // Validate required fields
    if (!name || !category || !price || !description) {
      res.status(400).json({ message: "please provide all required fields " });
      return;
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      image,
      description,
      features,
      inTheBox: inTheBox || [],
      gallery: gallery || [],
      isNew: isNew || false,
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Create product error page");
    res.status(500).json({ message: "Server error creating product" });
  }
};

// ----- UPDATE PRODUCT (Admin) ---
// PUT /api/admin/products/:id

export const updateProduct = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    //Update provided fields using the nullish coalescing operator (??)
    product.name = req.body.name ?? product.name;
    product.category = req.body.name ?? product.name;
    product.price =
      req.body.price !== undefined ? Number(req.body.price) : product.price;
    product.description = req.body.description ?? product.description;
    product.features = req.body.features ?? product.features;
    product.inTheBox = req.body.inTheBox ?? product.inTheBox;
    product.isNew =
      req.body.isNew !== undefined ? req.body.isNew : product.isNew;

    // Only update image URL if a new one is provided

    if (req.body.image) {
      product.image = req.body.image;
    }

    const updateProduct = await product.save();
    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error updating product" });
  }
};

// ---- DELETE PRODUCT (ADMIN)
// DELETE /api/admin/products/:id
export const deleteProduct = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await product.deleteOne();
    res.status(204).json({ message: "Product deleted Successfully"});
  } catch (error) {
    res.status(500).json({message: "Server Error deleting product" });
  }
};

// ---- UPLOAD PRODUCT OMAGE (ADMIN)
// POST /api/admin/products/uploud-image
// Uploads an image to cloudinary and returns the url
export const uploadProductImage = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({message: "No image file provided"});
            return;
        }

        // Convert buffer to base64 for cloudinary upload
        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await uploadImage(base64, "audiophile/products");

        res.status(201).json({
            url: result.secure_url, // The HTTPS URL of the uploaded image
            publicId: result.public_id, // Needed if we want to delete it later
        })
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({message: "Server error upload product" });
    }
};