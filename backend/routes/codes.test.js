const request = require('supertest');
const fetch = require('node-fetch');
const app = require('../app');

jest.mock('node-fetch');

let testApiKey;

beforeAll(async () => {
  const response = await request(app).get('/api-key');
  testApiKey = response.body.key;
});

describe('GET /codes', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('should return 200 on success', async () => {
    const mockResponseData = [{ ReasonCode: [{ Code: '1', Level1Description: 'Test' }] }];

    const mockResolvedData = {
      json: async () => ({ RESPONSE: { RESULT: mockResponseData } })
    };

    fetch.mockResolvedValueOnce(mockResolvedData);

    const res = await request(app).get('/codes').set('x-api-key', testApiKey);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should return 500 on error', async () => {
    fetch.mockRejectedValueOnce(new Error('Mocked error'));

    const res = await request(app).get('/codes').set('x-api-key', testApiKey);
    expect(res.statusCode).toEqual(500);
  });
});
