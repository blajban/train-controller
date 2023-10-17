import io from "socket.io-client";
import { API_KEY, API_URL } from '../../config';
import { useState, useEffect } from "react";

let socket;

const ticketSocket = {
  setupSocket: (onTicketUnlocked, onTicketLocked, onTicketUpdate) => {
    socket = io(`${API_URL}`, {
      query: {
        'x-api-key': API_KEY
      }
    });

    socket.on('lockedTickets', (data) => {
      data.forEach(id => {
        onTicketLocked(id);
      });
    });

    socket.on('ticketLocked', (data) => {
      if (onTicketLocked) onTicketLocked(data);
    });

    socket.on('ticketUnlocked', (data) => {
      if (onTicketUnlocked) onTicketUnlocked(data);
    });

    socket.on('ticketUpdate', (data) => {
      if (onTicketUpdate) onTicketUpdate(data);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    socket.on('error', (error) => {
      console.error('Error:', error);
    });

    return () => {
      socket.disconnect();
    };
  },

  lockTicket: (data) => {
    socket.emit('lockTicket', data);
  },

  unlockTicket: (data) => {
    socket.emit('unlockTicket', data);
  },
};

const useTicketSocket = (onTicketUpdated) => {
  const [lockedTickets, setLockedTickets] = useState([]);

  useEffect(() => {
    const onTicketLockedCallback = (data) => {
      setLockedTickets(prevLocked => [...prevLocked, data]);
    };

    const onTicketUnlockedCallback = (data) => {
      setLockedTickets(prevLocked => prevLocked.filter(ticket => ticket.ticketId !== data));
    };

    const onTicketUpdateCallback = (updatedTicket) => {
      if(onTicketUpdated) {
        onTicketUpdated(updatedTicket);
      }
    };

    const disconnectSocket = ticketSocket.setupSocket(
      onTicketUnlockedCallback,
      onTicketLockedCallback,
      onTicketUpdateCallback
    );
    
    return () => {
      disconnectSocket();
    };
  }, []);

  return {
    lockedTickets,
    lockTicket: ticketSocket.lockTicket,
    unlockTicket: ticketSocket.unlockTicket,
  };
};
export default useTicketSocket;
