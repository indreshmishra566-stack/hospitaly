import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "hospitaly"
    });
    console.log("MongoDB Connected ✅");
  } catch (e) {
    console.error("MongoDB Connection Failed ❌", e.message);
    process.exit(1);
  }
}
