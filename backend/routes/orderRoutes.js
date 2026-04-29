import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

// Admin
router.get("/", protect, admin, getOrders);

export default router;