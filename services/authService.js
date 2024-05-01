const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('./models'); // Assuming you have a User model

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  return jwt.sign(payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNUiIsIm5hbWUiOiJBdHVsIFNpbmdoIiwiaWF0IjoiVmFyYW5hc2lAMTMyIn0', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJNUiIsIm5hbWUiOiJBdHVsIFNpbmdoIiwiaWF0IjoiVmFyYW5hc2lAMTMyIn0');
  } catch (err) {
    return null;
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const registerUser = async (username, email, password) => {
  const hashedPassword = await hashPassword(password);
  return User.create({ username, email, password: hashedPassword });
};

const authenticateUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('User not found');
  }
  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  const token = generateToken(user);
  return { token };
};

module.exports = { registerUser, authenticateUser, verifyToken };
