import React, { useContext } from 'react';

const TicketContext = React.createContext();

export const useTickets = () => {
    return useContext(TicketContext);
  };

export default TicketContext;
