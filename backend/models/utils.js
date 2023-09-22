const database = require('../db/db');

const trains = {
  fetchAllDelayedTrains: async () => {
    let db;

    try {
      db = await database.getDb('utils');
    } catch (error) {
      return {
        status: error.status,
        message: error.message,
      };
    } finally {
      await db.close();
    }
  }
};

module.exports = trains;
