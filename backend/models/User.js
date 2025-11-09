import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    name: String,
    role: { type: String, default: "doctor" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

