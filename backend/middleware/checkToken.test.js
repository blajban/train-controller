const jwt = require('jsonwebtoken');
const checkToken = require('./checkToken');
const { NoTokenError, InvalidTokenError } = require('../errors');


jest.mock('jsonwebtoken');


describe('checkToken middleware', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should throw NoTokenError if no token is provided', () => {
    const mockReq = { headers: {} };
    const mockRes = {};
    const mockNext = jest.fn();

    checkToken(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalledWith(new NoTokenError());
  });

  it('should throw InvalidTokenError for an invalid token', () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    const mockReq = { headers: { 'x-access-token': 'invalidToken' } };
    const mockRes = {};
    const mockNext = jest.fn();

    checkToken(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalledWith(new InvalidTokenError());
  });

  it('should not throw error with a valid token', () => {
    jwt.verify.mockImplementationOnce(() => true);

    const mockReq = { headers: { 'x-access-token': 'validToken' } };
    const mockRes = {};
    const mockNext = jest.fn();

    checkToken(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalledWith();
  });
});
