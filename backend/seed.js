import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hashedPassword = await bcrypt.hash("123456", 10);

    const existingUser = await User.findOne({ email: "doctor@demo.com" });
    if (existingUser) {
      console.log("User already exists");
    } else {
      await User.create({
        name: "Dr. Demo",
        email: "doctor@demo.com",
        password: hashedPassword,
        role: "doctor",
      });
      console.log("✅ Default doctor account created!");
    }

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding user:", err.message);
  }
};

seedUser();
