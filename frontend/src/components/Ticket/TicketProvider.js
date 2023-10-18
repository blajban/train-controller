import React, { useState, useContext } from 'react';
import TicketContext from '../../contexts/TicketContext';
import { getTickets, addTicket } from '../../models/models';

export const TicketProvider = ({ children }) => {
  const [oldTickets, setOldTickets] = useState([]);

  const fetchOldTickets = async () => {
    try {
      const data = await getTickets();
      setOldTickets(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addNewTicket = async (reasonCode, trainData) => {
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

  const updateTicket = (updatedTicket) => {
    setOldTickets(prevTickets => {
      return prevTickets.map(ticket => 
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      );
    });
  };

  return (
    <TicketContext.Provider value={{ oldTickets, setOldTickets, fetchOldTickets, addNewTicket, updateTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

