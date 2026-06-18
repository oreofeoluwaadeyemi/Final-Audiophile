// Defines all authenication-relatd API endpoints
// Routes tells express which controller function to run when a specific URL is hit with a specific HTTP method

import express from "express";
import { getProfile, login, register, upadteAvatar, updateProfile } from "../controller/userController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// POST /api/auth/register creates new account
router.post("/register", register);

//POST /api/auth/login signin and recieve a token
router.post("/login", login);

// protected routes -- must snd a valid token in the authorization header
//GET /api/auth/profile - view your own profile
router.get("/profile", protect, getProfile);

//PUT /api/auth/profile --- update nmae, phine and address or password
router.put("/profile", protect, updateProfile);

// POST api/auth/avatar -- upload s new profile picture
router.post("/avatar", protect, upload.single("avatar"), upadteAvatar); // "upload.single("avatar") means multer will look for a field named avatar in the form"

export default router;