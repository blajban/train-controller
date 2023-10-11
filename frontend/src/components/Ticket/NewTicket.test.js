import React from 'react';
import { render, act, waitFor, fireEvent, screen } from '@testing-library/react';
import NewTicket from './NewTicket';

jest.mock('../Delayed/Delay', () => {
  return function MockedDelay() {
    return <div>Mocked Delay</div>;
  };
});

describe('<NewTicket />', () => { 
  afterEach(() => {
    jest.resetAllMocks();
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

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(
        <NewTicket 
          trainData={mockTrainData}
          onAddNewTicket={mockOnAddNewTicket}
          reasonCodes={mockCodesData}
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

    render(
      <NewTicket 
        trainData={mockTrainData}
        newTicketId={mockTicketId}
        onAddNewTicket={mockOnAddNewTicket}
        reasonCodes={mockCodesData}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading reason codes...")).not.toBeInTheDocument();
    });
    
    expect(screen.getByText("AA - C")).toBeInTheDocument();
    
    const dropdown = screen.getByLabelText("Orsakskod");
    fireEvent.change(dropdown, { target: { value: "AA" } });
    
    expect(dropdown.value).toBe("AA");
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

    render(
      <NewTicket 
        trainData={mockTrainData}
        newTicketId={mockTicketId}
        onAddNewTicket={mockOnAddNewTicket}
        reasonCodes={mockCodesData}
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
