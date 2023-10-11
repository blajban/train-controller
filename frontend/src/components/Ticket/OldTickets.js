import { useEffect, useState } from "react";
import { updateTicket } from "../../models/models";
import SmallButton from "../ui/SmallButton";
import StyledSelect from "../ui/StyledSelect";
import { TBody, THead, Table, Th, Tr, Td } from "../ui/StyledTable";
import ticketSocket from "./ticketSocket";

function OldTickets({oldTickets, reasonCodes, refreshTickets}) {
  const [ editingTicket, setEditingTicket ] = useState(null);
  const [ selectedReasonCode, setSelectedReasonCode ] = useState('');

  useEffect(() => {
    const disconnectSocket = ticketSocket.setupSocket(() => console.log("CALLBACK CALLED"));
    return () => {
      disconnectSocket();
    }
  }, []);

  const lockCurrentTicket = () => {
    const ticketId = '25';
    try {
      ticketSocket.lockTicket(ticketId);
    } catch (error) {
      console.error("Error locking ticket:", error);
    }
  };

  const unlockCurrentTicket = () => {
    const ticketId = '25';
    try {
      ticketSocket.unlockTicket(ticketId);
    } catch (error) {
      console.error("Error unlocking ticket:", error);
    }
  };
  

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
      <SmallButton onClick={lockCurrentTicket}>Testa socket - lås</SmallButton>
      <SmallButton onClick={unlockCurrentTicket}>Testa socket - lås upp</SmallButton>
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
                      <option value="" disabled>Choose a code</option>
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
                    <SmallButton onClick={() => startEditing(ticket._id, ticket.code)}>Uppdatera</SmallButton>
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
