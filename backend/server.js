import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// ✅ connect database
connectDB();

const app = express();

// ✅ middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ routes
app.use("/api/auth", authRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
