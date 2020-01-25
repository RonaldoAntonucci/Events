import User from '../Schemas/UserSchema';

export default {
  async store(req, res) {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return res.json(user);
  },
};
