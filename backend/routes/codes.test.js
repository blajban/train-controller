const request = require('supertest');
const app = require('../app');

describe('GET /codes', () => {
    it('should return 200 OK', async () => {
        const res = await request(app).get('/codes');
        expect(res.statusCode).toEqual(200);
    });
});