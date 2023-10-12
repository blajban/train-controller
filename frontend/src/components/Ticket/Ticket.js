import { useState, useEffect } from 'react'

import styled from "styled-components";
import NewTicket from './NewTicket';
import OldTickets from './OldTickets';
import { getTickets, addTicket, getReasonCodes } from '../../models/models';
import SmallButton from '../ui/SmallButton';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: ${({theme}) => theme.background};
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-height: 80vh;
  overflow-y: auto;
`;


function Ticket({invokeMock, isOpen, onClose, trainData}) {
  const [oldTickets, setOldTickets] = useState(null);
  const [reasonCodes, setReasonCodes] = useState(null);

  useEffect(() => {
    const fetchReasonCodes = async () => {
      try {
        const data = await getReasonCodes();
        setReasonCodes(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReasonCodes();
  }, []);

  const fetchOldTickets = async () => {
    try {
      const data = await getTickets();
      setOldTickets(data);
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
      const addedTicket = await addTicket(newTicket);
      setOldTickets(prevTickets => [...prevTickets, addedTicket]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchOldTickets();
  }, []);

  if (!oldTickets || !reasonCodes) return "Loading tickets...";

  return (
    <Overlay>
      <Content>
        <SmallButton onClick={onClose}>Stäng</SmallButton>
        <NewTicket invokeMock={invokeMock} trainData={trainData} onAddNewTicket={addNewTicket} reasonCodes={reasonCodes}/>
        <OldTickets oldTickets={oldTickets} reasonCodes={reasonCodes} refreshTickets={fetchOldTickets}/>
    </Content>
    </Overlay>
  )
}

export default Ticket;


