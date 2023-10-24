const handleErrors = require('./handleErrors');

let mockRequest;
let mockResponse;
let mockNext;

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn()
  };
  mockNext = jest.fn();
});

describe('handleErrors middleware', () => {

  it('should handle errors', () => {
    const error = new Error('An error');
    
    handleErrors(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 500,
      message: 'An error',
      stack: expect.any(String)
    });
  });

  it('should handle specific errors', () => {
    const error = new Error('Not found');
    error.status = 404;
    
    handleErrors(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 404,
      message: 'Not found',
      stack: expect.any(String)
    });
  });

  it('should hide stack in production', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error('Some error');
    
    handleErrors(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Some error',
      stack: '🥞'
    });
  });
});
