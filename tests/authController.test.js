// authController.test.js

const request = require('supertest');
const app = require('../src/app');

describe('Authentication Controller', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual('testuser');
  });

  it('should authenticate a user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Login successful');
  });
});
