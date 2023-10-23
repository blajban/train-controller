const request = require('supertest');
const express = require('express');
const verifyApiKey = require('./verifyApiKey');
const apiKey = require('../auth/apiKey');

jest.mock('../auth/apiKey', () => ({
  isValid: jest.fn()
}));

const app = express();
app.use(verifyApiKey);
app.get('/test', (req, res) => res.status(200).send('Success'));

describe('verifyApiKey middleware', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return correct error if no API key is provided', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(403);
    expect(res.text).toMatch(/APÌ key missing/i);
  });

  it('should return correct error with invalid API key', async () => {
    apiKey.isValid.mockImplementation(() => Promise.resolve(false));

    const res = await request(app).get('/test').set('x-api-key', 'invalid-key');
    expect(res.status).toBe(401);
    expect(res.text).toMatch(/API key did not match/i);
  });

  it('should return 200 with valid api key', async () => {
    apiKey.isValid.mockImplementation(() => Promise.resolve(true));

    const res = await request(app).get('/test').set('x-api-key', 'valid-key');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Success');
  });

  it('should return error if any other error', async () => {
    apiKey.isValid.mockImplementation(() => {
      throw new Error('Random error');
    });

    const res = await request(app).get('/test').set('x-api-key', 'some-key');
    expect(res.status).toBe(500);
  });
});
