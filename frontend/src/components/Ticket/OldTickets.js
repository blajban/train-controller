import { useState } from "react";
import { updateTicket } from "../../models/models";

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
              <select 
                value={selectedReasonCode} 
                onChange={(e) => setSelectedReasonCode(e.target.value)}
              >
                <option value="" disabled>Choose a code</option>
                {reasonCodes.map((code, index) => (
                  <option key={index} value={code.Code}>
                    {code.Code} - {code.Level3Description}
                  </option>
                ))}
              </select>
              <button onClick={confirmEdit}>Confirm</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              {ticket.code} - {ticket.trainnumber} - {ticket.traindate}
              <button onClick={() => startEditing(ticket._id, ticket.code)}>🖊️</button>
            </>
          )}
        </div>
      ))}
    </div>
  )

}

export default OldTickets;
