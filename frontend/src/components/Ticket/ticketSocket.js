import io from "socket.io-client";
import { API_KEY, API_URL } from '../../config';

let socket;

const ticketSocket = {
  setupSocket: (onTicketUnlocked, onTicketLocked) => {
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
      console.log(data);
      if (onTicketLocked) onTicketLocked(data);
    });

    socket.on('ticketUnlocked', (data) => {
      if (onTicketUnlocked) onTicketUnlocked(data);
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

  lockTicket: (ticketId) => {
    socket.emit('lockTicket', ticketId);
  },

  unlockTicket: (ticketId) => {
    socket.emit('unlockTicket', ticketId);
  },
};

export default ticketSocket;
