import createUser from '../Services/CreateUserService';

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await createUser.run({ name, email, password });
      return res.json({ name: user.name, email: user.email });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
};
