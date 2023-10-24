import { renderHook, act } from '@testing-library/react';
import useTicketSocket from './ticketSocket';
import io from 'socket.io-client';

jest.mock('socket.io-client');

describe('useTicketSocket', () => {
  let mockSocket;
  const mockEmit = jest.fn();
  const mockOn = jest.fn();

  beforeEach(() => {
    mockSocket = {
      on: mockOn,
      emit: mockEmit,
      disconnect: jest.fn(),
      close: jest.fn(),
    };
    io.mockReturnValue(mockSocket);
  });

  it('should lock a ticket', () => {
    const { result } = renderHook(() => useTicketSocket());

    act(() => {
      const callback = mockOn.mock.calls.find(call => call[0] === 'ticketLocked')[1];
      callback({ ticketId: '123' });
    });

    expect(result.current.lockedTickets).toEqual([{ ticketId: '123' }]);
  });

  it('should unlock a ticket', () => {
    const { result } = renderHook(() => useTicketSocket());

    act(() => {
      const callback = mockOn.mock.calls.find(call => call[0] === 'ticketLocked')[1];
      callback({ ticketId: '123' });
    });
    expect(result.current.lockedTickets).toEqual([{ ticketId: '123' }]);

    act(() => {
      const callback = mockOn.mock.calls.find(call => call[0] === 'ticketUnlocked')[1];
      callback('123');
    });
    expect(result.current.lockedTickets).toEqual([]);
  });

  it('should call onTicketUpdated when a ticket is updated', () => {
    const mockCallback = jest.fn();
    renderHook(() => useTicketSocket(mockCallback));

    const updatedTicket = { ticketId: '123', status: 'updated' };
    
    act(() => {
      const callback = mockOn.mock.calls.find(call => call[0] === 'ticketUpdate')[1];
      callback(updatedTicket);
    });
    
    expect(mockCallback).toHaveBeenCalledWith(updatedTicket);
  });

});
