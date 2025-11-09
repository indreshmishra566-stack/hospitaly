import './config/db.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Vital from './models/Vital.js';
import dotenv from 'dotenv'; dotenv.config();

async function run(){
  const exists = await User.findOne({ email: 'doctor@demo.com' });
  if(!exists){
    const passwordHash = await bcrypt.hash('Demo@123', 10);
    await User.create({ name:'Dr. Demo', email:'doctor@demo.com', passwordHash, role:'doctor' });
    console.log('Created demo user doctor@demo.com / Demo@123');
  } else {
    console.log('Demo user already exists');
  }
  // create sample vitals
  await Vital.deleteMany({});
  const now = Date.now();
  const docs = Array.from({length: 15}).map((_,i)=>({
    patientName: `Patient ${i+1}`,
    heartRate: 70 + Math.floor(Math.random()*20),
    spo2: 95 + Math.floor(Math.random()*3),
    temperature: 97 + Math.random()*2,
    recordedAt: new Date(now - i*3600*1000)
  }));
  await Vital.insertMany(docs);
  console.log('Seeded vitals');
  process.exit(0);
}
run();
