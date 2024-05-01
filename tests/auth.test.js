const request = require('supertest');
const app = require('../app');

describe('Authentication endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toBe('testuser');
    expect(res.body.email).toBe('test@example.com');
  });

  it('should authenticate a user', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'password' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Login successful');
  });
});
