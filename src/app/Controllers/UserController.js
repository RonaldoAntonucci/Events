import User from '../Schemas/UserSchema';

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User Email already in use.' });
    }

    const user = await User.create({ name, email, password });
    return res.json({ name: user.name, email: user.email });
  },
};
