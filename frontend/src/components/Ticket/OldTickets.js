import { useContext, useEffect, useState } from "react";
import { updateTicket } from "../../models/models";
import TicketRow from "./TicketRow";
import { TBody, THead, Table, Th, Tr } from "../ui/StyledTable";
import useTicketSocket from "./ticketSocket";

import UserContext from "../../contexts/UserContext";
import { useTickets } from "../../contexts/TicketContext";



function OldTickets({ reasonCodes }) {
  const [ editingTicket, setEditingTicket ] = useState(null);
  const [ selectedReasonCode, setSelectedReasonCode ] = useState('');
  const { userInfo } = useContext(UserContext);

  const { oldTickets, setOldTickets } = useTickets();

  const onTicketUpdated = (updatedMessage) => {
    setOldTickets((prevTickets) => {
      return prevTickets.map(ticket => 
        ticket._id === updatedMessage.ticketId 
          ? { ...ticket, code: updatedMessage.code }
          : ticket
      );
    });
  };

  const { lockedTickets, lockTicket, unlockTicket } = useTicketSocket(onTicketUpdated);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (editingTicket) {
        cancelEdit();
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    //eslint-disable-next-line
  }, [editingTicket]); 

  const startEditing = (ticketId, currentCode) => {
    cancelEdit();
    setEditingTicket(ticketId);
    setSelectedReasonCode(currentCode);
    try {
      lockTicket({ ticketId, userInfo });
    } catch (error) {
      console.error("Error locking ticket:", error);
    }
  };

  const confirmEdit = async () => {
    try {
      await updateTicket(editingTicket, selectedReasonCode);
    } catch (error) {
      console.error('Error:', error);
    }

    cancelEdit();
  };

  const cancelEdit = () => {
    if (editingTicket) {
      try {
        unlockTicket(editingTicket);
      } catch (error) {
        console.error("Error unlocking ticket:", error);
      }
    }
    
    setEditingTicket(null);
    setSelectedReasonCode(null);
  };

  if (!oldTickets) return "Loading tickets...";

  return (
    <div>
      <h2>Befintliga ärenden</h2>
      <Table>
        <THead>
          <Tr>
            <Th>ID</Th>
            <Th>Orsakskod</Th>
            <Th>Tågnummer</Th>
            <Th>Datum</Th>
            <Th></Th>
          </Tr>
        </THead>
        <TBody>
          {oldTickets.map((ticket) => (
            <TicketRow 
              key={ticket._id} 
              ticket={ticket} 
              reasonCodes={reasonCodes} 
              isEditing={editingTicket === ticket._id}
              lockedTickets={lockedTickets}
              selectedReasonCode={selectedReasonCode}
              onReasonCodeChange={(e) => setSelectedReasonCode(e.target.value)}
              onStartEditing={startEditing}
              onConfirmEdit={confirmEdit}
              onCancelEdit={cancelEdit}
            />
          ))}
        </TBody>
      </Table>

    </div>
  )

}

export default OldTickets;
