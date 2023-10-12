const database = require('../db/db');
const { ObjectId } = require('mongodb');


const collectionName = 'tickets';

let currentLockedTickets = [];

const tickets = {
  getData: async () => {
    const db = await database.getDb(collectionName);
    const allTickets = await db.collection.find({}).toArray();

    await db.client.close();

    return allTickets;

  },
  // eslint-disable-next-line
  getTickets: async (req, res, next) => {
    try {
      const allTickets = await tickets.getData();

      return res.json({
        data: allTickets
      });
    } catch (error) {
      next(error);
    }
  },

  insertTicketData: async (data) => {
    const db = await database.getDb(collectionName);
    const result = await db.collection.insertOne({
      code: data.code,
      trainnumber: data.trainnumber,
      traindate: data.traindate,
    });

    await db.client.close();

    return {
      _id: result.insertedId,
      code: data.code,
      trainnumber: data.trainnumber,
      traindate: data.traindate,
    }
  },
  // eslint-disable-next-line
  createTicket: async (req, res, next) => {
    try {
      const result = await tickets.insertTicketData(req.body);

      return res.json({
        data: result
      });
    } catch (error) {
      next(error);
    }
  },

  updateTicketCodeData: async ({ _id, code }) => {
    const db = await database.getDb(collectionName);

    const result = await db.collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { code: code } },
      {
        returnDocument: 'after',
        upsert: false
      }
    );

    return result;
  },

  lockTicketsSocketConnection: async (socket) => {
    socket.emit('lockedTickets', currentLockedTickets);

    socket.on('lockTicket', async (data) => {
      currentLockedTickets.push(data);
      socket.broadcast.emit('ticketLocked', data);
    });

    socket.on('unlockTicket', async (data) => {
      currentLockedTickets = currentLockedTickets.filter(id => id !== data);
      socket.broadcast.emit('ticketUnlocked', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }

};

module.exports = tickets;
