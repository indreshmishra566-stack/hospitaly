import mongoose from 'mongoose';
const vitalSchema = new mongoose.Schema({
  patientName: String,
  heartRate: Number,
  spo2: Number,
  temperature: Number,
  recordedAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model('Vital', vitalSchema);
