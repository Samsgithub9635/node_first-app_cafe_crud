import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MongoDB_Atlas_URL;

async function connectDB() {
  try {
    await mongoose.connect(mongoURL);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
  });
}

connectDB();

// Graceful shutdown on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB disconnected due to app termination');
  process.exit(0);
});

export default mongoose.connection;
