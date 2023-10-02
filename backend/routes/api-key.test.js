const request = require('supertest');
const fetch = require('node-fetch');
const app = require('../app');

const apiKey = require('../auth/apiKey');

const database = require('../db/db');

afterAll(async () => {
  await database.closeDb();
});


describe('GET /api-key', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('should return 200 on success', async () => {
    const res = await request(app).get('/api-key');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('description');
  });

  it('should return 500 on error', async () => {
    apiKey.generate = jest.fn(() => {
      throw new Error('Generate error');
    });

    const res = await request(app).get('/api-key');
    expect(res.statusCode).toEqual(500);
  });
});
