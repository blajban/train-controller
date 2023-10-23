const request = require('supertest');
const app = require('../app');
const database = require('../db/db');

afterAll(async () => {
  await database.closeDb();
});

describe('GET /verify-token', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('should return 200 on success', async () => {
    const mockUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'test@testing.se',
      password: 'testPassword'
    };

    const registerRes = await request(app)
      .post('/register')
      .send(mockUser);
    
    const validToken = registerRes.body.data.token;

    const res = await request(app)
      .post('/verify-token')
      .set('x-access-token', validToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('description');
  });

  it('should return 403 on missing token', async () => {
    const res = await request(app).post('/verify-token');
    expect(res.statusCode).toEqual(403);
  });

  it('should return 401 on invalid token', async () => {
    const invalidToken = "InvalidToken";
    const res = await request(app)
      .post('/verify-token')
      .set('x-access-token', invalidToken);
    expect(res.statusCode).toEqual(401);
  });

});
