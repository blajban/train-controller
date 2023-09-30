const request = require('supertest');
const express = require('express');
const notFound = require('./notFound');



const app = express();
app.use(notFound);


describe('verifyApiKey middleware', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return error if route not found', async () => {
    const res = await request(app).get('/notFoundRoute');
    expect(res.status).toBe(404);
    expect(res.text).toMatch(/Not Found - \/notFoundRoute/i);
  });
});
