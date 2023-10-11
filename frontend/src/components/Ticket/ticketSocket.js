import io from "socket.io-client";
import { API_KEY, API_URL } from '../../config';

let socket;

const ticketSocket = {
  setupSocket: (onOpenTicket) => {
    socket = io(`${API_URL}`, {
      query: {
        'x-api-key': API_KEY
      }
    });

    socket.on('ticketLocked', (data) => {
      console.log('Ticket locked: ', data);
    });

    socket.on('ticketUnlocked', (data) => {
      console.log('Ticket unlocked: ', data);
    });





    socket.on('openTicket', (data) => {
      const { _id } = data;
      console.log('Opening ticket: ', _id);
      if (onOpenTicket) onOpenTicket(data);
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
