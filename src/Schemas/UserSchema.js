import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    inactive: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
