import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketRow from './TicketRow';

describe('<TicketRow />', () => {

  const mockTicket = {
    _id: '1',
    code: '1234',
    trainnumber: '5678',
    traindate: '2023-01-01'
  };

  const mockReasonCodes = [
    {
      Code: 'A1',
      Level1Description: 'A',
      Level2Description: 'B',
      Level3Description: 'C'
    },
    {
      Code: 'B2',
      Level1Description: 'X',
      Level2Description: 'Y',
      Level3Description: 'Z'
    }
  ];

  it('should display ticket details correctly', () => {
    render(
      <table>
        <tbody>
          <TicketRow ticket={mockTicket} reasonCodes={mockReasonCodes} isEditing={false} lockedTickets={[]} />
        </tbody>
      </table>
    );

    expect(screen.getByText(mockTicket._id)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.code)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.trainnumber)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.traindate)).toBeInTheDocument();
  });

  it('should show when a ticket is locked and disable edit button', () => {
    const lockedTicketInfo = { ticketId: mockTicket._id, userInfo: { email: 'test@example.com' } };
    
    render(
      <table>
        <tbody>
          <TicketRow ticket={mockTicket} reasonCodes={mockReasonCodes} isEditing={false} lockedTickets={[lockedTicketInfo]} />
        </tbody>
      </table>
      );

    expect(screen.getByText('Låst av test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Redigera')).toBeDisabled();
  });

  it('should display reason code dropdown and buttons in editing mode', () => {
    render(
      <table>
        <tbody>
          <TicketRow ticket={mockTicket} reasonCodes={mockReasonCodes} isEditing={true} lockedTickets={[]} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Välj en kod')).toBeInTheDocument();
    mockReasonCodes.forEach(code => {
      expect(screen.getByText(`${code.Code} - ${code.Level3Description}`)).toBeInTheDocument();
    });
    expect(screen.getByText('Spara')).toBeInTheDocument();
    expect(screen.getByText('Ångra')).toBeInTheDocument();
  });

  it('should handle reason code change', () => {
    const mockOnReasonCodeChange = jest.fn();
    
    render(
      <table>
        <tbody>
          <TicketRow ticket={mockTicket} reasonCodes={mockReasonCodes} isEditing={true} lockedTickets={[]} onReasonCodeChange={mockOnReasonCodeChange} />
        </tbody>
      </table>
    );

    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, 'A1');
    expect(mockOnReasonCodeChange).toHaveBeenCalled();
});

  it('should handle confirming and cancelling edit', () => {
    const mockOnConfirmEdit = jest.fn();
    const mockOnCancelEdit = jest.fn();

    render(
      <table>
        <tbody>
      <TicketRow ticket={mockTicket} reasonCodes={mockReasonCodes} isEditing={true} lockedTickets={[]} onConfirmEdit={mockOnConfirmEdit} onCancelEdit={mockOnCancelEdit} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText('Spara'));
    expect(mockOnConfirmEdit).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Ångra'));
    expect(mockOnCancelEdit).toHaveBeenCalled();
  });

});
