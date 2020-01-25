import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
    },
    inactive: Boolean,
  },
  { timestamps: true, virtual: true }
);

UserSchema.virtual('password');

// eslint-disable-next-line func-names
UserSchema.pre('save', async function(next) {
  if (this.password) {
    this.password_hash = await bcrypt.hash(String(this.password), 8);
  }
  next();
});

export default model('User', UserSchema);
