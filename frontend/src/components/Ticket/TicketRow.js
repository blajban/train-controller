import React from 'react';
import StyledSelect from '../ui/StyledSelect';
import SmallButton from '../ui/SmallButton';
import { TBody, THead, Table, Th, Tr, Td } from "../ui/StyledTable";

function TicketRow({
  ticket,
  reasonCodes,
  isEditing,
  lockedTickets,
  selectedReasonCode,
  onReasonCodeChange,
  onStartEditing,
  onConfirmEdit,
  onCancelEdit
}) {

  const isTicketLocked = lockedTickets.some(
    lockedTicket => lockedTicket.ticketId === ticket._id
  );

  const lockedBy = isTicketLocked 
    ? lockedTickets.find(lockedTicket => lockedTicket.ticketId === ticket._id).userInfo.email
    : null;

  return (
    <Tr>
      <Td>{ticket._id}</Td>
      
      {isEditing ? (
        <>
          <Td colSpan="3">
            <StyledSelect 
              value={selectedReasonCode}
              onChange={onReasonCodeChange}
            >
              <option value="" disabled>Välj en kod</option>
              {reasonCodes.map((code, idx) => (
                <option key={idx} value={code.Code}>
                  {code.Code} - {code.Level3Description}
                </option>
              ))}
            </StyledSelect>
          </Td>
          <Td>
            <SmallButton onClick={onConfirmEdit}>Spara</SmallButton>
            <SmallButton variant="secondary" onClick={onCancelEdit}>Ångra</SmallButton>
          </Td>
        </>
      ) : (
        <>
          <Td>{ticket.code}</Td>
          <Td>{ticket.trainnumber}</Td>
          <Td>{ticket.traindate}</Td>
          <Td>
            <SmallButton
              disabled={isTicketLocked}
              onClick={() => onStartEditing(ticket._id, ticket.code)}
            >
              Redigera
            </SmallButton>

            {isTicketLocked && 
              <div style={{marginLeft: '4px', display: 'inline-block', color: 'red', fontSize: '12px'}}>
                Låst av {lockedBy}
              </div>
            }
          </Td>
        </>
      )}
    </Tr>
  );
}

export default TicketRow;
