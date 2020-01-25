import User from '../Schemas/UserSchema';

export default {
  async run({ name, email, password }) {
    if (await User.findOne({ email })) {
      throw new Error('User Email already in use.');
    }

    return User.create({ name, email, password });
  },
};
