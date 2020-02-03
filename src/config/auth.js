export default {
  secret: process.env.JWT_SECRET || 'fastfeet-fake',
  expiresIn: process.env.JWT_EXPIRES || '1d',
};
