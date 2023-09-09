import { render, fireEvent, waitFor } from "@testing-library/react";
import DelayedTrains from "./DelayedTrains";

jest.mock('node-fetch', () => jest.fn()); // If you're using node-fetch
global.fetch = jest.fn();


describe("<DelayedTrains />", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("fetches and displays delayed trains", async () => {
    const mockData = [
      { OperationalTrainNumber: "12345",
      LocationSignature: "AA", 
      FromLocation: [{ LocationName: "Start" }],
      ToLocation: [{ LocationName: "End" }] }
    ];
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockData }),
      })
    );

    const { getByText } = render(<DelayedTrains />);

    await waitFor(() => expect(getByText("Start -> End")).toBeInTheDocument());
  });

  it("opens a Ticket when a train is clicked", async () => {
    const mockData = [
      { OperationalTrainNumber: "12345",
      LocationSignature: "AA", 
      FromLocation: [{ LocationName: "Start" }],
      ToLocation: [{ LocationName: "End" }] }
    ];
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockData }),
      })
    );

    const { getByText } = render(<DelayedTrains />);
    fireEvent.click(getByText("Start -> End"));

    expect(getByText("Stäng")).toBeInTheDocument();
  });
});
