// backend/seed.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  const users = [
    { name: 'Dr. Demo', email: 'doctor@demo.com', password: '123456', role: 'doctor' },
    { name: 'Admin',    email: 'admin@demo.com',  password: 'admin123', role: 'admin' },
  ];

  // hash passwords
  const docs = await Promise.all(
    users.map(async u => ({
      ...u,
      password: await bcrypt.hash(u.password, 10),
    }))
  );

  await User.deleteMany({ email: { $in: users.map(u => u.email) } });
  await User.insertMany(docs);

  console.log('Inserted users:', users.map(u => u.email).join(', '));
  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err => { console.error(err); process.exit(1); });

