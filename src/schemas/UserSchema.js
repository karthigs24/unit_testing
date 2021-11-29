import mongoose from 'mongoose';
const Schema = mongoose.Schema;
/**
 * UserSchema
 * @description user model
 */
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username must not be empty'],
  },
  password: {
    type: String,
    required: [true, 'Username must not be empty'],
  },
  status: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now }
}, { versionKey: false });

export const User = mongoose.model('Users', UserSchema);