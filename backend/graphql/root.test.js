const request = require('supertest');
const fetch = require('node-fetch');
const app = require('../app');
const database = require('../db/db');

jest.mock('node-fetch');

afterAll(async () => {
  await database.closeDb();
});

describe('GET /graphQl', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('should return delayed', async () => {
    const mockResponseData = [
      {
        TrainAnnouncement: [{
          ActivityId: "an id"
        }]
      }
    ];

    const mockResolvedData = {
      json: async () => ({ RESPONSE: { RESULT: mockResponseData } })
    };

    fetch.mockResolvedValueOnce(mockResolvedData);
    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          {
            delayed {
              ActivityId
            }
          }
        `
    });

    expect(res.body.data).toHaveProperty('delayed');
    expect(res.body.data.delayed[0]).toHaveProperty('ActivityId');
  });

  it('should return codes', async () => {
    const mockResponseData = [{ ReasonCode: [{ Code: '1', Level1Description: 'Test' }] }];

    const mockResolvedData = {
      json: async () => ({ RESPONSE: { RESULT: mockResponseData } })
    };

    fetch.mockResolvedValueOnce(mockResolvedData);

    const res = await request(app)
      .post('/graphql')
      .send({
        query: `
          {
            codes {
              Level1Description
            }
          }
        `
    });

    expect(res.body.data).toHaveProperty('codes');
    expect(res.body.data.codes[0]).toHaveProperty('Level1Description');
  });

  it('should add ticket', async () => {
    const mockUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      email: 'test@test.se',
      password: 'testPassword'
    };

    const registerRes = await request(app)
      .post('/register')
      .send(mockUser);
    
    const validToken = registerRes.body.data.token;
    
    const res = await request(app)
      .post('/graphql')
      .set('x-access-token', validToken)
      .send({
        query: `
          mutation {
            addTicket(input: {
              code: "en n ny kod",
              trainnumber: "tågnummer",
              traindate: "ett datum"
            }) {
              _id
            }
          }
        `
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('addTicket');
    expect(res.body.data.addTicket).toHaveProperty('_id');
  });

  it('should return error when trying add ticket if not logged in', async () => {
    const invalidToken = "InvalidToken"
    
    const res = await request(app)
      .post('/graphql')
      .set('x-access-token', invalidToken)
      .send({
        query: `
          mutation {
            addTicket(input: {
              code: "en ny kod",
              trainnumber: "tågnummer",
              traindate: "ett datum"
            }) {
              _id
            }
          }
        `
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0].message).toEqual('You are not authorized to view this resource');
  });

  it('should return tickets', async () => {
    const mockUser = {
      email: 'test@test.se',
      password: 'testPassword'
    };

    const loginRes = await request(app)
      .post('/login')
      .send(mockUser);
    
    const validToken = loginRes.body.data.token;

    const res = await request(app)
      .post('/graphql')
      .set('x-access-token', validToken)
      .send({
        query: `
          {
            tickets {
              _id,
            }
          }
        `
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('tickets');
    expect(res.body.data.tickets[0]).toHaveProperty('_id');
  });

  it('should return error when not logged in when getting tickets', async () => {
    const invalidToken = "InvalidToken"

    const res = await request(app)
      .post('/graphql')
      .set('x-access-token', invalidToken)
      .send({
        query: `
          {
            tickets {
              _id,
            }
          }
        `
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0].message).toEqual('You are not authorized to view this resource');
  });

  it('should update ticket', async () => {
    const mockUser = {
      email: 'test@test.se',
      password: 'testPassword'
    };

    const loginRes = await request(app)
      .post('/login')
      .send(mockUser);
    
    const validToken = loginRes.body.data.token;

    const getTicketsRes = await request(app)
      .post('/graphql')
      .set('x-access-token', validToken)
      .send({
        query: `
          {
            tickets {
              _id,
            }
          }
        `
    });

    const ticketId = getTicketsRes.body.data.tickets[0]._id;

    const res = await request(app)
      .post('/graphql')
      .set('x-access-token', validToken)
      .send({
        query: `
          mutation {
            updateTicket(input: {
              _id: "${ticketId}",
              code: "EN UPPDATERAD KOD"
            }) {
              _id
              code
            }
          }
        `
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('updateTicket');
    expect(res.body.data.updateTicket).toHaveProperty('code');
    expect(res.body.data.updateTicket.code).toEqual('EN UPPDATERAD KOD');
  });

  it('should return error if trying to update ticket when not logged in', async () => {
    const mockUser = {
      email: 'test@test.se',
      password: 'testPassword'
    };

    const loginRes = await request(app)
      .post('/login')
      .send(mockUser);
    
    const validToken = loginRes.body.data.token;

    const getTicketsRes = await request(app)
      .post('/graphql')
      .set('x-access-token', validToken)
      .send({
        query: `
          {
            tickets {
              _id,
            }
          }
        `
    });

    const ticketId = getTicketsRes.body.data.tickets[0]._id;

    const invalidToken = "InvalidToken"

    const res = await request(app)
      .post('/graphql')
      .set('x-access-token', invalidToken)
      .send({
        query: `
          mutation {
            updateTicket(input: {
              _id: "${ticketId}",
              code: "EN UPPDATERAD KOD"
            }) {
              _id
              code
            }
          }
        `
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0].message).toEqual('You are not authorized to view this resource');
  });
});