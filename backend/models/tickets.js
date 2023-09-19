const database = require('../db/db.js');

const collectionName = 'tickets';

const tickets = {
  getTickets: async (req, res) => {
    const db = await database.getDb(collectionName);
    const allTickets = await db.collection.find({}).toArray();

    await db.client.close();
        
    return res.json({
      data: allTickets
    });
  },

  createTicket: async (req, res) => {
    const db = await database.getDb(collectionName);

    const result = await db.collection.insertOne({
      code: req.body.code,
      trainnumber: req.body.trainnumber,
      traindate: req.body.traindate,
    });

    return res.json({
      data: {
        _id: result.insertedId,
        code: req.body.code,
        trainnumber: req.body.trainnumber,
        traindate: req.body.traindate,
      }
    });
  }
};

module.exports = tickets;
