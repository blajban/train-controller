import { render, screen, waitFor, act } from '@testing-library/react';
import { TicketProvider } from './TicketProvider';
import { getTickets, addTicket } from '../../models/models';
import TicketContext from '../../contexts/TicketContext';

jest.mock('../../models/models', () => ({
  getTickets: jest.fn(),
  addTicket: jest.fn()
}));

describe('<TicketProvider />', () => {

  it('should initialize oldTickets as an empty array', () => {
    render(
      <TicketProvider>
        <TicketContext.Consumer>
          {value => <span>{value.oldTickets.length}</span>}
        </TicketContext.Consumer>
      </TicketProvider>
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should fetch and set oldTickets', async () => {
    const mockTickets = [{
      code: "6789",
      trainnumber: "123",
      traindate: "2023-01-01",
      id: 1
    }];

    getTickets.mockResolvedValueOnce(mockTickets);
  
    render(
      <TicketProvider>
        <TicketContext.Consumer>
          {value => {
            value.fetchOldTickets();
            return <span>{value.oldTickets.length}</span>;
          }}
        </TicketContext.Consumer>
      </TicketProvider>
    );
  
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('should add a new ticket', async () => {
    const newTicket = { _id: 2, code: '6789', trainnumber: '22', traindate: '2023-01-02' };
    addTicket.mockResolvedValueOnce(newTicket);

    render(
      <TicketProvider>
        <TicketContext.Consumer>
          {value => {
            value.addNewTicket('6789', { OperationalTrainNumber: '22', EstimatedTimeAtLocation: '2023-01-02T12:00:00' });
            return <span>{value.oldTickets.length}</span>;
          }}
        </TicketContext.Consumer>
      </TicketProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('should update an existing ticket', async () => {
    const updatedTicket = { _id: 1, code: '6790', trainnumber: '3', traindate: '2023-01-03' };
  
    let setOldTicketsFunction, updateTicketFunction;
  
    render(
      <TicketProvider>
        <TicketContext.Consumer>
          {value => {
            setOldTicketsFunction = value.setOldTickets;
            updateTicketFunction = value.updateTicket;
            return <span>{value.oldTickets[0]?.code || ''}</span>;
          }}
        </TicketContext.Consumer>
      </TicketProvider>
    );
  
    act(() => {
      setOldTicketsFunction([{ _id: 1, code: '123', trainnumber: '1', traindate: '2023-01-01' }]);
    });
  
    await waitFor(() => {
      expect(screen.getByText('123')).toBeInTheDocument();
    });
  
    act(() => {
      updateTicketFunction(updatedTicket);
    });
  
    await waitFor(() => {
      expect(screen.getByText('6790')).toBeInTheDocument();
    });
  });

});
