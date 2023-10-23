import { useState, useEffect } from 'react'

import styled from "styled-components";
import NewTicket from './NewTicket';
import OldTickets from './OldTickets';
import { getReasonCodes } from '../../models/models';
import SmallButton from '../ui/SmallButton';
import { useTickets } from '../../contexts/TicketContext';


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
  const [reasonCodes, setReasonCodes] = useState(null);

  const { oldTickets, fetchOldTickets } = useTickets();

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

  useEffect(() => {
    fetchOldTickets();
    // eslint-disable-next-line
  }, []);

  if (!oldTickets || !reasonCodes) return "Loading tickets...";

  return (
    <Overlay>
      <Content>
        <SmallButton onClick={onClose}>Stäng</SmallButton>
        <NewTicket invokeMock={invokeMock} trainData={trainData} reasonCodes={reasonCodes}/>
        <OldTickets reasonCodes={reasonCodes}/>
      </Content>
    </Overlay>
  )
}

export default Ticket;


