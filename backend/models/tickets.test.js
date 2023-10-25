const { ObjectId } = require('mongodb');
const tickets = require('./tickets');
const database = require('../db/db');

jest.mock('../db/db', () => ({
  getDb: jest.fn()
}));

const socketMock = {
  emit: jest.fn(),
  on: jest.fn(),
  broadcast: {
    emit: jest.fn()
  }
};

const ioMock = {
  emit: jest.fn()
};

describe('lockTicketsSocketConnection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should emit "ticketLocked" on "lockTicket"', async () => {
    await tickets.lockTicketsSocketConnection(socketMock, ioMock);
    const ticketData = { ticketId: 'testId' };

    socketMock.on.mock.calls[0][1](ticketData);

    expect(socketMock.broadcast.emit).toHaveBeenCalledWith('ticketLocked', ticketData);
  });

  it('should emit "ticketUnlocked" and "ticketUpdate" on "unlockTicket"', async () => {
    const ticketId = '5f50a482e2172c119b55a743';
    const mockedTicketFromDb = {
      _id: new ObjectId(ticketId),
      code: 'code'
    };

    database.getDb.mockResolvedValueOnce({
      collection: {
        findOne: jest.fn().mockResolvedValueOnce(mockedTicketFromDb)
      }
    });
    await tickets.lockTicketsSocketConnection(socketMock, ioMock);
    socketMock.on.mock.calls.find((call) => call[0] === 'unlockTicket')[1](ticketId);

    expect(socketMock.broadcast.emit).toHaveBeenCalledWith('ticketUnlocked', ticketId);
  });
});
