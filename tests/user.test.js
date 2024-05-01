const { User } = require('../models/user');

describe('User model', () => {
  it('should create a new user', async () => {
    const user = await User.create({ username: 'testuser', email: 'test@example.com', password: 'password' });
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
  });
});
