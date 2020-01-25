import User from '../../src/Schemas/UserSchema';

export default () => Promise.all([User.deleteMany({})]);
