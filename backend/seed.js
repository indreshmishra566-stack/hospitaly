import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Vital from "./models/Vital.js";

async function run() {
  await connectDB();

  const email = "doctor@demo.com";
  const password = "Demo@123";

  // upsert user
  const passwordHash = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate(
    { email },
    { email, passwordHash, name: "Dr. Demo", role: "doctor" },
    { upsert: true }
  );

  // seed vitals
  await Vital.deleteMany({});
  const sample = Array.from({ length: 8 }).map((_, i) => ({
    patientName: `Patient ${i + 1}`,
    heartRate: 72 + Math.floor(Math.random() * 12),
    bpSystolic: 110 + Math.floor(Math.random() * 20),
    bpDiastolic: 70 + Math.floor(Math.random() * 10),
    spo2: 96 + Math.floor(Math.random() * 3),
    temperature: 97 + Math.random() * 2
  }));
  await Vital.insertMany(sample);

  console.log("Seeded:");
  console.log("- user:", email, "/", password);
  console.log("- vitals:", sample.length);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
