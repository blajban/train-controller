const request = require('supertest');
const database = require('../db/db');
const app = require('../app');

afterAll(async () => {
  await database.closeDb();
});

describe('POST /login', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  beforeAll(async () => {
    const user = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'loginTest@test.se',
      password: 'testPassword'
    };

    await request(app)
      .post('/register')
      .send(user);
  });

  it('should return 200 on success', async () => {
    const userInfo = {
      email: "loginTest@test.se",
      password: "testPassword"
    }
    const res = await request(app)
      .post('/login')
      .send(userInfo);

    expect(res.statusCode).toEqual(200);
  });

  it('should return 400 if email or pw not included', async () => {
    const userInfo = {
      email: "loginTest@test.se"
    }
    const res = await request(app)
      .post('/login')
      .send(userInfo);

    expect(res.statusCode).toEqual(400);
  });

  it('should return 401 if wrong email or pw', async () => {
    const userInfo = {
      email: "loginTest@test.se",
      password: "wrongPassword"
    }
    const res = await request(app)
      .post('/login')
      .send(userInfo);

    expect(res.statusCode).toEqual(401);
  });

  it('should return 500 if other error', async () => {

    database.getDb = jest.fn(() => {
      throw new Error('Database error');
    });

    const res = await request(app)
      .post('/login');

    expect(res.statusCode).toEqual(500);
  });

});
