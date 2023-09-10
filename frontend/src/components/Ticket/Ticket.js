import { useState, useEffect } from 'react'

import styled from "styled-components";
import NewTicket from './NewTicket';
import OldTickets from './OldTickets';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); // semi-transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%; // or fixed width e.g. 500px
  max-height: 80vh;
  overflow-y: auto;
`;


function Ticket({isOpen, onClose, trainData}) {
  const [oldTickets, setOldTickets] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  const fetchOldTickets = async () => {
    try {
      const response = await fetch('http://localhost:1337/tickets');
      const result = await response.json();
      setOldTickets(result.data);
      
      const lastId = result.data && result.data[0] ? result.data[0].id : 0;
      setTicketId(lastId + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addNewTicket = async (reasonCode) => {
    const newTicket = {
      code: reasonCode,
      trainnumber: trainData.OperationalTrainNumber,
      traindate: trainData.EstimatedTimeAtLocation.substring(0, 10),
    };

    try {
      await fetch("http://localhost:1337/tickets", {
        body: JSON.stringify(newTicket),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      });
      
      fetchOldTickets();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchOldTickets();
  }, []);

  if (!oldTickets) return "Loading tickets...";

  return (
    <Overlay>
      <Content>
        <button onClick={onClose}>Stäng</button>
        <NewTicket trainData={trainData} onAddNewTicket={addNewTicket}/>
        <OldTickets oldTickets={oldTickets}/>
    </Content>
    </Overlay>
  )
}

export default Ticket;


