import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import * as React from 'react';
import Ticket from './Ticket';
import { getDelayed, getReasonCodes, getTickets } from '../../models/models';

import { TicketProvider } from './TicketProvider';

const API_KEY = "testkey";

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

jest.mock('../../models/models', () => ({
  getDelayed: jest.fn(),
  getTickets: jest.fn(),
  getReasonCodes: jest.fn()
}));

describe('<Ticket />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  

  it('fetches old tickets', async () => {
    const mockOldTickets = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        id: 1
      }
    ];

    getTickets.mockResolvedValue(mockOldTickets);

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    jest.spyOn(React, 'createElement').mockImplementation((type, props) => {
      // eslint-disable-next-line no-undef
      if (type === MockedNewTicket) {
          mockNewTicketProps = props;
      }
      return jest.requireActual('react').createElement(type, props);
    });
  
    render(
      <TicketProvider>
        <Ticket isOpen={true} onClose={jest.fn()} trainData={{}} />
      </TicketProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("OldTickets Mock")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("NewTicket Mock")).toBeInTheDocument();
    });
    
  });

  it("test fetch error", async () => {
    getTickets.mockRejectedValue(new Error("Mock fetch error"));
    console.error = jest.fn();

    render(
      <TicketProvider>
        <Ticket isOpen={true} onClose={jest.fn()} trainData={{}} />
      </TicketProvider>
    );

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

    getTickets.mockResolvedValue(mockOldTickets);

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];

    getReasonCodes.mockResolvedValue(mockCodesData);

    const mockOnClose = jest.fn();

    render(
      <TicketProvider>
        <Ticket isOpen={true} onClose={mockOnClose} trainData={{}} />
      </TicketProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText("Stäng")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Stäng"));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });

    
  });

});
