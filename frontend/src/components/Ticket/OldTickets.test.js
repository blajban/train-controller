import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import OldTickets from './OldTickets';
import ticketSocket from './ticketSocket';
import { getTickets, addTicket } from '../../models/models';

import TicketContext from '../../contexts/TicketContext';

const mockDisconnect = jest.fn();

jest.mock('./ticketSocket', () => {
  return {
    __esModule: true,
    default: () => {
      return {
        lockedTickets: [],
        lockTicket: jest.fn(),
        unlockTicket: jest.fn(),
      };
    },
  };
});




describe('<OldTickets />', () => {
  
  it('should render old tickets', async () => {

    const mockOldTickets = [
      {
        code: "6789",
        trainnumber: "123",
        traindate: "2023-01-01",
        _id: 1
      }
    ];

    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets />
      </TicketContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/6789/)).toBeInTheDocument();
    });

  });

  it('should return early if no old tickets', () => {
    const mockOldTickets = null;

    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets/>
      </TicketContext.Provider>
    );

    expect(screen.getByText("Loading tickets...")).toBeInTheDocument();
  });

});
