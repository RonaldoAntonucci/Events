import User from '../Schemas/UserSchema';

export default {
  async run(id, data) {
    try {
      await User.updateOne({ _id: id }, data);
    } catch (err) {
      throw new Error('Invalid data.');
    }

    return User.findOne({ _id: id });
  },
};
