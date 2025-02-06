import express from "express";
import {
  register,
  verifyOTP,
  login,
  profile,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/profile", authMiddleware, profile);

export default router;
