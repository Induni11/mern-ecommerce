import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Any logged in user
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// ✅ Admin only
router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
