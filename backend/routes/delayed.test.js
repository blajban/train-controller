const request = require('supertest');
const app = require('../app');

const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('GET /delayed', () => {
  it('should return 200 on success', async () => {
    const mockResponseData = [{ TrainAnnouncement: 'Mocked announcement' }];
    
    fetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ RESPONSE: { RESULT: mockResponseData }}))
    );

    const res = await request(app).get('/delayed');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should return 500 on error', async () => {
    fetch.mockRejectedValueOnce(new Error('Mocked error'));

    const res = await request(app).get('/delayed');
    expect(res.statusCode).toEqual(500);
  });
});