import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { authRequired } from './middleware/auth.js';
import Vital from './models/Vital.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*'}));
app.use(express.json());

app.get('/health', (req,res)=> res.json({status:'ok'}));
app.use('/api/auth', authRoutes);

app.get('/api/vitals', authRequired, async (req,res)=>{
  const vitals = await Vital.find().sort({ recordedAt: -1 }).limit(20);
  res.json({ data: vitals });
});

app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));
