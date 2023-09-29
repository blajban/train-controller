const request = require('supertest');
const app = require('../app');
const database = require('../db/db');
const jwt = require('jsonwebtoken');

const payload = { email: 'test@test.se' };
const secret = process.env.JWT_SECRET;
const validToken = jwt.sign(payload, secret, { expiresIn: '1h'});

afterAll(async () => {
  await database.closeDb();
});

describe('/tickets', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('GET should return 200 on success', async () => {
    const res = await request(app)
      .get('/tickets')
      .set('x-access-token', validToken);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('POST should return 200 on success', async () => {
    const mockTicket = {
      code: '123',
      trainnumber: '456',
      traindate: '2023-09-23'
    };

    const res = await request(app)
      .post('/tickets')
      .set('x-access-token', validToken)
      .send(mockTicket);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.code).toEqual('123');
  });

  it('GET should return 500 on error', async () => {
    database.getDb = jest.fn(() => {
      throw new Error('Database error');
    });

    const res = await request(app).get('/tickets');
    expect(res.statusCode).toEqual(500);
  });

  it('POST should return 500 on error', async () => {
    const mockTicket = {
      code: '123',
      trainnumber: '456',
      traindate: '2023-09-23'
    };

    database.getDb = jest.fn(() => {
      throw new Error('Database error');
    });

    const res = await request(app).post('/tickets').send(mockTicket);

    expect(res.statusCode).toEqual(500);
  });
});
