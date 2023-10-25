import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OldTickets from './OldTickets';

import TicketContext from '../../contexts/TicketContext';

const mockLockTicket = jest.fn();
const mockUnlockTicket = jest.fn();

jest.mock('./ticketSocket', () => {
  return {
    __esModule: true,
    default: () => {
      return {
        lockedTickets: [],
        lockTicket: mockLockTicket,
        unlockTicket: mockUnlockTicket,
      };
    },
  };
});

jest.mock('../../models/models', () => ({
  updateTicket: () => {
    throw new Error('Mocked updateTicket error');
  },
}));


let consoleSpy;

describe('<OldTickets />', () => {
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockLockTicket.mockClear().mockImplementation(() => {});
    mockUnlockTicket.mockClear().mockImplementation(() => {});
  });
  
  
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

  it('should allow ticket edit and save', async () => {
    const mockOldTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      _id: 1
    }];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];
  
    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets reasonCodes={mockCodesData}/>
      </TicketContext.Provider>
    );
  
    const editBtn = screen.getByText(/Redigera/);
    expect(editBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(editBtn);
    });

    const saveBtn = screen.getByText(/Spara/);
    expect(saveBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(saveBtn);
    });

    await waitFor(() => {
      const newEditBtn = screen.getByText(/Redigera/);
      expect(newEditBtn).toBeInTheDocument();
    });
  });

  it('should allow ticket edit and cancel', async () => {
    const mockOldTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      _id: 1
    }];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];
  
    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets reasonCodes={mockCodesData}/>
      </TicketContext.Provider>
    );
  
    const editBtn = screen.getByText(/Redigera/);
    expect(editBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(editBtn);
    });

    const cancelBtn = screen.getByText(/Ångra/);
    expect(cancelBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(cancelBtn);
    });

    // eslint-disable-next-line
    waitFor(() => {
      const newEditBtn = screen.getByText(/Redigera/);
      expect(newEditBtn).toBeInTheDocument();
    });
  });

  it('should handle lockTicket error', async () => {
    mockLockTicket.mockImplementationOnce(() => { 
      throw new Error('Mocked lockTicket error'); 
    });

    const mockOldTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      _id: 1
    }];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];
  
    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets reasonCodes={mockCodesData}/>
      </TicketContext.Provider>
    );
  
    const editBtn = screen.getByText(/Redigera/);
    expect(editBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(editBtn);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error locking ticket:', new Error('Mocked lockTicket error'));
  });

  it('should handle unlockTicket error', async () => {
    mockUnlockTicket.mockImplementationOnce(() => { 
      throw new Error('Mocked unlockTicket error'); 
    });

    const mockOldTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      _id: 1
    }];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];
  
    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets reasonCodes={mockCodesData}/>
      </TicketContext.Provider>
    );
  
    const editBtn = screen.getByText(/Redigera/);
    expect(editBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(editBtn);
    });

    const cancelBtn = screen.getByText(/Ångra/);
    expect(cancelBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(cancelBtn);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error unlocking ticket:', new Error('Mocked unlockTicket error'));
  });

  it('should handle updateTicket error', async () => {
    const mockOldTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      _id: 1
    }];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];
  
    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets reasonCodes={mockCodesData}/>
      </TicketContext.Provider>
    );
  
    const editBtn = screen.getByText(/Redigera/);
    expect(editBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(editBtn);
    });

    const saveBtn = screen.getByText(/Spara/);
    expect(saveBtn).toBeInTheDocument();

    // eslint-disable-next-line
    await act(async () => {
      userEvent.click(saveBtn);
      expect(consoleSpy).toHaveBeenCalledWith('Error:', new Error('Mocked updateTicket error'));
    });
  });

  it('should call cancelEdit/unlockTicket before unload', async () => {
    mockUnlockTicket.mockImplementationOnce(() => {});
    const mockOldTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      _id: 1
    }];

    const mockCodesData = [
      {
        Code: "AA",
        Level1Description: "A",
        Level2Description: "B",
        Level3Description: "C"
      }
    ];
  
    render(
      <TicketContext.Provider value={{ oldTickets: mockOldTickets }}>
        <OldTickets reasonCodes={mockCodesData}/>
      </TicketContext.Provider>
    );
  
    const editBtn = screen.getByText(/Redigera/);
    expect(editBtn).toBeInTheDocument();

    // eslint-disable-next-line
    act(() => {
      userEvent.click(editBtn);
    });

    fireEvent(window, new Event('beforeunload'));
    expect(mockUnlockTicket).toHaveBeenCalled();

  });
});
