import createSession from '../Services/CreateSessionService';

export default {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const data = await createSession.run({ email, password });

      return res.json(data);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};
