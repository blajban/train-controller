import { useState } from "react";
import { updateTicket } from "../../models/models";
import Button from "../ui/Button";
import SmallButton from "../ui/SmallButton";
import StyledSelect from "../ui/StyledSelect";

function OldTickets({oldTickets, reasonCodes, refreshTickets}) {
  const [ editingTicket, setEditingTicket ] = useState(null);
  const [ selectedReasonCode, setSelectedReasonCode ] = useState('');

  const startEditing = (ticketId, currentCode) => {
    setEditingTicket(ticketId);
    setSelectedReasonCode(currentCode);
  };

  const confirmEdit = async () => {
    try {
      await updateTicket(editingTicket, selectedReasonCode);
      refreshTickets();
    } catch (error) {
      console.error('Error:', error);
    }

    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingTicket(null);
    setSelectedReasonCode(null);
  };

  if (!oldTickets) return "Loading tickets...";

  return (
    <div>
      <h2>Befintliga ärenden</h2>
      {oldTickets.map((ticket, index) => (
        <div key={index}>
          {ticket._id} - 
          {editingTicket === ticket._id ? (
            <>
              <StyledSelect 
                value={selectedReasonCode} 
                onChange={(e) => setSelectedReasonCode(e.target.value)}
              >
                <option value="" disabled>Choose a code</option>
                {reasonCodes.map((code, index) => (
                  <option key={index} value={code.Code}>
                    {code.Code} - {code.Level3Description}
                  </option>
                ))}
              </StyledSelect>
              <SmallButton onClick={confirmEdit}>Spara</SmallButton>
              <SmallButton onClick={cancelEdit}>Ångra</SmallButton>
            </>
          ) : (
            <>
              {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
              <SmallButton variant="secondary" onClick={() => startEditing(ticket._id, ticket.code)}>🖊️</SmallButton>
            </>
          )}
        </div>
      ))}
    </div>
  )

}

export default OldTickets;
