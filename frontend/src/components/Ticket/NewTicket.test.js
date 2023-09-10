import React from 'react';
import { render, act, waitFor, fireEvent } from '@testing-library/react';
import NewTicket from './NewTicket';

jest.mock('../Delayed/Delay', () => {
  return function MockedDelay() {
    return <div>Mocked Delay</div>;
  };
});


describe('<NewTicket />', () => { 
  afterAll(() => {
    global.fetch.mockRestore();
  });

  it('should render the new ticket id and location string correctly', async () => {
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
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockCodesData }),
      })
    );


    let getByText;

    await act(async () => {
      const result = render(
        <NewTicket 
          trainData={mockTrainData}
          newTicketId={mockTicketId}
          onAddNewTicket={mockOnAddNewTicket}
        />
      );
      
      getByText = result.getByText;
    });

    await waitFor(() => {
      expect(getByText(/Nytt ärende 1/)).toBeInTheDocument();
      expect(getByText(/Tåg från Start till End. Just nu i AA/)).toBeInTheDocument();
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
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockCodesData }),
      })
    );


    let getByText, getByLabelText, queryByText;

    await act(async () => {
      const result = render(
        <NewTicket 
          trainData={mockTrainData}
          newTicketId={mockTicketId}
          onAddNewTicket={mockOnAddNewTicket}
        />
      );

      getByText = result.getByText;
      getByLabelText = result.getByLabelText;
      queryByText = result.queryByText;
    });

    expect(getByText("AA - C")).toBeInTheDocument();

    const dropdown = getByLabelText("Orsakskod");
    fireEvent.change(dropdown, { target: { value: "AA" } });

    expect(dropdown.value).toBe("AA");

    await waitFor(() => expect(queryByText("Loading reason codes...")).not.toBeInTheDocument());
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

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    global.fetch = jest.fn().mockRejectedValue(new Error("Mock fetch error"));

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
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockCodesData }),
      })
    );


    let getByText, getByLabelText;

    await act(async () => {
      const result = render(
        <NewTicket 
          trainData={mockTrainData}
          newTicketId={mockTicketId}
          onAddNewTicket={mockOnAddNewTicket}
        />
      );

      getByText = result.getByText;
      getByLabelText = result.getByLabelText;
    });

    await waitFor(() => expect(getByLabelText("Orsakskod")).toBeInTheDocument());

    const selectControl = getByLabelText("Orsakskod");
    fireEvent.change(selectControl, { target: { value: "AA" } });

    const submitButton = getByText("Skapa nytt ärende");
    fireEvent.click(submitButton);

    expect(mockOnAddNewTicket).toHaveBeenCalledWith("AA");
  });


});
