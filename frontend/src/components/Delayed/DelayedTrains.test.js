import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import DelayedTrains from "./DelayedTrains";
import { getDelayed, getReasonCodes, getTickets } from '../../models/models';

import UserContext from '../../contexts/UserContext';


jest.mock('../../models/models', () => ({
  getDelayed: jest.fn(),
  getTickets: jest.fn(),
  getReasonCodes: jest.fn()
}));

jest.mock('../Ticket/OldTickets', () => {
  return function DummyOldTickets(props) {
    return <div data-testid="old-tickets-mock"></div>;
  };
});


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
    const mockIsLoggedIn = true;

    getDelayed.mockResolvedValue(mockData);

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <DelayedTrains />
      </UserContext.Provider>
    );

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

    const mockIsLoggedIn = true;

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <DelayedTrains />
      </UserContext.Provider>
    );

    const clickableElement = await screen.findByText("+");

    await act(async () => {
      fireEvent.click(clickableElement);
    });

    await waitFor(async () => {
      expect(screen.getByTestId('old-tickets-mock')).toBeInTheDocument();
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

    const mockIsLoggedIn = true;

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <DelayedTrains />
      </UserContext.Provider>
    );

    const clickableElement = await screen.findByText("+");
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

    const mockIsLoggedIn = true;

    render(
      <UserContext.Provider value={{ isLoggedIn: mockIsLoggedIn }}>
        <DelayedTrains />
      </UserContext.Provider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledTimes(1)
    });

    expect(console.error).toHaveBeenCalledWith("Error:", new Error("Mock fetch error"));
  });

});
