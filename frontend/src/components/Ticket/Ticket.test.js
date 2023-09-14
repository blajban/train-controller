import { render, fireEvent, waitFor, act } from '@testing-library/react';
import * as React from 'react';
import Ticket from './Ticket';

let mockNewTicketProps;

jest.mock('./NewTicket', () => {
  return function MockedNewTicket(props) {
    mockNewTicketProps = props;
    if (props.invokeMock) {
      props.onAddNewTicket('ABC');
    }
    return <div>NewTicket Mock</div>;
  };
});


jest.mock('./OldTickets', () => {
  return function MockedOldTickets() {
    return <div>OldTickets Mock</div>;
  };
});

describe('<Ticket />', () => {
  beforeEach(() => {
      global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });
  

  it('fetches old tickets and calculates new ticket id', async () => {
    const mockOldTickets = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];
    
    global.fetch.mockResolvedValueOnce({ 
      json: jest.fn().mockResolvedValue({ data: mockOldTickets }) 
    });

    jest.spyOn(React, 'createElement').mockImplementation((type, props) => {
      if (type === MockedNewTicket) {
          mockNewTicketProps = props;
      }
      return jest.requireActual('react').createElement(type, props);
    });
  
    const { getByText } = render(<Ticket isOpen={true} onClose={jest.fn()} trainData={{}} />);

    await waitFor(() => {
      expect(getByText("OldTickets Mock")).toBeInTheDocument();
      expect(getByText("NewTicket Mock")).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:1337/tickets');
      expect(mockNewTicketProps.newTicketId).toBe(2);
    });

    
  });

  it("test fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Mock fetch error"));

    console.error = jest.fn();

    render(<Ticket isOpen={true} onClose={jest.fn()} trainData={{}} />);

    await waitFor(() => expect(console.error).toHaveBeenCalledTimes(1));

    expect(console.error).toHaveBeenCalledWith("Error:", new Error("Mock fetch error"));
  });

  it('closes ticket view', async () => {
    const mockOldTickets = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    global.fetch.mockResolvedValueOnce({ 
      json: jest.fn().mockResolvedValue({ data: mockOldTickets }) 
    });

    const mockOnClose = jest.fn();

    const { getByText } = render(<Ticket isOpen={true} onClose={mockOnClose} trainData={{}} />);
    

    await waitFor(() => {
      fireEvent.click(getByText("Stäng"));
      expect(mockOnClose).toHaveBeenCalled();
    });

    
  });

  it('should add a new ticket and refetch old tickets', async () => {
    const mockTrainData = {
      OperationalTrainNumber: "12345",
      EstimatedTimeAtLocation: "2023-01-02T03:04:05"
    };

    const mockOldTickets = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    global.fetch
      .mockResolvedValueOnce({ 
        json: jest.fn().mockResolvedValue({ data: mockOldTickets }) 
      })
      .mockResolvedValueOnce({ ok: true })


    const mockOnClose = jest.fn();

    const { getByText } = render(<Ticket invokeMock={true} isOpen={true} onClose={mockOnClose} trainData={mockTrainData} />);
    

    await waitFor(() => {
      expect(getByText("NewTicket Mock")).toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:1337/tickets',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            code: "ABC",
            trainnumber: mockTrainData.OperationalTrainNumber,
            traindate: mockTrainData.EstimatedTimeAtLocation.substring(0, 10)
          })
        })
      );
      
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:1337/tickets');
    });
    
  });
  
  it('should handle error when adding a new ticket', async () => {
    const mockTrainData = {
      OperationalTrainNumber: "12345",
      EstimatedTimeAtLocation: "2023-01-02T03:04:05"
    };
  
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ data: [] })
    });
    
    global.fetch.mockRejectedValueOnce(new Error("Mock fetch error"));
  
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    const mockOnClose = jest.fn();
  
    const { getByText } = render(<Ticket invokeMock={true} isOpen={true} onClose={mockOnClose} trainData={mockTrainData} />);
  
    await waitFor(() => {
      expect(getByText("NewTicket Mock")).toBeInTheDocument();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', new Error("Mock fetch error"));
    });
    
    
  
    consoleErrorSpy.mockRestore();
  });
  

});