import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import DelayedTrains from "./DelayedTrains";
import { getDelayed, getReasonCodes, getTickets } from '../../models/models';

jest.mock('../../models/models', () => ({
  getDelayed: jest.fn(),
  getTickets: jest.fn(),
  getReasonCodes: jest.fn()
}));

describe("<DelayedTrains />", () => {
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

    getDelayed.mockResolvedValue(mockData);

    render(<DelayedTrains />);

    await screen.findByText("Start -> End");
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

    getDelayed.mockResolvedValue(mockData);

    const mockTicketData = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    getTickets.mockResolvedValue(mockTicketData);

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    render(<DelayedTrains />);

    const clickableElement = await screen.findByText("Start -> End");

    await act(async () => {
      fireEvent.click(clickableElement);
    });

    await waitFor(async () => {
      expect(screen.getByText(/6789/)).toBeInTheDocument()
    });

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

    getDelayed.mockResolvedValue(mockData);

    const mockTicketData = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    getTickets.mockResolvedValue(mockTicketData);

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    render(<DelayedTrains />);

    const clickableElement = await screen.findByText("Start -> End");
    await act(async () => {
      fireEvent.click(clickableElement);
    });


    await waitFor(async () => {
      expect(screen.getByText("Stäng")).toBeInTheDocument();
    })

    fireEvent.click(screen.getByText("Stäng"));

    await waitFor(() => {
      expect(screen.queryByText("Stäng")).not.toBeInTheDocument();
    });
  });

  it("test fetch error", async () => {
    getDelayed.mockRejectedValue(new Error("Mock fetch error"));

    console.error = jest.fn();

    render(<DelayedTrains />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(1)
    });

    expect(console.error).toHaveBeenCalledWith("Error:", new Error("Mock fetch error"));
  });
});
