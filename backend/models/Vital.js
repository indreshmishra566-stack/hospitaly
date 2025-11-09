import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema(
  {
    patientName: String,
    heartRate: Number,
    bpSystolic: Number,
    bpDiastolic: Number,
    spo2: Number,
    temperature: Number
  },
  { timestamps: true }
);

export default mongoose.model("Vital", vitalSchema);
