import CreateUser from '../Services/CreateUserService';
import UpdateUser from '../Services/UpdateUserService';

export default {
  async store(req, res) {
    const { name, email, password } = req.body;

    try {
      const {
        id,
        name: newName,
        email: newEmail,
        updatedAt,
        createdAt,
      } = await CreateUser.run({
        name,
        email,
        password,
      });
      return res.json({
        id,
        name: newName,
        email: newEmail,
        updatedAt,
        createdAt,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    const { userId: id } = req.params;
    const {
      body: { name },
    } = req;

    try {
      const {
        name: newName,
        email,
        updatedAt,
        createdAt,
      } = await UpdateUser.run(id, { name });
      return res.json({
        id,
        name: newName,
        email,
        updatedAt,
        createdAt,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
