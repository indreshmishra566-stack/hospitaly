import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { auth } from "./middleware/auth.js";
import Vital from "./models/Vital.js";

dotenv.config();

const app = express();

// CORS – allow frontend URL or *
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Auth
app.use("/api/auth", authRoutes);

// Protected vitals list
app.get("/api/vitals", auth, async (req, res) => {
  const vitals = await Vital.find().sort({ createdAt: -1 }).limit(10);
  res.json({ vitals });
});

// Start
const PORT = process.env.PORT || 10000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
