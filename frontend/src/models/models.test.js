import { getReasonCodes, getDelayed, getTickets, addTicket, updateTicket } from './models';

global.fetch = jest.fn();

describe('Models', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });



  it('getReasonCodes fetches and returns data correctly', async () => {
    const mockData = {
      data: {
        codes: [
          {
            Code: "someCode",
            Level3Description: "someDescription"
          }
        ]
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await getReasonCodes();

    expect(result).toEqual(mockData.data.codes);
  });

  it('getReasonCodes handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(new Error('API error')),
      })
    );

    console.error = jest.fn();

    await expect(getReasonCodes()).resolves.toBeUndefined();

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('getDelayed fetches and returns data correctly', async () => {
    const mockData = {
      data: {
        delayed: [
          {
            OperationalTrainNumber: "12345",
            LocationSignature: "AA",
            AdvertisedTimeAtLocation: "2021-01-01T00:00:00",
            EstimatedTimeAtLocation: "2021-01-01T00:00:00",
            FromLocation: [
              { LocationName: "Start" }
            ],
            ToLocation: [
              { LocationName: "End" }
            ]
          }
        ]
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await getDelayed();

    expect(result).toEqual(mockData.data.delayed);
  });

  it('getDelayed handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(new Error('API error')),
      })
    );

    console.error = jest.fn();

    await expect(getDelayed()).resolves.toBeUndefined();

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('getTickets fetches and returns data correctly', async () => {
    const mockData = {
      data: {
        tickets: [
          {
            _id: 1,
            code: "someCode",
            trainnumber: "123",
            traindate: "2023-01-01"
          }
        ]
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await getTickets();

    expect(result).toEqual(mockData.data.tickets);
  });

  it('getTickets handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(new Error('API error')),
      })
    );

    console.error = jest.fn();

    await expect(getTickets()).resolves.toBeUndefined();

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('addTicket fetches and returns data correctly', async () => {
    const mockTicketInfo = {
      code: "someCode",
      trainnumber: "123",
      traindate: "2023-01-01"
    };

    const mockData = {
      data: {
        addTicket: {
          _id: 1,
          code: "someCode",
          trainnumber: "123",
          traindate: "2023-01-01"
        }
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await addTicket(mockTicketInfo);

    expect(result).toEqual(mockData.data.addTicket);
  });

  it('addTicket handles fetch error', async () => {
    const mockTicketInfo = {
      code: "someCode",
      trainnumber: "123",
      traindate: "2023-01-01"
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(new Error('API error')),
      })
    );

    console.error = jest.fn();

    await expect(addTicket(mockTicketInfo)).resolves.toBeUndefined();

    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('updateTicket fetches and returns data correctly', async () => {
    const mockTicketId = 1;
    const mockTicketNewCode = "someCode";

    const mockData = {
      data: {
        updateTicket: {
          _id: 1,
          code: "someCode",
          trainnumber: "123",
          traindate: "2023-01-01"
        }
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const result = await updateTicket(mockTicketId, mockTicketNewCode);

    expect(result).toEqual(mockData.data.updateTicket);
  });

  it('updateTicket handles fetch error', async () => {
    const mockTicketId = 1;
    const mockTicketNewCode = "someCode";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(new Error('API error')),
      })
    );

    console.error = jest.fn();

    await expect(updateTicket(mockTicketId, mockTicketNewCode)).resolves.toBeUndefined();

    expect(console.error).toHaveBeenCalledTimes(1);
  });

});