import jwt from 'jsonwebtoken';
import User from '../Schemas/UserSchema';

import authConfig from '../../Config/auth';

export default {
  async run({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    if (!(await user.checkPassword(password))) {
      throw new Error('Password does not match.');
    }

    const { name, _id: id } = user;

    return {
      user: {
        email,
        name,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  },
};
