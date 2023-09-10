import { render, fireEvent, waitFor, act, queryByText } from "@testing-library/react";
import DelayedTrains from "./DelayedTrains";

jest.mock('node-fetch', () => jest.fn());
global.fetch = jest.fn();


describe("<DelayedTrains />", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("displays delayed trains", async () => {
    const mockData = [
      { 
        OperationalTrainNumber: "12345",
        LocationSignature: "AA", 
        FromLocation: [
          { LocationName: "Start" 
        }],
        ToLocation: [
          { LocationName: "End" }
        ] 
      }
    ];
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockData }),
      })
    );

    const { getByText } = render(<DelayedTrains />);

    await waitFor(() => expect(getByText("Start -> End")).toBeInTheDocument());
  });

  it("opens a ticket when a train is clicked", async () => {
    const mockData = [
      { 
        OperationalTrainNumber: "12345",
        LocationSignature: "AA", 
        FromLocation: [
          { LocationName: "Start" 
        }],
        ToLocation: [
          { LocationName: "End" }
        ] 
      }
    ];

    const mockTicketData = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('/delayed')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: mockData }),
        });
      }

      if (url.includes('/tickets')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: mockTicketData }),
        });
      }

      if (url.includes('/codes')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: mockCodesData }),
        });
      }

    });

    const { findByText, getByText } = render(<DelayedTrains />);

    const clickableElement = await findByText("Start -> End");

    await act(async () => {
      fireEvent.click(clickableElement);
    });

    await waitFor(() => expect(getByText(/6789/)).toBeInTheDocument());

  });

  it("closes the ticket when 'Stäng' is clicked", async () => {
    const mockData = [
      { 
        OperationalTrainNumber: "12345",
        LocationSignature: "AA", 
        FromLocation: [
          { LocationName: "Start" 
        }],
        ToLocation: [
          { LocationName: "End" }
        ] 
      }
    ];

    const mockTicketData = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('/delayed')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: mockData }),
        });
      }

      if (url.includes('/tickets')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: mockTicketData }),
        });
      }

      if (url.includes('/codes')) {
        return Promise.resolve({
          json: () => Promise.resolve({ data: mockCodesData }),
        });
      }

    });

    const { findByText, getByText, queryByText } = render(<DelayedTrains />);

    const clickableElement = await findByText("Start -> End");

    await act(async () => {
      fireEvent.click(clickableElement);
    });

    expect(getByText("Stäng")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByText("Stäng"));
    });


    await waitFor(() => {
      expect(queryByText("Stäng")).not.toBeInTheDocument();
    });
  });

  it("test fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Mock fetch error"));

    console.error = jest.fn();

    render(<DelayedTrains />);

    await waitFor(() => expect(console.error).toHaveBeenCalledTimes(1));

    expect(console.error).toHaveBeenCalledWith("Error:", new Error("Mock fetch error"));
});


});
