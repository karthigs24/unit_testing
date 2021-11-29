
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

export const connectDb = () => {
  const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true };
  //* * Connecting to database
  mongoose.connect(env.MONGO_DB_CONNECT_URL, connectionOptions);
  // mongoose.set('debug', true);
  //* * handling errors and connections
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.log(`MongoDb connection error : ${err}`);
  });
  db.once('open', () => {
    console.log(`MongoDb connected`);
  });
  return db;
}