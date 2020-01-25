import jwt from 'jsonwebtoken';
import User from '../Schemas/UserSchema';

import authConfig from '../../Config/auth';

export default {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { name, _id: id } = user;

    return res.json({
      user: { name, email: user.email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
