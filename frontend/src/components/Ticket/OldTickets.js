import { useContext, useEffect, useState } from "react";
import { updateTicket } from "../../models/models";
import SmallButton from "../ui/SmallButton";
import StyledSelect from "../ui/StyledSelect";
import { TBody, THead, Table, Th, Tr, Td } from "../ui/StyledTable";
import useTicketSocket from "./ticketSocket";

import UserContext from "../../contexts/UserContext";



function OldTickets({oldTickets, reasonCodes, refreshTickets}) {
  const [ editingTicket, setEditingTicket ] = useState(null);
  const [ selectedReasonCode, setSelectedReasonCode ] = useState('');

  const { userInfo } = useContext(UserContext);

  const { lockedTickets, lockTicket, unlockTicket } = useTicketSocket();

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
      refreshTickets();
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
          {oldTickets.map((ticket, index) => (
            <Tr key={index}>
              <Td>{ticket._id}</Td>
              {editingTicket === ticket._id ? (
                <>
                  <Td colSpan="3">
                    <StyledSelect 
                      value={selectedReasonCode} 
                      onChange={(e) => setSelectedReasonCode(e.target.value)}
                    >
                      <option value="" disabled>Välj en kod</option>
                      {reasonCodes.map((code, index) => (
                        <option key={index} value={code.Code}>
                          {code.Code} - {code.Level3Description}
                        </option>
                      ))}
                    </StyledSelect>
                  </Td>
                  <Td>
                    <SmallButton onClick={confirmEdit}>Spara</SmallButton>
                    <SmallButton variant="secondary" onClick={cancelEdit}>Ångra</SmallButton>
                  </Td>
                </>
              ) : (
                <>
                  <Td>{ticket.code}</Td>
                  <Td>{ticket.trainnumber}</Td>
                  <Td>{ticket.traindate}</Td>
                  <Td>
                    <SmallButton
                      disabled={lockedTickets.includes(ticket._id)}
                      onClick={() => startEditing(ticket._id, ticket.code)}
                    >
                      Redigera
                    </SmallButton>
                    {lockedTickets.some(lockedTicket => lockedTicket.ticketId === ticket._id) && 
                      <div style={{marginLeft: '4px', display: 'inline-block', color: 'red', fontSize: '12px'}}>
                        Låst av {lockedTickets.find(lockedTicket => lockedTicket.ticketId === ticket._id).userInfo.email}
                      </div>
                    }


                  </Td>
                </>
              )}
            </Tr>
          ))}
        </TBody>
      </Table>

    </div>
  )

}

export default OldTickets;
