const database = require('../db/db.js');

const collectionName = 'tickets';

const tickets = {
  getTickets: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);
      const allTickets = await db.collection.find({}).toArray();
  
      await db.client.close();
          
      return res.json({
        data: allTickets
      });
    } catch (error) {
      next(error);
    }
  },

  createTicket: async (req, res, next) => {
    try {
      const db = await database.getDb(collectionName);

      const result = await db.collection.insertOne({
        code: req.body.code,
        trainnumber: req.body.trainnumber,
        traindate: req.body.traindate,
      });
  
      await db.client.close();

      return res.json({
        data: {
          _id: result.insertedId,
          code: req.body.code,
          trainnumber: req.body.trainnumber,
          traindate: req.body.traindate,
        }
      });
    } catch (error) {
      next(error);
    }
    
  }
};

module.exports = tickets;
