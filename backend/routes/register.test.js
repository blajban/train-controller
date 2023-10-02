const request = require('supertest');
const database = require('../db/db');
const app = require('../app');

describe('POST /register', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('should return 200 on success', async () => {
    const mockUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'test@test.se',
      password: 'testPassword'
    };

    const res = await request(app)
      .post('/register')
      .send(mockUser);

    expect(res.statusCode).toEqual(200);
  });

  it('should return 409 if user already exists', async () => {
    const mockUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'test@test.se',
      password: 'testPassword'
    };

    const res = await request(app)
      .post('/register')
      .send(mockUser);

    expect(res.statusCode).toEqual(409);
  });

  it('should return 400 if not enough user info', async () => {
    const mockUser = {
      firstName: 'testFirstName',
      email: 'anotherEmail@test.se',
      password: 'testPassword'
    };

    const res = await request(app)
      .post('/register')
      .send(mockUser);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 500 if other error', async () => {

    database.getDb = jest.fn(() => {
      throw new Error('Database error');
    });

    const res = await request(app)
      .post('/register');

    expect(res.statusCode).toEqual(500);
  });
  
});
