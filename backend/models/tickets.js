const database = require('../db/db');

const collectionName = 'tickets';

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
  }
};

module.exports = tickets;
