import React from 'react';
import { render, act, waitFor, fireEvent, screen } from '@testing-library/react';
import NewTicket from './NewTicket';
import { getDelayed, getReasonCodes, getTickets } from '../../models/models';

jest.mock('../Delayed/Delay', () => {
  return function MockedDelay() {
    return <div>Mocked Delay</div>;
  };
});

jest.mock('../../models/models', () => ({
  getDelayed: jest.fn(),
  getTickets: jest.fn(),
  getReasonCodes: jest.fn()
}));



describe('<NewTicket />', () => { 
  afterAll(() => {
    //global.fetch.mockRestore();
  });

  afterEach(() => {
    jest.resetAllMocks();
    //jest.clearAllTimers();
    //jest.restoreAllMocks();
  });
  

  it('should render location string correctly', async () => {
    const mockTrainData = { 
      OperationalTrainNumber: "12345",
      LocationSignature: "AA", 
      FromLocation: [
        { LocationName: "Start" 
      }],
      ToLocation: [
        { LocationName: "End" }
      ] 
    };

    const mockOnAddNewTicket = () => {};

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <NewTicket 
          trainData={mockTrainData}
          onAddNewTicket={mockOnAddNewTicket}
        />
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Nytt ärende/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Tåg från Start till End. Just nu i AA/)).toBeInTheDocument();
    });
  });

  it('should render the reason codes dropdown correctly', async () => {
    const mockTrainData = { 
      OperationalTrainNumber: "12345",
      LocationSignature: "AA", 
      FromLocation: [
        { LocationName: "Start" 
      }],
      ToLocation: [
        { LocationName: "End" }
      ] 
    };

    const mockTicketId = 1;
    const mockOnAddNewTicket = () => {};

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    render(
      <NewTicket 
        trainData={mockTrainData}
        newTicketId={mockTicketId}
        onAddNewTicket={mockOnAddNewTicket}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("AA - C")).toBeInTheDocument();
    });

    const dropdown = screen.getByLabelText("Orsakskod");
    fireEvent.change(dropdown, { target: { value: "AA" } });

    expect(dropdown.value).toBe("AA");

    await waitFor(() => {
      expect(screen.queryByText("Loading reason codes...")).not.toBeInTheDocument()
    });
  });

  it("test fetch error", async () => {
    const mockTrainData = { 
      OperationalTrainNumber: "12345",
      LocationSignature: "AA", 
      FromLocation: [
        { LocationName: "Start" 
      }],
      ToLocation: [
        { LocationName: "End" }
      ] 
    };

    const mockTicketId = 1;
    const mockOnAddNewTicket = () => {};

    getReasonCodes.mockRejectedValue(new Error("Mock fetch error"));

    console.error = jest.fn();

    render(
      <NewTicket 
        trainData={mockTrainData}
        newTicketId={mockTicketId}
        onAddNewTicket={mockOnAddNewTicket}
      />
    );

    await waitFor(() => expect(console.error).toHaveBeenCalledTimes(1));

    expect(console.error).toHaveBeenCalledWith("Error:", new Error("Mock fetch error"));
  });

  it('should call the submit callback correctly', async () => {
    const mockTrainData = { 
      OperationalTrainNumber: "12345",
      LocationSignature: "AA", 
      FromLocation: [
        { LocationName: "Start" 
      }],
      ToLocation: [
        { LocationName: "End" }
      ] 
    };

    const mockTicketId = 1;
    const mockOnAddNewTicket = jest.fn();

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    render(
      <NewTicket 
        trainData={mockTrainData}
        newTicketId={mockTicketId}
        onAddNewTicket={mockOnAddNewTicket}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Orsakskod")).toBeInTheDocument()
    });

    const selectControl = screen.getByLabelText("Orsakskod");
    fireEvent.change(selectControl, { target: { value: "AA" } });

    const submitButton = screen.getByText("Skapa nytt ärende");
    fireEvent.click(submitButton);

    expect(mockOnAddNewTicket).toHaveBeenCalledWith("AA");
  });

});
